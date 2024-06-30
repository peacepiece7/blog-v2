export const HEADING = {
  h1: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h1 id={id} className='text-6xl leading-[6rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h1>
    )),
  h2: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h2 id={id} className='text-5xl leading-[5rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h2>
    )),
  h3: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h3 id={id} className='text-4xl leading-[4rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h3>
    )),
  h4: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h4 id={id} className='text-3xl leading-[4rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h4>
    )),
  h5: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h5 id={id} className='text-2xl leading-[4rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h5>
    )),
  h6: (node: string | JSX.Element[]) =>
    createReaderbleId(node, (id) => (
      <h6 id={id} className='text-xl leading-[4rem] mt-8'>
        <a href={`#${id}`} target='_self'>
          {node}
        </a>
      </h6>
    )),
}

export function createReaderbleId(
  node: string | JSX.Element[],
  cb: (id: string) => JSX.Element
) {
  let plainText = ''
  if (typeof node === 'object') {
    node.forEach((obj) => {
      plainText += extactText(obj, '')
    })
  } else plainText = node

  const id = plainText.replace(/\s+/g, '_').toLowerCase().trim()
  return cb(id)
}

export function extactText(node: JSX.Element, text: string) {
  if (!node?.props?.children) {
    if (typeof node === 'string') text += node
    return text
  }

  if (Array.isArray(node.props.children)) {
    return node.props.children.forEach((child: JSX.Element) => {
      return extactText(child, text)
    })
  } else return extactText(node.props.children, text)
}
