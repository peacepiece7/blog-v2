import { getFileNamesSafely, getPostPath } from '@/utils/fs'

interface PostPageProps {
  children?: React.ReactNode
  params: {
    index: string
  }
}
export default async function PostPage({
  params,
}: {
  params: { pageId: string }
}) {
  const MDXPage = await new Promise<React.ComponentType>((resolve) => {
    const postPath = getPostPath('javascript', '[pageId]')
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