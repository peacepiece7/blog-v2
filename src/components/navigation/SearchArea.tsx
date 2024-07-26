"use client"

import useKeyboardJs from "react-use/lib/useKeyboardJs"
import { useEffect, useState } from "react"
import { SearchBar } from "@/components/common/Button/SearchBar"
import { Modal, ModalLayout } from "@/components/modal/Modal"

export const SearchArea = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPressed, event] = useKeyboardJs("ctrl + k")

  useEffect(
    function handleOnPressCtrlAndK() {
      if (isPressed) {
        console.log("EVENT : ", event)
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
          <SearchBar />
        </ModalLayout>
      </Modal>
      {/* 이 쉐끼는 장식용임 클릭하면 모달 오픈 하는 용도임*/}
      <SearchBar />
    </>
  )
}
