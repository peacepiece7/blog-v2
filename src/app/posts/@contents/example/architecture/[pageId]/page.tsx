import { getFileNamesSafely, getPostFullPath } from '@/utils/server'

export default async function PostPage({
  params,
}: Readonly<{
  params: { pageId: string }
}>) {
  const foo = 100
  const MDXPage = await new Promise<any>((resolve) => {
    const postPath = getPostFullPath('example', 'architecture', '[pageId]')
    const fileNames = getFileNamesSafely(postPath, 'mdx')
    import(`./${fileNames[parseInt(params?.pageId) - 1 || 0]?.name}`).then(
      (module) => resolve(module.default)
    )
  })

  return <MDXPage />
}
