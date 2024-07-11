import { getFileNamesSafely, getPostPath } from '@/utils/fs'

export default async function PostPage({
  params,
}: {
  params: { pageId: string }
}) {
  const MDXPage = await new Promise<React.ComponentType>((resolve) => {
    const postPath = getPostPath('example', 'tailwind', '[pageId]')
    const fileNames = getFileNamesSafely(postPath, 'mdx')
    import(`./${fileNames[parseInt(params?.pageId) - 1 || 0]?.name}`).then(
      (module) => resolve(module.default)
    )
  })

  return (
    <>
      <MDXPage />
    </>
  )
}
