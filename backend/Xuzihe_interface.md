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

---

## 接口 02

- **接口路径**：`/api/database/connect`
- **HTTP 方法**：`POST`
- **请求参数**（`Content-Type: application/json`）：

  | 参数 | 类型 | 必填 | 说明 |
  | --- | --- | --- | --- |
  | user | string | 是 | MySQL 用户名 |
  | password | string | 是 | MySQL 密码 |

  ```
  示例：{ "user": "root", "password": "root" }
  ```

- **响应格式**：

  连接成功：

  ```json
  {
    "code": 0,
    "msg": "数据库连接成功",
    "data": {
      "host": "localhost",
      "user": "root",
      "version": "8.1.0",
      "database": null,
      "time": "2026-11-19T06:02:39.245Z"
    }
  }
  ```

  连接失败：

  ```json
  {
    "code": 2,
    "msg": "数据库连接失败：Access denied for user 'root'@'localhost' (using password: YES)",
    "data": { "host": "localhost", "user": "root", "time": "2026-11-19T06:02:39.260Z" }
  }
  ```

  参数缺失（HTTP 400）：

  ```json
  { "code": 1, "msg": "用户名不能为空", "data": null }
  ```

- **修改时间**：2026-11-19
