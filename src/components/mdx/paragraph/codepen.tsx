import { Detail } from '@/components/mdx/detail'

export const Codepen: React.FC<React.HTMLProps<string | HTMLElement>> = ({
  children,
}) => {
  // "!codepen[https://codepen.io/pen/]" 형태의 문자열을 찾습니다.
  const codepenRegex = /!codepen\[(https:\/\/codepen\.io\/[^\]]+)\]/
  const url = children?.toString().match(codepenRegex)?.[1]
  const restString =
    children?.toString().replace(codepenRegex, '') || '코드펜 상세보기'
  return (
    <Detail summaryTitle={restString}>
      <iframe src={url} className='mt-4 w-full h-[420px]' />
    </Detail>
  )
}

/**
 * @param child !codepen[https://codepen.id/<...rest>] 형태이면 true를 반환합니다.
 */

export const isCodepenLinkSyntax = (child: unknown) => {
  if (typeof child !== 'string') return false
  const codepenRegex = /!codepen\[(https:\/\/codepen\.io\/[^\]]+)\]/
  return codepenRegex.test(child)
}
