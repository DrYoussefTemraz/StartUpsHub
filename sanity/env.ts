export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-14'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

function cleanApiVersion(v: string | undefined): string {
  const fallback = '2024-10-01'
  const raw = (v ?? fallback).trim()
  const normalized = raw.startsWith('v') ? raw.slice(1) : raw

  // Accept either '1' or a date string YYYY-MM-DD
  const valid = /^(1|\d{4}-\d{2}-\d{2})$/.test(normalized)
  if (!valid) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SANITY_API_VERSION: "${raw}". Expected '1' or 'YYYY-MM-DD'`
    )
  }
  return normalized
}
