export default async function RemotePage() {
  // 서버에서 파일 uuid를 가져온 다음 해당 파일을 가져옵니다.
  // documents/<UUID>.mdx에서 해당 파일을 가져오는 방법으로 진행합니다.
  const MDXPage = await new Promise<React.ComponentType>((resolve) => {
    import('./리모트 테스트입니다.mdx').then((module) =>
      resolve(module.default)
    )
  })

  return (
    <>
      <MDXPage />
    </>
  )
}
