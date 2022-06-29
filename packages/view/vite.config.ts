import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const COVERAGE_THRESHOLD = '95'

// https://vitejs.dev/config/
export default defineConfig(({ mode: _ }: { mode: string }) => ({
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      [COVERAGE_THRESHOLD]: true,
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
    },
    globalSetup: './globalTestSetup',
  },
  dedupe: ['react', 'react-dom'],
  plugins: [react()],
}))
