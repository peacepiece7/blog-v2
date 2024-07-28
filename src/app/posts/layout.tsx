import React from "react"
import { Header } from "@/components/header"

export default function PostsLayout(props: { contents: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-[fit-content(100%)_1fr_1fr] h-full max-h-screen min-h-screen overflow-hidden">
      <Header />
      {props.contents}
    </div>
  )
}
