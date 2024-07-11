export const Blockquote: React.FC<React.HTMLProps<HTMLQuoteElement>> = ({
  children,
}) => {
  // 린트 동작 체크
  return (
    <blockquote className='border-l-4 border-gray-400 pl-4 italic'>
      {children}
    </blockquote>
  )
}
