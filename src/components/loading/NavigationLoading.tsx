import { Button } from "../common/Button/Button"

export const NavigationLoading = ({}: Readonly<{}>) => {
  return (
    <div className="relative h-auto col-start-1 col-end-2 row-start-2 row-end-4 flex group z-30 bg-white">
      <nav
        className="relative h-full overflow-y-scroll z-10 pt-4"
        style={{ width: `300px` }}
      >
        <div className="flex justify-around">
          <Button>목록</Button>
          <Button>목차</Button>
        </div>
        <div className="pt-10 text-sm ml-4"># 목차를 불러오고 있습니다!</div>
      </nav>
    </div>
  )
}
