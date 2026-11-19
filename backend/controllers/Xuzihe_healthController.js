/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 健康检查控制器：统一返回 { code, msg, data }
 */
function Xuzihe_getHealth(req, res) {
  const Xuzihe_data = {
    project: '知乎的模仿与制作',
    student: '徐子荷',
    studentId: '24001010734',
    port: 8734,
    time: new Date().toISOString()
  };
  console.log('[健康检查] 请求成功：', req.ip);
  res.json({ code: 0, msg: '服务运行正常', data: Xuzihe_data });
}

module.exports = { Xuzihe_getHealth };
