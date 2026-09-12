# react-less

一个轻量的 React 起手项目，提供可交互组件、完整本地数据示例、中英文和深浅主题。

## 开始

使用满足 Vite 8 要求的 Node.js（20.19+ 或 22.12+）和 pnpm：

```sh
pnpm install
pnpm dev
```

开发地址为 http://localhost:3333。生产检查：

```sh
pnpm lint
pnpm test
pnpm build
pnpm preview
```

## 技术与页面

React 19、React Compiler、TypeScript、Vite 8、Tailwind CSS v4、shadcn/ui / Radix、Redux Toolkit、React Router、vite-plugin-pages、i18next、Vitest。

| 地址 | 内容 |
| --- | --- |
| / | 介绍、快速开始和能力入口 |
| /components | 展示、表单、交互、通知四类组件示例 |
| /settings | 外观、语言和本地通知偏好 |
| /examples/data | 项目增删改查、名称搜索、状态筛选、排序、每页 10 条 |
| /todo | 本地待办清单 |
| /hi/:name | 动态路由示例 |
| /test | Redux 和翻译命名空间示例 |
| 未知地址 | 404 与返回首页 |

## 示例数据与设置

- 数据列表首次生成 12 条当前语言的示例，使用 `react-less:projects:v1`。名称与描述作为用户数据保留，切换语言不会翻译已有数据；恢复示例会按当前语言重建。
- 设置使用 `react-less:settings:v1`。主题默认跟随系统；首次语言由浏览器检测，之后显式语言选择保存在设置中。外观与语言立即应用；通知偏好点击保存才持久化，恢复默认后仍需保存。
- Todo 保留原有 `todos` 存储键。损坏的数据安全回退，存储失败会提示；当前页面的操作仍然可用。
- 组件表单仅演示提交和重置，不持久化；账户、通知操作为模拟。项目不包含后端、真实通知或登录权限。
- 新设置使用版本化存储，不迁移旧 `theme` 键。清除浏览器数据会删除本地修改。

共用存储、偏好和项目逻辑位于 `src/lib`；主题订阅位于 `src/composables`。共用页面标题、空状态、加载状态及错误边界位于 `src/components`。

## 部署

`pnpm build` 生成 `dist`，包括 `public/locales` 中的中英文 JSON。将整个 `dist` 部署到站点根路径。

托管服务必须将不存在的页面路径回退到 `/index.html`，让 BrowserRouter 处理直接访问和刷新；静态资源与 `/locales/*.json` 应直接提供文件，不能返回 HTML。当前配置面向根路径，部署到子目录需同时调整 Vite base、Router basename 和翻译请求地址。

## 精简为你的项目

按需删除 `src/pages` 中的演示路由，并同步移除首页入口、顶栏导航和对应翻译。删除组件展示后，可移除 `src/components/home`；删除数据示例后，可移除 `src/lib/projects.ts` 与对应测试。

Redux 示例删除后，如业务不需要 Redux，可继续移除 store 和入口中的 Provider。保留 UI 基础组件、布局、主题和国际化，作为业务页面的基础。文件路由会自动发现新增页面。
