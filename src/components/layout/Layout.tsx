"use client"
import { usePostAreaSlideAnimation } from "@/hooks/useSlidePostContentArea"
import { usePathname } from "next/navigation"
import { ContentsLoading } from "../loading/ContentsLoading"

export function ContentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPostPage = pathname.includes("posts")

  return isPostPage ? (
    <PostPageLayout>{children}</PostPageLayout>
  ) : (
    <MainPageLayout>{children}</MainPageLayout>
  )
}

export function MainPageLayout({ children }: { children: React.ReactNode }) {
  const { contentsRef } = usePostAreaSlideAnimation()

  return (
    <>
      <ContentsLoading ref={contentsRef} />
      <main className="global-layout">{children}</main>
    </>
  )
}

export function PostPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="global-layout">
      <div
        className={`flex flex-col h-full grow shrink rounded-xl shadow-md bg-white`}
      >
        <div className="text-end mb-4">
          <button className="border-2 m-2 py-1 px-4 transition-colors hover:bg-slate-200">
            Close
          </button>
        </div>
        <div className="overflow-hidden h-full ">
          <div className="overflow-y-scroll h-full p-4">{children}</div>
        </div>
      </div>
    </main>
  )
}
