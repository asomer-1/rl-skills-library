-- Skills table (source of truth synced from GitHub)
CREATE TABLE IF NOT EXISTS skills (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  description   text NOT NULL DEFAULT '',
  category      text NOT NULL,
  author        text NOT NULL,
  version       text NOT NULL DEFAULT '1.0.0',
  content       text NOT NULL DEFAULT '',
  github_path   text NOT NULL DEFAULT '',
  is_new        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name  text UNIQUE NOT NULL
);

-- Skill ↔ tag junction
CREATE TABLE IF NOT EXISTS skill_tags (
  skill_id  uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  tag_id    uuid NOT NULL REFERENCES tags(id)   ON DELETE CASCADE,
  PRIMARY KEY (skill_id, tag_id)
);

-- Upvotes (one per user per skill)
CREATE TABLE IF NOT EXISTS votes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id      uuid NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  user_github   text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (skill_id, user_github)
);

-- Peer submissions (pending review queue)
CREATE TABLE IF NOT EXISTS submissions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name        text NOT NULL,
  description       text NOT NULL DEFAULT '',
  category          text NOT NULL,
  content           text NOT NULL,
  tags              text[] NOT NULL DEFAULT '{}',
  submitter_github  text NOT NULL,
  pr_number         integer,
  pr_url            text,
  status            text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- View: skills with their tags as an array and vote count
CREATE OR REPLACE VIEW skills_with_tags AS
  SELECT
    s.*,
    COALESCE(
      array_agg(t.name ORDER BY t.name) FILTER (WHERE t.name IS NOT NULL),
      '{}'::text[]
    ) AS tags,
    COALESCE(v.vote_count, 0)::int AS vote_count
  FROM skills s
  LEFT JOIN skill_tags st ON st.skill_id = s.id
  LEFT JOIN tags t         ON t.id = st.tag_id
  LEFT JOIN (
    SELECT skill_id, count(*) AS vote_count FROM votes GROUP BY skill_id
  ) v ON v.skill_id = s.id
  GROUP BY s.id, v.vote_count;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Mark skills older than 30 days as no longer new (run via cron or on read)
CREATE OR REPLACE FUNCTION mark_old_skills() RETURNS void AS $$
  UPDATE skills SET is_new = false
  WHERE is_new = true AND created_at < now() - interval '30 days';
$$ LANGUAGE sql;

-- RLS: public read, no public write
ALTER TABLE skills       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags         ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_tags   ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions  ENABLE ROW LEVEL SECURITY;

-- Anyone can read skills and tags
CREATE POLICY "public read skills"      ON skills      FOR SELECT USING (true);
CREATE POLICY "public read tags"        ON tags        FOR SELECT USING (true);
CREATE POLICY "public read skill_tags"  ON skill_tags  FOR SELECT USING (true);

-- Anyone can vote (no auth required for this lightweight tool)
CREATE POLICY "public vote"             ON votes       FOR ALL    USING (true) WITH CHECK (true);

-- Anyone can submit
CREATE POLICY "public submit"           ON submissions FOR INSERT WITH CHECK (true);

-- Service role bypasses RLS for sync workflow
