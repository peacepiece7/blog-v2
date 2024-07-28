import { Header } from "@/components/header"
import { ContentsLayout, PostPageLayout } from "@/components/layout/Layout"
import { LeftSideBar } from "@/components/navigation/LeftSideBar"
import { PostAreaSlideProvider } from "@/contexts/usePostAreaContext"

export default function Home() {
  // 1. nav 링크를 클릭하면 왼쪽에서 로딩 컨텐츠가 스르륵 나옴
  // 2. 스르륵이 끝나면 라우터 이동 => or 미리 이동하는데 스르륵이 끝나면 컨텐츠가 변경됨 (이건 나중에)

  return (
    <div className="grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-[fit-content(100%)_1fr_1fr] h-full max-h-screen min-h-screen overflow-hidden">
      <Header />
      <PostAreaSlideProvider>
        <LeftSideBar />
        <ContentsLayout>
          <div className="p-14" />
        </ContentsLayout>
      </PostAreaSlideProvider>
    </div>
  )
}
