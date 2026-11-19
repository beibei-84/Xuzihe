# Xuzihe_interface.md

> 姓名：徐子荷 | 学号：24001010734 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash

接口文档，追加记录，禁止覆盖已有内容。统一响应格式：`{ "code": 0, "msg": "提示信息", "data": {...} }`。

---

## 接口 01

- **接口路径**：`/api/health`
- **HTTP 方法**：`GET`
- **请求参数**：无

  ```
  示例：GET http://localhost:8734/api/health
  ```

- **响应格式**：

  ```json
  {
    "code": 0,
    "msg": "服务运行正常",
    "data": {
      "project": "知乎的模仿与制作",
      "student": "徐子荷",
      "studentId": "24001010734",
      "port": 8734,
      "time": "2026-11-19T05:45:00.000Z"
    }
  }
  ```

- **修改时间**：2026-11-19
