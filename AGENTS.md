<!-- 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash -->

# AGENTS.md

本文件是本项目的开发规则，任何人（包括 AI）在本项目中作业时必须严格遵守。

## 项目结构与技术栈

### 前端：`frontend/` 目录

- 使用原生 HTML、CSS、JavaScript。**禁止**使用任何第三方库、框架、CDN 链接。
- 目录结构：`frontend/` 下建 `css/`、`js/`、`fonts/`、`images/` 子目录。
  - `fonts/` 存放 iconfont 图标文件（如果有）。

### 后端：`backend/` 目录

- Node.js + Express，RESTful + MVC 风格。
- 所有接口以 `/api/` 为前缀。
- 端口固定为 `8734`。
- 使用 `express.static` 托管 `frontend/` 目录。
- 后端支持所有跨域访问。
- 依赖安装：优先执行 `cnpm i 包名`；失败或超时则改用 `npm i 包名`。

### 数据库：MySQL

- 连接凭据统一写入 `backend/.env`，变量名为 `DB_USER`、`DB_PASSWORD`、`DB_HOST`、`DB_NAME`。
- 凭据**不得**出现在代码中，也**不得**写入本文件。
- `backend/.env` 必须加入 `.gitignore`。
- 根据后端需求自行建立和修改数据库表；每张表建立后，插入至少 8 条有真实业务意义的测试数据。

## 命名与注释

- CSS 类名、JS 变量名、JS 函数名、数据库表名（及字段相关命名）一律以 `Xuzihe_` 开头。
- 每个文件头部包含注释块：

```
姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：{本次使用的大模型名称}
```

## 记录文件（一律追加写入，禁止覆盖已有内容）

- `Xuzihe_prompt.md`（项目根目录）：每次向 AI 发出开发指令后，追加记录：`时间 | 提示词全文 | 大模型名称`。
- `backend/Xuzihe_interface.md`：每次创建或修改接口后，追加记录：接口路径 | HTTP 方法 | 请求参数（含示例）| 响应格式（含 JSON 示例）| 修改时间。
- `backend/Xuzihe_database.md`：每次建表、改表或插入数据后，按执行顺序追加对应 SQL 语句（含测试数据的 INSERT）。要求仅凭此文件即可在新机器上完整重建数据库。

## 统一响应格式

所有接口统一返回 JSON：

```json
{ "code": 0, "msg": "提示信息", "data": {} }
```

`code = 0` 表示成功，非 `0` 表示失败。

## 前端约定

- 服务器返回的数据和错误信息输出到浏览器控制台（`console.log` / `console.error`）。
- 新建 HTML 页面后，在 `frontend/index.html` 中追加超链接入口；文件名包含 `detail` 的页面除外。
