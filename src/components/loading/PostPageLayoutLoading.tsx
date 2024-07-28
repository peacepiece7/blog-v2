"use client"
import { Button } from "@/components/ui/Button"

export function PostPageLayoutLoading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="global-layout">
      <div
        className={`flex flex-col h-full grow shrink rounded-xl shadow-md bg-white
        transition-all duration-500 ease-out
    `}
      >
        <div className="text-end mb-4">
          <Button className="border-2 m-2 py-1 px-4 transition-colors hover:bg-slate-200">
            Close
          </Button>
        </div>
        <div className="overflow-hidden h-full ">
          <div className="overflow-y-scroll h-full p-4">{children}</div>
        </div>
      </div>
    </main>
  )
}
