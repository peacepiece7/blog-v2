import { ContentsLoading } from "@/components/loading/ContentsLoading"
import { NavigationLoading } from "@/components/loading/NavigationLoading"

/**
 * @todo RSC에서 테스트 필요 (색이 다름)
 */
export default function ContentsLoaingPage() {
  return (
    <>
      <NavigationLoading />
      <ContentsLoading />
    </>
  )
}
