-- Add long-form readme and example prompt/output fields to skills
ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS readme         text,
  ADD COLUMN IF NOT EXISTS example_prompt text,
  ADD COLUMN IF NOT EXISTS example_output text;

-- skills_with_tags view uses SELECT s.* so new columns appear automatically.
-- Recreate the view explicitly to refresh the schema cache.
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
