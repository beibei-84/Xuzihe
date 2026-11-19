/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 首页交互：导航统计与后端接口状态检测（canvas 背景动画见 Xuzihe_canvas.js）
 */
(function () {
  'use strict';

  /* ==================== 导航统计与当前页标记 ==================== */
  const Xuzihe_navLinks = document.querySelectorAll('#Xuzihe_nav a');
  const Xuzihe_pageCount = document.getElementById('Xuzihe_pageCount');
  const Xuzihe_currentFile = window.location.pathname.split('/').pop() || 'index.html';

  Xuzihe_navLinks.forEach(function (Xuzihe_link) {
    if (Xuzihe_link.getAttribute('href') === Xuzihe_currentFile) {
      Xuzihe_link.classList.add('Xuzihe_card--active');
    }
  });

  Xuzihe_pageCount.textContent = '已完成 ' + Xuzihe_navLinks.length + ' 个页面';

  /* ==================== 后端接口状态 ==================== */
  const Xuzihe_statusDot = document.getElementById('Xuzihe_statusDot');
  const Xuzihe_statusText = document.getElementById('Xuzihe_statusText');

  fetch('/api/health')
    .then(function (Xuzihe_response) {
      return Xuzihe_response.json();
    })
    .then(function (Xuzihe_json) {
      console.log('[接口返回] /api/health', Xuzihe_json);
      if (Xuzihe_json.code === 0) {
        Xuzihe_statusDot.classList.add('Xuzihe_statusDot--on');
        Xuzihe_statusText.textContent = '后端服务正常 · 端口 8734';
      } else {
        Xuzihe_statusDot.classList.add('Xuzihe_statusDot--off');
        Xuzihe_statusText.textContent = Xuzihe_json.msg || '后端服务异常';
      }
    })
    .catch(function (Xuzihe_error) {
      console.error('[接口错误] /api/health', Xuzihe_error);
      Xuzihe_statusDot.classList.add('Xuzihe_statusDot--off');
      Xuzihe_statusText.textContent = '未连接到后端服务';
    });
})();
