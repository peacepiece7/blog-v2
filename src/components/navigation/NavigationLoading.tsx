export default function NavigationLoading({}: Readonly<{}>) {
  return (
    <div className='relative h-auto col-start-1 col-end-2 row-start-2 row-end-4 flex group'>
      <nav
        className='relative h-full overflow-y-scroll z-10 pt-4'
        style={{ width: `300px` }}
      >
        <div className='flex justify-around'>
          <button
            tabIndex={1}
            className='border border-transparent rounded-md px-1 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          >
            목록
          </button>
          <button className='border border-transparent rounded-md px-1 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
            목차
          </button>
        </div>
        <div className='pt-10 text-sm ml-4'># 목차를 불러오고 있습니다!</div>
      </nav>
    </div>
  )
}
