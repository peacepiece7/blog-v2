import { getFileNamesSafely, getPostFullPath } from '@/utils/server'

export default async function PostPage({
  params,
}: Readonly<{
  params: { pageId: string }
}>) {
  const MDXPage = await new Promise<React.ComponentType>((resolve) => {
    const postPath = getPostFullPath('raspberry_pi_home_server', '[pageId]')
    const fileNames = getFileNamesSafely(postPath, 'mdx')
    import(`./${fileNames[parseInt(params?.pageId) - 1 || 0]?.name}`).then(
      (module) => resolve(module.default)
    )
  })

  return <MDXPage />
}
