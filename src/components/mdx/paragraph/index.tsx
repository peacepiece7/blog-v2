/**
 * @note \t 로 코드블럭을 구분하지 않습니다.
 */

export const Paragraph: React.FC<React.HTMLProps<HTMLParagraphElement>> = (
  props
) => {
  return <p {...props} className='mt-4'></p>
}
