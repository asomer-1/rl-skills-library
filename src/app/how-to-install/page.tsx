import Link from 'next/link'

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

const STEP_STYLE: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid #3c3c3c',
  padding: '28px 32px',
  marginBottom: '2px',
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: '11px',
  color: '#7e7e7e',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  marginBottom: '8px',
}

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: '20px',
  color: '#ffffff',
  marginBottom: '12px',
}

const BODY_STYLE: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 300,
  fontSize: '15px',
  color: '#bbbbbb',
  lineHeight: 1.7,
}

const CODE_BLOCK_STYLE: React.CSSProperties = {
  background: '#0d0d0d',
  border: '1px solid #3c3c3c',
  padding: '16px 20px',
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '13px',
  color: '#e6e6e6',
  lineHeight: 1.6,
  marginTop: '16px',
  overflowX: 'auto',
  whiteSpace: 'pre',
}

const INLINE_CODE: React.CSSProperties = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '13px',
  color: '#e6e6e6',
  background: '#0d0d0d',
  border: '1px solid #3c3c3c',
  padding: '1px 6px',
}

export default function HowToInstallPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #3c3c3c', padding: '64px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '56px',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            HOW TO INSTALL.
          </div>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '18px',
            color: '#bbbbbb',
            maxWidth: '560px',
            lineHeight: 1.5,
          }}>
            Get a skill from this library running in Claude Code in under two minutes.
          </div>
        </div>
      </div>

      {/* M stripe */}
      <div style={{ height: '4px', background: M_STRIPE }} />

      {/* Body */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 40px', display: 'flex', gap: '64px' }}>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Prereq note */}
          <div style={{
            background: '#0d0d0d',
            border: '1px solid #3c3c3c',
            borderLeft: '3px solid #0066b1',
            padding: '16px 20px',
            marginBottom: '40px',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: '#bbbbbb',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>Prerequisite:</strong> You need Claude Code installed and running. If you haven&apos;t set it up yet, see the{' '}
            <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noreferrer" style={{ color: '#ffffff' }}>
              Claude Code docs →
            </a>
          </div>

          {/* Steps */}
          <div style={{ marginBottom: '48px' }}>
            <div style={STEP_STYLE}>
              <div style={LABEL_STYLE}>Step 01</div>
              <div style={HEADING_STYLE}>Download the skill file</div>
              <div style={BODY_STYLE}>
                On any skill page, click <strong style={{ color: '#ffffff' }}>DOWNLOAD .MD</strong> to save the file, or click <strong style={{ color: '#ffffff' }}>COPY FILE</strong> to copy the raw content to your clipboard.
              </div>
            </div>

            <div style={STEP_STYLE}>
              <div style={LABEL_STYLE}>Step 02</div>
              <div style={HEADING_STYLE}>Create the skill directory</div>
              <div style={BODY_STYLE}>
                Skills live in <code style={INLINE_CODE}>~/.claude/skills/</code>. Each skill gets its own folder named after the skill&apos;s slash command.
              </div>
              <div style={CODE_BLOCK_STYLE}>
{`mkdir -p ~/.claude/skills/<skill-name>`}
              </div>
              <div style={{ ...BODY_STYLE, marginTop: '12px' }}>
                For example, if the skill&apos;s command is <code style={INLINE_CODE}>/rl-timesheet</code>, the folder would be <code style={INLINE_CODE}>~/.claude/skills/rl-timesheet/</code>.
              </div>
            </div>

            <div style={STEP_STYLE}>
              <div style={LABEL_STYLE}>Step 03</div>
              <div style={HEADING_STYLE}>Place the file</div>
              <div style={BODY_STYLE}>
                Save the downloaded <code style={INLINE_CODE}>.md</code> file inside that folder as <code style={INLINE_CODE}>SKILL.md</code>.
              </div>
              <div style={CODE_BLOCK_STYLE}>
{`~/.claude/skills/
└── rl-timesheet/
    └── SKILL.md`}
              </div>
            </div>

            <div style={STEP_STYLE}>
              <div style={LABEL_STYLE}>Step 04</div>
              <div style={HEADING_STYLE}>Use it in Claude Code</div>
              <div style={BODY_STYLE}>
                No restart needed. In any Claude Code session, type <code style={INLINE_CODE}>/</code> followed by the skill name to invoke it. Claude will load the skill automatically from disk.
              </div>
              <div style={CODE_BLOCK_STYLE}>
{`/rl-timesheet`}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              TIPS
            </div>
            <div style={{ border: '1px solid #3c3c3c' }}>
              {[
                { title: 'Check the skill name', body: 'The folder name must exactly match what the skill expects as its slash command. Look at the top of the SKILL.md file — it will usually declare the command name.' },
                { title: 'Skill not showing up?', body: 'Make sure the file is named SKILL.md (all caps) and lives directly inside its own folder under ~/.claude/skills/. Nested directories won\'t work.' },
                { title: 'Multiple skills', body: 'You can install as many skills as you like. Each gets its own folder. They\'ll all be available as separate slash commands.' },
                { title: 'Updating a skill', body: 'To update, just replace the SKILL.md file with the newer version. No restart or config change needed.' },
              ].map(({ title, body }, i, arr) => (
                <div key={title} style={{
                  background: '#0d0d0d',
                  padding: '20px 24px',
                  borderBottom: i < arr.length - 1 ? '1px solid #3c3c3c' : 'none',
                }}>
                  <div style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#ffffff',
                    marginBottom: '6px',
                  }}>
                    {title}
                  </div>
                  <div style={{ ...BODY_STYLE, fontSize: '14px' }}>{body}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div style={{ width: '280px', minWidth: '280px', flexShrink: 0 }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              QUICK REFERENCE
            </div>
            <div style={{ border: '1px solid #3c3c3c' }}>
              {[
                { label: 'Skills directory', value: '~/.claude/skills/' },
                { label: 'File name', value: 'SKILL.md' },
                { label: 'Invoke command', value: '/<skill-name>' },
                { label: 'Restart required?', value: 'No' },
              ].map(({ label, value }, i, arr) => (
                <div key={label} style={{
                  background: '#0d0d0d',
                  padding: '14px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid #3c3c3c' : 'none',
                }}>
                  <div style={{ ...LABEL_STYLE, marginBottom: '4px' }}>{label}</div>
                  <code style={{ ...INLINE_CODE, display: 'inline-block' }}>{value}</code>
                </div>
              ))}
            </div>
          </div>

          <Link href="/" style={{
            display: 'block',
            border: '1px solid #3c3c3c',
            padding: '20px',
            background: '#1a1a1a',
            textDecoration: 'none',
          }}>
            <div style={{ ...LABEL_STYLE, marginBottom: '8px' }}>READY TO BROWSE?</div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: '#ffffff',
            }}>
              Browse all skills →
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
