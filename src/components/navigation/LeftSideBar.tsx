import { headers } from "next/headers"
import { Heading } from "mdast"
import React from "react"
import Navigation from "./Navigation"
import { fetcher } from "@/utils/server"
import { TreeNode } from "@/app/api/navigation/route"
import { X_CUSTOM_URL } from "@/constants/server"
import { createNavElements, createTOCElements } from "@/utils/server-components"
import { SearchItem } from "@/app/api/search/route"
import { SearchListProvider } from "@/contexts/useSearchListContext"

export async function LeftSideBar() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ""

  // Table of contents
  const isPostPage = url.includes("posts")

  const tocRes = await fetcher<{ tocTree: Heading[] }>(
    `/api/table-of-contents?url=${url}`,
    { cache: "no-cache" }
  )
  const navRes = await fetcher<{ navTree: TreeNode[] }>(`/api/navigation`, {})
  const searchRes = await fetcher<{ list: SearchItem[] }>(`/api/search`, {})

  return (
    <SearchListProvider value={searchRes.list}>
      <Navigation
        activeTab={isPostPage ? "toc" : "nav"}
        navChildren={createNavElements(navRes.navTree, [], 0)}
        tocChildren={createTOCElements(tocRes.tocTree)}
      />
    </SearchListProvider>
  )
}
