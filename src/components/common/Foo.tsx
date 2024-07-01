interface Foo {
  foo: string
  bar: string
}
export default function Foo(props: Foo) {
  return (
    <p>
      FOO!!!
      {props.foo}
      {props.bar}
    </p>
  )
}
