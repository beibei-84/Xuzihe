# 知乎的模仿与制作

- 姓名：徐子荷
- 学号：24001010734
- 项目类别：模仿

## 技术栈

- 前端：原生 HTML / CSS / JavaScript（无任何第三方库、框架、CDN）
- 后端：Node.js + Express（RESTful + MVC，端口 8734，接口统一 `/api/` 前缀）
- 数据库：MySQL

## 目录结构

```
.
├── frontend/          # 前端页面（css / js / fonts / images）
├── backend/           # Express 后端服务
│   ├── app.js         # 服务入口
│   ├── config/        # 数据库连接配置
│   ├── controllers/   # 控制器
│   ├── routes/        # 接口路由
│   └── .env           # 数据库凭据（已被 .gitignore 排除）
├── AGENTS.md          # 项目开发规则
└── Xuzihe_prompt.md   # 开发指令记录
```

## 本地运行

```bash
cd backend
npm install
npm start
```

启动后访问 http://localhost:8734 即可打开前端首页，接口统一位于 http://localhost:8734/api/。

## 相关文档

- 接口文档：`backend/Xuzihe_interface.md`
- 数据库脚本：`backend/Xuzihe_database.md`
