import { HTMLAttributes } from "react"
import SearchIcon from "@/components/ui/Icons/SearchIcon"

export const SearchBar = ({
  onClick,
}: {
  onClick?: HTMLAttributes<HTMLInputElement>["onClick"]
}) => {
  return (
    <div className="btn-common flex items-center">
      <SearchIcon className="mr-4" />
      <input
        onClick={onClick}
        type="text"
        value="Search..."
        className="w-full border-0 focus:ring-2 bg-transparent py-4"
      />
    </div>
  )
}
