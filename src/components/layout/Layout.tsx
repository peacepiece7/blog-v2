'use client'
import { useSlidePostContentArea } from '@/hooks/useSlidePostContentArea'
import { usePathname } from 'next/navigation'

export function ContentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPostPage = pathname.includes('posts')

  return isPostPage ? (
    <PostPageLayout>{children}</PostPageLayout>
  ) : (
    <MainPageLayout>{children}</MainPageLayout>
  )
}

function PostPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='col-start-2 col-end-5 row-start-2 row-end-4 m-20 border-slate-100 border-[1px] rounded-lg shadow-md overflow-hidden'>
      <div className='flex flex-col h-full grow shrink'>
        <div className='text-end mb-4'>
          <button className='border-2 m-2 py-1 px-4 transition-colors hover:bg-slate-200'>
            Close
          </button>
        </div>
        <div className='overflow-hidden h-full'>
          <div className='overflow-y-scroll h-full p-4'>{children}</div>
        </div>
      </div>
    </main>
  )
}

function MainPageLayout({ children }: { children: React.ReactNode }) {
  const { ContentsLoadingFrame } = useSlidePostContentArea()
  return (
    <ContentsLoadingFrame />
    // <main className='col-start-2 col-end-5 row-start-2 row-end-4 p-4 m-10 overflow-hidden'>
    //   {children}
    // </main>
  )
}
