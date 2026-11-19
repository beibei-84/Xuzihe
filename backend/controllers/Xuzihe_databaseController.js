/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 数据库连接控制器：使用前端提交的用户名 / 密码尝试连接 MySQL
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mysql = require('mysql2/promise');

async function Xuzihe_connectDatabase(req, res) {
  const Xuzihe_body = req.body || {};
  const Xuzihe_user = typeof Xuzihe_body.user === 'string' ? Xuzihe_body.user.trim() : '';
  const Xuzihe_password = typeof Xuzihe_body.password === 'string' ? Xuzihe_body.password : '';
  const Xuzihe_host = process.env.DB_HOST || 'localhost';

  if (!Xuzihe_user) {
    console.error('[数据库连接] 参数错误：用户名不能为空');
    return res.status(400).json({ code: 1, msg: '用户名不能为空', data: null });
  }

  let Xuzihe_connection = null;
  try {
    Xuzihe_connection = await mysql.createConnection({
      host: Xuzihe_host,
      user: Xuzihe_user,
      password: Xuzihe_password,
      connectTimeout: 5000
    });

    const [Xuzihe_rows] = await Xuzihe_connection.query(
      'SELECT VERSION() AS version, DATABASE() AS currentDatabase'
    );

    const Xuzihe_data = {
      host: Xuzihe_host,
      user: Xuzihe_user,
      version: Xuzihe_rows[0].version,
      database: Xuzihe_rows[0].currentDatabase || null,
      time: new Date().toISOString()
    };

    console.log('[数据库连接] 成功：', Xuzihe_user, '@', Xuzihe_host);
    res.json({ code: 0, msg: '数据库连接成功', data: Xuzihe_data });
  } catch (Xuzihe_error) {
    console.error('[数据库连接] 失败：', Xuzihe_error.message);
    res.json({
      code: 2,
      msg: '数据库连接失败：' + Xuzihe_error.message,
      data: { host: Xuzihe_host, user: Xuzihe_user, time: new Date().toISOString() }
    });
  } finally {
    if (Xuzihe_connection) {
      await Xuzihe_connection.end().catch(function () {});
    }
  }
}

module.exports = { Xuzihe_connectDatabase };
