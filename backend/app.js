/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 后端服务入口：Express 应用，统一 /api 前缀，静态托管 frontend/
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

const Xuzihe_apiRouter = require('./routes/Xuzihe_api');

const Xuzihe_app = express();
const Xuzihe_PORT = 8734;

// 支持所有跨域访问
Xuzihe_app.use(cors());
Xuzihe_app.use(express.json());
Xuzihe_app.use(express.urlencoded({ extended: true }));

// 所有接口以 /api/ 为前缀
Xuzihe_app.use('/api', Xuzihe_apiRouter);

// 静态托管前端目录
Xuzihe_app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 统一 404（仅针对未匹配的接口）
Xuzihe_app.use('/api', (req, res) => {
  console.error('[404] 未找到接口：', req.method, req.originalUrl);
  res.status(404).json({ code: 404, msg: '接口不存在', data: null });
});

Xuzihe_app.listen(Xuzihe_PORT, () => {
  console.log(`徐子荷 · 知乎的模仿与制作 后端服务已启动：http://localhost:${Xuzihe_PORT}`);
});
