import { Codepen, isCodepenLinkSyntax } from './codepen'

export const Paragraph: React.FC<React.HTMLProps<HTMLParagraphElement>> = (
  props
) => {
  // console.log('PROPS : ', props.children)
  // case1) !codepen[https://codepen.io/shcrlk12/embed/YzrRgPJ]  타이틀 추가해서 접기 기능 ㄱㄱ ==> leteral string
  // case2) !codepen[https://codepen.io/shcrlk12/embed/YzrRgPJ]  **타이틀 추가해서 접기 기능 ㄱㄱ** ==> array
  // case3) !codepen[https://codepen.io/shcrlk12/embed/YzrRgPJ]  **타이틀 추가해서 접기 기능 ㄱㄱ** ㄱㄱ ==> aray

  if (Array.isArray(props.children)) {
    type TReduceReturn = {
      codepens: (typeof Codepen)[]
      paragraphs: typeof props.children
    }
    // codepend 링크와 일반 문장을 구분합니다.
    const { codepens, paragraphs } = props.children.reduce<TReduceReturn>(
      (acc, child, idx) => {
        if (isCodepenLinkSyntax(child)) {
          acc.codepens.push((<Codepen key={idx}>{child}</Codepen>) as any)
        } else {
          acc.paragraphs.push(child)
        }
        return acc
      },
      { codepens: [], paragraphs: [] }
    )
    return (
      <>
        {codepens.map((codepen) => codepen)}
        {<p className='mt-4'>{...paragraphs}</p>}
      </>
    )
  }

  if (isCodepenLinkSyntax(props.children)) {
    return <Codepen children={props.children} />
  }
  return <p {...props} className='mt-4' />
}
