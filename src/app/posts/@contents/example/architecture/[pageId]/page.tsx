import { getFileNamesSafely, getPostPath } from '@/utils/fs'

export default async function PostPage({
  params
}: {
  params: { pageId: string }
}) {

  const foo = 100
  const MDXPage = await new Promise<any>((resolve) => {
    const postPath = getPostPath('example', 'architecture', '[pageId]')
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