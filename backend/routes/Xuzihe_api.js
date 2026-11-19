/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 接口路由汇总：所有接口挂在 /api 下
 */
const express = require('express');
const Xuzihe_healthController = require('../controllers/Xuzihe_healthController');

const Xuzihe_router = express.Router();

Xuzihe_router.get('/health', Xuzihe_healthController.Xuzihe_getHealth);

module.exports = Xuzihe_router;
