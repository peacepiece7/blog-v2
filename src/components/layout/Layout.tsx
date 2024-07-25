"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { ContentsLoading } from "@/components/loading/ContentsLoading"
import { Button } from "@/components/ui/Button"
import { usePostAreaSlideAnimation } from "@/hooks/useSlidePostContentArea"
import { usePostAreaSlideAction } from "@/contexts/usePostAreaContext"

export function ContentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPostPage = pathname.includes("posts")

  return isPostPage ? (
    <MainPageLayout>
      <PostPageLayout>{children}</PostPageLayout>
    </MainPageLayout>
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
  const router = useRouter()
  const [fadeOut, setFadeOut] = useState(false)

  return (
    <div
      className={`flex flex-col h-full grow shrink rounded-xl shadow-md bg-white
        transition-all duration-500 ease-out
        ${fadeOut ? "-translate-x-3/4 opacity-0 invisible" : ""}
    `}
    >
      <div className="text-end mb-4">
        {/* TODO : Link로 교체하거나 preload로 route.back 되는 방법 ㄱㄱ */}
        <Button
          className="border-2 m-2 py-1 px-4 transition-colors hover:bg-slate-200"
          onClick={() => {
            setFadeOut(true)
            // router.back()
          }}
        >
          Close
        </Button>
      </div>
      <div className="overflow-hidden h-full ">
        <div className="overflow-y-scroll h-full p-4">{children}</div>
      </div>
    </div>
  )
}
