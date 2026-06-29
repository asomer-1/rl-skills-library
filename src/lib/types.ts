export type Category =
  | 'email'
  | 'calendar'
  | 'research'
  | 'rocketlane'
  | 'writing'
  | 'data'
  | 'communication'
  | 'tools'

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface Skill {
  id: string
  slug: string
  name: string
  description: string
  category: Category
  author: string
  version: string
  content: string
  github_path: string
  is_new: boolean
  vote_count: number
  download_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  skill_name: string
  description: string
  category: Category
  content: string
  tags: string[]
  submitter_github: string
  pr_number: number | null
  pr_url: string | null
  status: SubmissionStatus
  created_at: string
  updated_at: string
}

export const CATEGORY_META: Record<Category, { label: string; tint: string; eyebrowBg: string }> = {
  email:         { label: 'EMAIL & GMAIL',       tint: '#d77a7a', eyebrowBg: '#d77a7a' },
  calendar:      { label: 'CALENDAR',             tint: '#9ab6c8', eyebrowBg: '#9ab6c8' },
  research:      { label: 'RESEARCH & WEB',       tint: '#b3bd95', eyebrowBg: '#b3bd95' },
  rocketlane:    { label: 'ROCKETLANE',           tint: '#8c9ae0', eyebrowBg: '#8c9ae0' },
  writing:       { label: 'WRITING & DOCS',       tint: '#e6915d', eyebrowBg: '#e6915d' },
  data:          { label: 'DATA & ANALYSIS',      tint: '#8e8a25', eyebrowBg: '#8e8a25' },
  communication: { label: 'COMMUNICATION',        tint: '#c0d4a7', eyebrowBg: '#c0d4a7' },
  tools:         { label: 'TOOLS & UTILITIES',    tint: '#a5b8c0', eyebrowBg: '#a5b8c0' },
}

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[]
