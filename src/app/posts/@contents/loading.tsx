import NavigationLoading from '@/components/navigation/NavigationLoading'
import { forwardRef } from 'react'

/**
 * @description 포스트 페이지 로딩 중에 보여지는 레이아웃
 * - 좌측에서 우측으로 슬라이드
 * - 스켈레톤 UI
 */
export const ContentsLoading = forwardRef<HTMLDivElement>(
  function ContentsLoadingInner(props, ref) {
    return (
      <main
        ref={ref}
        className='col-start-2 col-end-5 row-start-2 row-end-4 p-4 m-20 border-slate-100 border-[1px] rounded-lg shadow-md overflow-hidden'
      >
        <div className='flex flex-col h-full grow shrink'>
          <div className='text-end mb-4'>
            <button className='border-2 m-2 py-1 px-4 transition-colors hover:bg-slate-200'>
              Close
            </button>
          </div>
          <div className='overflow-hidden h-full'>
            <div className='overflow-y-scroll h-full'>
              <h1>컨텐츠를 불러오고 있습니다~</h1>
            </div>
          </div>
        </div>
      </main>
    )
  }
)

export default function ContentsLoaingPage() {
  return (
    <>
      <NavigationLoading />
      <ContentsLoading />
    </>
  )
}
