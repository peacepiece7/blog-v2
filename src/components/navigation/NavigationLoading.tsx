export default function NavigationLoading({}: Readonly<{}>) {
  return (
    <div className='relative h-auto col-start-1 col-end-2 row-start-2 row-end-4 flex group'>
      <nav
        className='relative h-full overflow-y-scroll z-10 pt-4'
        style={{ width: `300px` }}
      >
        <div>
          <button tabIndex={1} className='mr-4 truncate'>
            목록
          </button>
          <button>목차</button>
        </div>
        <div>목차를 불러오고 있습니다.</div>
      </nav>
    </div>
  )
}
