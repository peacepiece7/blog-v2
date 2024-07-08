# yarn

프로젝트 생성

```bash
mkdir blog-v2-yarn
cd ./blog-v2-yarn
corepack enable
yarn set version stable
yarn create next-app
```

[IDE(vscode) pnp 설정](https://yarnpkg.com/getting-started/editor-sdks#vscode)을 해줘야 타입 에러가 발생하지 않음

[.yarnrc.yml](https://yarnpkg.com/configuration/yarnrc) nodeLinker 같은 추가 설정이 필요할 경우 사용

[.npmrc](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc), [npm/init](https://github.com/npm/ini) registry 같은 추가 설정이 필요할 경우 사용

PnP 모드시 zip archives에서 타입을 가져와주는 yarn toolchain [ZipFS](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)  
(node_modules가 없기 때문에 타입 에러 발생 함 yarn pnp시 필수)

[yarn editor sdk](https://yarnpkg.com/getting-started/editor-sdks) 설정

> Install the ZipFS extension, which is maintained by the Yarn team.
> Run the following command, which will generate a .vscode/settings.json file:
> yarn dlx @yarnpkg/sdks vscode
> For safety reason VSCode requires you to explicitly activate the custom TS settings:
>
> 1. Press ctrl+shift+p in a TypeScript file
> 2. Choose "Select TypeScript Version"
> 3. Pick "Use Workspace Version"

`yarn dlx @yarnpkg/sdks vscode` 실행시 .yarn/sdks/typescript/lib 파일이 생성되고

.vscode/settings.json에 다음 설정이 추가된다.

```json
{
  "eslint.nodePath": ".yarn/sdks",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## gitignore

팀원이 모두 PnP를 사용하지 않거나 차후 변경 예정이라면 .pnp.cjs와 .pnp.loader.mjs 파일을 gitignore에 추가해야 함

# mdx

`yarn add @mdx-js/loader @mdx-js/react @next/mdx @types/mdx"`

.next.config.js에 mdx 설정 추가

```js
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  // 여기에 마크다운 플러그인 추가
})

export default withMDX(nextConfig)
```

/src/mdx-component.tsx 생성

```ts
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading,
    code: CodeBlock,
    pre: Preview,
    ...components,
  }
}
```

mdx 문법 하이라이트 [MDX extension](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)
