import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface ListProps {
  as: 'ul' | 'ol' | 'li'
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
}

const LIST = {
  ul: (props: any) => <ul className='list-disc ml-6' {...props} />,
  ol: (props: any) => <ol className='list-decimal ml-6' {...props} />,
  li: (props: any) => <li className='list-disc ml-6' {...props} />,
}

export const List = ({ as, props }: ListProps) => {
  return LIST[as](props)
}
