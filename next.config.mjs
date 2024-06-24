import createMDX from '@next/mdx'

const nextConfig = {
  // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  // 여기에 마크다운 플러그인 추가
})

export default withMDX(nextConfig)
