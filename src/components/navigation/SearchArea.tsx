"use client"
import useKeyboardJs from "react-use/lib/useKeyboardJs"
import { useEffect, useState } from "react"
import { SearchBarDecoration } from "@/components/common/Button/SearchBarDecoration"
import { SearchBar } from "@/components/common/Button/SearchBar"
import { Modal, ModalLayout } from "@/components/modal/Modal"

/**
 * 검색 기능을 제공하는 컴포넌트
 */
export const SearchArea = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPressed, event] = useKeyboardJs("ctrl + k")

  useEffect(
    function handleOnPressCtrlAndK() {
      if (isPressed) {
        event?.preventDefault()
        setIsOpen(true)
      }
    },
    [isPressed, event]
  )

  return (
    <>
      <Modal>
        <ModalLayout open={isOpen} onClose={() => setIsOpen(false)}>
          {isOpen && <SearchBar />}
        </ModalLayout>
      </Modal>
      {/* 이 쉐끼는 장식용임 클릭하면 모달 오픈 하는 용도임*/}
      <SearchBarDecoration onClick={() => setIsOpen(true)} />
    </>
  )
}
