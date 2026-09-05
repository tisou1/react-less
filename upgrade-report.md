# 依赖升级报告（react-less）

升级日期：2026-09-04 · 检测工具：本地 taze@19.10.0（`taze major -l`）· 包管理器：pnpm 11.23.0

## 一、升级前后版本对照

### dependencies

| 包名 | 升级前 | 升级后 | 跨度 |
| --- | --- | --- | --- |
| @reduxjs/toolkit | 2.6.1 | 2.12.0 | minor |
| @tailwindcss/vite | ^4.0.14 | ^4.3.3 | minor |
| clsx | ^2.1.1 | ^2.1.1 | 已是最新 |
| i18next | 24.2.3 | 26.4.2 | **major ×2** |
| i18next-browser-languagedetector | 8.0.4 | 8.2.1 | minor |
| i18next-http-backend | ^3.0.2 | ^4.0.2 | **major** |
| react | 19.0.0 | 19.2.8 | minor |
| react-dom | 19.0.0 | 19.2.8 | minor |
| react-i18next | 15.4.1 | 17.0.13 | **major ×2** |
| react-redux | 9.2.0 | 9.3.0 | minor |
| react-router | ^7.3.0 | ^8.3.1 | **major** |
| tailwindcss | ^4.0.14 | ^4.3.3 | minor |

### devDependencies

| 包名 | 升级前 | 升级后 | 跨度 |
| --- | --- | --- | --- |
| @antfu/eslint-config | 4.10.1 | 9.5.1 | **major ×5** |
| @types/node | 18.19.80 | 26.4.1 | **major ×8** |
| @types/react | 19.0.10 | 19.2.18 | minor |
| @types/react-dom | 19.0.4 | 19.2.7 | minor |
| @vitejs/plugin-react | 4.3.4 | 6.1.1 | **major ×2** |
| eslint | 9.22.0 | 10.9.1 | **major** |
| typescript | 5.8.2 | 6.0.3 | **major**（见"例外说明 1"） |
| unplugin-auto-import | 19.1.1 | 21.1.0 | **major ×2** |
| vite | 6.2.2 | 8.2.2 | **major ×2** |
| vite-plugin-pages | 0.32.5 | 0.33.3 | minor |
| vitest | 3.0.8 | 5.0.0 | **major ×2** |

## 二、破坏性变更与适配

1. **react-router 8 ESM-only 类型导出**
   - 现象：`moduleResolution: "node"`（node10 解析）无法读取 react-router 8 的 `exports` 类型，全部 `react-router` 导入报 TS2307。
   - 适配：`tsconfig.json` / `tsconfig.node.json` 的 `moduleResolution` 改为 Vite 官方推荐的 `"bundler"`。业务代码（BrowserRouter/useRoutes/Link 等）无需改动。

2. **vite-plugin-pages 类型入口修正**
   - 现象：tsconfig `types` 中的 `vite-plugin-pages/client` 是 Vue 入口，引用未安装的 `vue-router`（此问题升级前即存在，导致基线 build 失败）。
   - 适配：改为 React 入口 `vite-plugin-pages/client-react`。**该改动顺带修复了升级前就存在的存量 build 失败。**

3. **vite 8 native config loader 弃用 `__dirname`**
   - 适配：`vite.config.ts` 中 `path.resolve(__dirname, 'src')` 改为 `path.resolve(import.meta.dirname, 'src')`。

4. **@antfu/eslint-config 4→9 新增 pnpm workspace 规则**
   - 现象：lint 报 `pnpm-workspace.yaml` 缺少 `minimumReleaseAgeExcludePrune`/`trustPolicy: no-downgrade`/`shellEmulator` 等设置（`pnpm/yaml-enforce-settings`）。
   - 适配：已通过 `eslint --fix` 自动补齐并排序。

5. **pnpm 11 供应链信任策略误报**
   - 现象：启用 `trustPolicy: no-downgrade` 后，lockfile 中 `reselect@5.1.1`（@reduxjs/toolkit 2.12.0 的依赖）被标记为"信任降级（疑似包接管）"。
   - 适配：经核实为信任元数据变更误报，已在 `pnpm-workspace.yaml` 中通过 `trustPolicyExclude` 按 `reselect@5.1.1` 精确排除。

6. **源码层面**：react 19.2 / react-redux 9.3 / i18next 26 / react-i18next 17（use、init、initReactI18next、LanguageDetector、HTTP backend 等现用 API 均向后兼容）/ vitest 5 均无需改代码，已由 tsc 严格类型检查 + 测试验证。

6.1. **TypeScript 7 配置迁移预演（已实测）**：尝试 TS 7.0.2 时，tsconfig 完成了三项迁移并经 tsc 验证：移除已删除的 `baseUrl`（TS5102）、`paths` 改为相对路径 `./src/*`（TS5090）、移除已删除的 `esModuleInterop: false`（TS5108）。这些改动向下兼容 TS 5.9，已保留。

## 三、例外说明

1. **typescript 升至 6.0.3（TS 7.0.2 暂缓）**：
   - typescript 最终定版 **6.0.3**：@typescript-eslint 8.69.0 的 peer 要求 `>=4.8.4 <6.1.0`，6.0.3 在兼容范围内。全套验证通过（install / peers check / tsc+vite build / vitest / eslint）。
   - TS 7.0.2 已实测：`tsc && vite build` 与 `vitest` 可运行，但 `eslint` 硬失败——@typescript-eslint 8.69.0 在模块加载时抛出 `typescript-eslint does not support TS 7.0`（运行时版本硬校验，peer 放行无法绕过）。待其支持 TS ≥7.1（tracking issue typescript-eslint#10940）后将 typescript 升至 7.x。
   - 检测备注：taze 的 major 模式只展示最新大版本（直接 5.9→7.0.2），跳过了中间的 6.x 稳定版，TS 6 需通过 registry 版本列表定点确认。
   - 保留的 TS 6/7 配置迁移（已在 6.0.3 下实测验证）：tsconfig 移除 `baseUrl`、`paths` 改用 `./src/*` 相对写法、移除 `esModuleInterop: false`（TS 7 中三者均为"已移除"级别报错 TS5102/TS5090/TS5108）。
2. 工作区原有的 `packageManager` 字段移除状态保持不变（升级前即已删除）。
3. `pnpm-lock.yaml` 由 pnpm 11 重新解析生成（含 lockfile 格式更新），属预期行为。

## 四、最终验证结果（全部通过）

| 项目 | 命令 | 结果 |
| --- | --- | --- |
| 安装 | `pnpm install` | ✓ exit 0，无 peer 冲突（`pnpm peers check` 干净） |
| 类型检查+构建 | `pnpm build`（tsc && vite build） | ✓ 125 modules，554ms |
| 单元测试 | `pnpm test`（vitest 5 run） | ✓ 1 file / 1 test passed |
| 代码规范 | `pnpm lint`（eslint 10 + antfu config 9） | ✓ 0 problems |

## 五、遗留风险

- typescript 7（原生编译器）尚未被 eslint 工具链支持，见例外说明 1。
- `reselect@5.1.1` 信任排除项若上游发布新版本，需确认新版本通过信任检查后移除该排除。
- i18next 26 / react-i18next 17 的深层 API（本次项目未用到的插件体系等）未做运行时回归，建议后续在 dev server 冒烟中确认多语言加载正常。
