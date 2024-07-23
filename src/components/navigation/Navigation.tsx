"use client"
import { useNavAnimation } from "@/hooks/useNavAnimation"
import { useResizeSidebar } from "@/hooks/useResizeSidebar"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { Button } from "../common/Button/Button"

export default function Navigation({
  navChildren,
  tocChildren,
  activeTab = "nav",
}: Readonly<{
  navChildren: React.ReactNode
  tocChildren: React.ReactNode
  activeTab: "nav" | "toc"
}>) {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const { barRef, sideBarWidth } = useResizeSidebar()
  const { navTree } = useNavAnimation(navChildren, pathname?.split("/"))
  const [activeIdx, setActiveIdx] = useState(activeTab === "nav" ? 0 : 1)

  const isPostPage = pathname.includes("posts")

  return (
    <div className="relative h-auto col-start-1 col-end-2 row-start-2 row-end-4 flex group z-30 bg-white">
      <nav
        ref={navRef}
        className="relative h-full overflow-y-scroll z-10 pt-4"
        style={{ width: `${sideBarWidth}px` }}
      >
        <div className="flex justify-around">
          <Button
            onClick={() => setActiveIdx(0)}
            className={`
               ${
                 activeIdx === 0
                   ? "border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
                   : ""
               }`}
          >
            목록
          </Button>
          {isPostPage && (
            <Button
              onClick={() => setActiveIdx(1)}
              className={`
                ${
                  activeIdx === 1
                    ? "border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
                    : ""
                }`}
            >
              목차
            </Button>
          )}
        </div>
        <div className="pt-10 text-sm">
          <div className={`${activeIdx === 0 ? "visible" : "hidden"}`}>
            {navTree}
          </div>
          {isPostPage && (
            <div className={`${activeIdx === 1 ? "visible" : "hidden"}`}>
              {tocChildren}
            </div>
          )}
        </div>
      </nav>
      <div
        draggable
        ref={barRef}
        className={`
        absolute w-4 h-full top-0 bottom-0 right-0 m-auto bg-slate-300 opacity-5
        transition-all ease-in-out cursor-col-resize
        group-hover:opacity-100 group-hover:right-[-10px] duration-300 hover:bg-slate-400
        `}
      />
    </div>
  )
}
