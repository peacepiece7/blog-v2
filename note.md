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
import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

# pm2

pm2 설치

`npm i --global pm2`

pm2 명령 설정 후 실행

```js
module.exports = {
  apps: [
    {
      name: "blog",
      script: "yarn",
      args: "run start",
      watch: true, // 파일 변경 감지 및 자동 재시작
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
```

```bash
pm2 start ecosystem.config.js --env production
```

관리 명령어

```bash
pm2 status

pm2 restart blog

pm2 stop blog

pm2 stop all

pm2 logs blog
```

## husky

yarn add -D husky lint-staged
npx husky

.lintstagedrc.json 또는 package.json아래 스크립트를 추가해주면 된다.

### nextjs 14 & yarn pnp에서 app, pages 경로를 찾지 못하는 문제

yarn pnp & nextjs 14에서 pre-commit에 `npx lint-staged`로 `next lint`를 사용하니까 app, pages directory를 찾지 못했다는 에러가 발생하여

`next lint` 대신 `eslint --ext ...`으로 대체하였다.

## preapre

`yarn install`시 `husky install` 명령어가 자동으로 실행되면 좋겠는데

package.json에서 `yarn prepare, yarn postinstall`은 동작하지 않은 것으로 보인다.

git clone시 항상 `yarn install & yarn prepare`를 해주거나 sh로 해결해야 할 것 같다.

# es-hangul

https://www.slash.page/ko/libraries/common/hangul/README.i18n

https://es-hangul.slash.page/

# auto-complete

https://react-autosuggest.js.org/
