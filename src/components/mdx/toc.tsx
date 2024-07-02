import { readFile } from 'fs'

export function createTableOfContents(path: string) {
  readFile(`${path}/page.mdx`, (err, buffer) => {
    buffer
  })
}
