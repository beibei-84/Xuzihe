/**
 * 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 通用 canvas 背景粒子动画：页面包含 #Xuzihe_canvas 时自动启动
 */
(function () {
  'use strict';

  const Xuzihe_canvas = document.getElementById('Xuzihe_canvas');
  if (!Xuzihe_canvas) {
    return;
  }

  const Xuzihe_ctx = Xuzihe_canvas.getContext('2d');
  const Xuzihe_pointer = { x: -9999, y: -9999 };
  let Xuzihe_width = 0;
  let Xuzihe_height = 0;
  let Xuzihe_points = [];

  function Xuzihe_createPoint() {
    const Xuzihe_speed = 0.18 + Math.random() * 0.32;
    const Xuzihe_angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * Xuzihe_width,
      y: Math.random() * Xuzihe_height,
      vx: Math.cos(Xuzihe_angle) * Xuzihe_speed,
      vy: Math.sin(Xuzihe_angle) * Xuzihe_speed,
      r: 0.9 + Math.random() * 1.9
    };
  }

  function Xuzihe_buildPoints() {
    const Xuzihe_count = Math.min(110, Math.round((Xuzihe_width * Xuzihe_height) / 16000));
    Xuzihe_points = Array.from({ length: Xuzihe_count }, Xuzihe_createPoint);
  }

  function Xuzihe_resize() {
    const Xuzihe_dpr = window.devicePixelRatio || 1;
    Xuzihe_width = window.innerWidth;
    Xuzihe_height = window.innerHeight;
    Xuzihe_canvas.width = Math.round(Xuzihe_width * Xuzihe_dpr);
    Xuzihe_canvas.height = Math.round(Xuzihe_height * Xuzihe_dpr);
    Xuzihe_canvas.style.width = Xuzihe_width + 'px';
    Xuzihe_canvas.style.height = Xuzihe_height + 'px';
    Xuzihe_ctx.setTransform(Xuzihe_dpr, 0, 0, Xuzihe_dpr, 0, 0);
    Xuzihe_buildPoints();
  }

  function Xuzihe_drawFrame() {
    Xuzihe_ctx.clearRect(0, 0, Xuzihe_width, Xuzihe_height);

    // 粒子移动
    Xuzihe_points.forEach(function (Xuzihe_point) {
      Xuzihe_point.x += Xuzihe_point.vx;
      Xuzihe_point.y += Xuzihe_point.vy;

      if (Xuzihe_point.x < 0 || Xuzihe_point.x > Xuzihe_width) {
        Xuzihe_point.vx *= -1;
      }
      if (Xuzihe_point.y < 0 || Xuzihe_point.y > Xuzihe_height) {
        Xuzihe_point.vy *= -1;
      }

      // 鼠标附近轻微排斥
      const Xuzihe_dx = Xuzihe_point.x - Xuzihe_pointer.x;
      const Xuzihe_dy = Xuzihe_point.y - Xuzihe_pointer.y;
      const Xuzihe_dist = Math.hypot(Xuzihe_dx, Xuzihe_dy);
      if (Xuzihe_dist < 120 && Xuzihe_dist > 0.001) {
        const Xuzihe_force = (120 - Xuzihe_dist) / 120;
        Xuzihe_point.x += (Xuzihe_dx / Xuzihe_dist) * Xuzihe_force * 1.6;
        Xuzihe_point.y += (Xuzihe_dy / Xuzihe_dist) * Xuzihe_force * 1.6;
      }
    });

    // 粒子连线
    for (let Xuzihe_i = 0; Xuzihe_i < Xuzihe_points.length; Xuzihe_i++) {
      const Xuzihe_a = Xuzihe_points[Xuzihe_i];
      for (let Xuzihe_j = Xuzihe_i + 1; Xuzihe_j < Xuzihe_points.length; Xuzihe_j++) {
        const Xuzihe_b = Xuzihe_points[Xuzihe_j];
        const Xuzihe_distance = Math.hypot(Xuzihe_a.x - Xuzihe_b.x, Xuzihe_a.y - Xuzihe_b.y);
        if (Xuzihe_distance < 132) {
          Xuzihe_ctx.strokeStyle = 'rgba(96, 156, 255, ' + (0.28 * (1 - Xuzihe_distance / 132)).toFixed(3) + ')';
          Xuzihe_ctx.lineWidth = 1;
          Xuzihe_ctx.beginPath();
          Xuzihe_ctx.moveTo(Xuzihe_a.x, Xuzihe_a.y);
          Xuzihe_ctx.lineTo(Xuzihe_b.x, Xuzihe_b.y);
          Xuzihe_ctx.stroke();
        }
      }
    }

    // 粒子圆点
    Xuzihe_points.forEach(function (Xuzihe_point) {
      Xuzihe_ctx.beginPath();
      Xuzihe_ctx.arc(Xuzihe_point.x, Xuzihe_point.y, Xuzihe_point.r, 0, Math.PI * 2);
      Xuzihe_ctx.fillStyle = 'rgba(150, 196, 255, 0.85)';
      Xuzihe_ctx.shadowColor = 'rgba(88, 146, 255, 0.9)';
      Xuzihe_ctx.shadowBlur = 8;
      Xuzihe_ctx.fill();
      Xuzihe_ctx.shadowBlur = 0;
    });

    window.requestAnimationFrame(Xuzihe_drawFrame);
  }

  window.addEventListener('resize', Xuzihe_resize);
  window.addEventListener('mousemove', function (Xuzihe_event) {
    Xuzihe_pointer.x = Xuzihe_event.clientX;
    Xuzihe_pointer.y = Xuzihe_event.clientY;
  });
  window.addEventListener('mouseout', function () {
    Xuzihe_pointer.x = -9999;
    Xuzihe_pointer.y = -9999;
  });

  Xuzihe_resize();
  window.requestAnimationFrame(Xuzihe_drawFrame);
})();
