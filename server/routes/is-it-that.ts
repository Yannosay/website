import { defineEventHandler, sendRedirect } from 'h3'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler((event) => {
  const filePath = join(process.cwd(), './public/html/is-it-that/index.html')
  return readFileSync(filePath, 'utf-8')
})