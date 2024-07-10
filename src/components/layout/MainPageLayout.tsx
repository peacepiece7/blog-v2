export const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='col-start-2 col-end-5 row-start-2 row-end-4 p-4 m-10 overflow-hidden'>
        {children}
      </main>
    </>
  )
}
