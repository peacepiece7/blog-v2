import { HTMLAttributes, forwardRef } from "react"
import { PostPageLayout } from "../layout/Layout"

/**
 * @description 포스트 페이지 로딩 중에 보여지는 레이아웃
 * - 좌측에서 우측으로 슬라이드
 * - 스켈레톤 UI
 */
export const ContentsLoading = forwardRef<
  HTMLElement,
  { className?: HTMLAttributes<HTMLElement>["className"] }
>(function ContentsLoadingInner(_props, ref) {
  return (
    <main
      ref={ref}
      className="global-layout invisible transition-all duration-700 ease-out -translate-x-1/3 opacity-40"
    >
      <PostPageLayout>
        <div>로딩 중 입니다...</div>
      </PostPageLayout>
    </main>
  )
})
