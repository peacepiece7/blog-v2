const path = require("path")
const r = [
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/css/tip/test/test2/[pageId]/1 CSS 트러블슈팅 로그.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/css/tip/[pageId]/2. 접근성.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/docker/[pageId]/1. docker window 설치.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/architecture/[pageId]/1. MDX로 블로그를 작성할 떄 고려할 점들.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/code/[pageId]/1. test.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/codepen/[pageId]/1. codepen test.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/md/[pageId]/1. md.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/mdx/[pageId]/1. mdx.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/mermaid/[pageId]/1. mermaid.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/nextjs-blog/[pageId]/1. 에러 정리.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/remote/[pageId]/1 리모트 테스트입니다.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/example/tailwind/[pageId]/1 tailwind.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/git/cli/[pageId]/1. git cli cheat sheet.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/java/syntax/[pageId]/1. 문법 정리.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/java/syntax/[pageId]/2. 클레스.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/java/syntax/[pageId]/3. api.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/raspberry_pi_home_server/[pageId]/1 DDNS 설정 및 외부 접속 환경 구성하기.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/raspberry_pi_home_server/[pageId]/2 Rasbeery Pi 4에 Ubuntu 22.04 설치 과정.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/raspberry_pi_home_server/[pageId]/3 라즈베리파이 방화벽 설정.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/raspberry_pi_home_server/[pageId]/4 Nginx 설치 및 에러 핸들링.mdx",
  "/home/peacepiece/web/repo/blog-v2/src/app/posts/@contents/typescript/[pageId]/1. 공변성, 반공변성, 이변성.mdx",
]

let group = {}
const postPath = ["src", "app", "posts", "@contents"]
const baseDir = path.join(process.cwd(), ...postPath)

r.forEach((dir) => {
  dir = dir.replaceAll(path.sep, "/").replaceAll("\\", "/")

  const left = dir.split("@contents/")[1]
  const key = left.split("/[pageId]")[0]
  if (key) {
    if (group[key]) {
      group[key].push(dir)
    } else {
      group[key] = [dir]
    }
  }

  Object.keys(group).forEach((key) => {
    group[key].forEach((filePath, idx) => {
      const relativePath = path.relative(baseDir, filePath)
      const parts = relativePath.split(path.sep)
      const fileName = parts.pop()
      const link = `/posts/${key}/${idx + 1}`
      const text = `/${key}/${fileName}`
      console.log({ link, text })
    })
  })
})
