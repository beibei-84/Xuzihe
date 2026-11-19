/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 数据库连接页交互：提交用户名 / 密码，调用 /api/database/connect 并展示结果
 */
(function () {
  'use strict';

  const Xuzihe_form = document.getElementById('Xuzihe_dbForm');
  const Xuzihe_userInput = document.getElementById('Xuzihe_user');
  const Xuzihe_passwordInput = document.getElementById('Xuzihe_password');
  const Xuzihe_submit = document.getElementById('Xuzihe_submit');
  const Xuzihe_result = document.getElementById('Xuzihe_result');
  const Xuzihe_resultTitle = document.getElementById('Xuzihe_resultTitle');
  const Xuzihe_resultMsg = document.getElementById('Xuzihe_resultMsg');
  const Xuzihe_resultList = document.getElementById('Xuzihe_resultList');

  function Xuzihe_renderResult(Xuzihe_success, Xuzihe_msg, Xuzihe_data) {
    Xuzihe_result.hidden = false;
    Xuzihe_result.classList.toggle('Xuzihe_result--success', Xuzihe_success);
    Xuzihe_result.classList.toggle('Xuzihe_result--error', !Xuzihe_success);

    Xuzihe_resultTitle.textContent = Xuzihe_success ? '连接成功' : '连接失败';
    Xuzihe_resultMsg.textContent = Xuzihe_msg || '';

    Xuzihe_resultList.innerHTML = '';
    if (!Xuzihe_data) {
      return;
    }

    const Xuzihe_labels = {
      host: '主机',
      user: '用户名',
      version: 'MySQL 版本',
      database: '当前数据库',
      time: '时间'
    };

    Object.keys(Xuzihe_labels).forEach(function (Xuzihe_key) {
      if (Xuzihe_data[Xuzihe_key] === undefined || Xuzihe_data[Xuzihe_key] === null) {
        return;
      }
      const Xuzihe_dt = document.createElement('dt');
      Xuzihe_dt.className = 'Xuzihe_resultKey';
      Xuzihe_dt.textContent = Xuzihe_labels[Xuzihe_key];

      const Xuzihe_dd = document.createElement('dd');
      Xuzihe_dd.className = 'Xuzihe_resultValue';
      Xuzihe_dd.textContent = Xuzihe_key === 'database' ? '未选择（默认库）' : String(Xuzihe_data[Xuzihe_key]);

      Xuzihe_resultList.appendChild(Xuzihe_dt);
      Xuzihe_resultList.appendChild(Xuzihe_dd);
    });
  }

  Xuzihe_form.addEventListener('submit', function (Xuzihe_event) {
    Xuzihe_event.preventDefault();

    const Xuzihe_user = Xuzihe_userInput.value.trim();
    const Xuzihe_password = Xuzihe_passwordInput.value;

    Xuzihe_submit.disabled = true;
    Xuzihe_submit.textContent = '连接中…';

    fetch('/api/database/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: Xuzihe_user, password: Xuzihe_password })
    })
      .then(function (Xuzihe_response) {
        return Xuzihe_response.json();
      })
      .then(function (Xuzihe_json) {
        console.log('[接口返回] /api/database/connect', Xuzihe_json);
        Xuzihe_renderResult(Xuzihe_json.code === 0, Xuzihe_json.msg, Xuzihe_json.data);
      })
      .catch(function (Xuzihe_error) {
        console.error('[接口错误] /api/database/connect', Xuzihe_error);
        Xuzihe_renderResult(false, '请求后端接口失败：' + Xuzihe_error.message, null);
      })
      .finally(function () {
        Xuzihe_submit.disabled = false;
        Xuzihe_submit.textContent = '连接数据库';
      });
  });
})();
