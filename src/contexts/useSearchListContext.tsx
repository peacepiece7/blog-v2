"use client"

import { createContext, useContext } from "react"
import { SearchItem } from "@/app/api/search/route"

const SearchListContext = createContext<SearchItem[]>([])

export const SearchListProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: SearchItem[]
}) => {
  return (
    <SearchListContext.Provider value={value}>
      {children}
    </SearchListContext.Provider>
  )
}

export const useSearchListValue = () => {
  const ctx = useContext(SearchListContext)
  if (!ctx) {
    throw new Error("Cannot find SearchListProvider")
  }
  return ctx
}
