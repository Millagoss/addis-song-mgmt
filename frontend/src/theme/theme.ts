import { Theme } from '@emotion/react'

export const theme: Theme = {
  colors: {
    background: '#0f172a',
    surface: '#111827',
    text: '#e5e7eb',
    primary: '#06b6d4',
    muted: '#6b7280',
    border: '#1f2937',
    success: '#10b981',
    danger: '#ef4444',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 40, 48],
  fonts: {
    body: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
} as const

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string
      surface: string
      text: string
      primary: string
      muted: string
      border: string
      success: string
      danger: string
    }
    space: number[]
    fonts: {
      body: string
    }
  }
}
