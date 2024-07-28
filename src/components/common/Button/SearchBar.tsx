"use client"
import "./SearchBar.css"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { choseongIncludes } from "es-hangul"
import Autosuggest, {
  ContainerProps,
  InputProps,
  RenderSuggestionParams,
  SuggestionsFetchRequestedParams,
} from "react-autosuggest"
import { useSearchListValue } from "@/contexts/useSearchListContext"
import { SearchItem } from "@/app/api/search/route"

export const SearchBar = () => {
  const router = useRouter()
  const searchList = useSearchListValue()
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<SearchItem[]>(searchList)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const renderSuggestion = (
    suggestion: SearchItem,
    params: RenderSuggestionParams
  ) => {
    if (!suggestion) return null
    const delimiter = params.query.toLocaleLowerCase()
    const regex = new RegExp(`(?<=${delimiter})|(?=${delimiter})`)
    const parts = suggestion.text.toLocaleLowerCase().split(regex)

    const isMatched = (part: string, delimiter: string) => {
      if (part === delimiter) return true
      if (choseongIncludes(part, delimiter)) return true
      return false
    }
    return (
      <div className="p-4">
        {parts.map((part, index) => {
          if (parts.length === 1)
            return (
              <span key={index + part} className="font-normal">
                {part}
              </span>
            )

          return (
            <span
              key={index + part}
              className={`${
                isMatched(part, delimiter)
                  ? "font-bold text-rose-300"
                  : "font-normal"
              }`}
            >
              {part}
            </span>
          )
        })}
      </div>
    )
  }

  const fetchSuggestions = (rqs: SuggestionsFetchRequestedParams) => {
    const text = rqs.value.toLowerCase()
    const filteredList = searchList.filter((item) => {
      return (
        choseongIncludes(item.text, text) ||
        item.text.toLowerCase().includes(text)
      )
    })
    setList(filteredList)
    return filteredList
  }

  type TSuggesion = SearchItem
  const inputProps: InputProps<TSuggesion> = {
    onChange: (e) => {
      setInputValue(
        (e.target as HTMLInputElement)?.value ||
          (e.target as HTMLDivElement).textContent ||
          ""
      )
    },
    placeholder: "Search...",
    value: inputValue,
    className:
      "btn-common w-full border-0 focus:ring-2 bg-transparent py-4 pl-4",
    ref: inputRef,
  }
  const containerProps: ContainerProps = {
    className: "w-full h-full",
  }

  if (isLoading)
    return (
      <div className="w-full h-full px-4">
        <p className="p-10">선택된 링크로 이동합니다~</p>
      </div>
    )

  return (
    <>
      <form className="w-full h-full px-4 overflow-hidden">
        <Autosuggest
          suggestions={list}
          inputProps={inputProps}
          containerProps={containerProps}
          onSuggestionsFetchRequested={fetchSuggestions}
          onSuggestionSelected={(ev, props) => {
            setIsLoading(true)
            router.push(props.suggestion.link)
          }}
          getSuggestionValue={(suggestion) => suggestion.text}
          renderSuggestion={renderSuggestion}
          onSuggestionsClearRequested={() => setList(searchList)}
          shouldRenderSuggestions={(value) => {
            if (value && value.length > 0) return true
            return false
          }}
        />
      </form>
    </>
  )
}
