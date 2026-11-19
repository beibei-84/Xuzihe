---
name: github-commit-push
description: Commit current project changes and push to the GitHub repo over SSH. Use when the user asks to 提交到 GitHub, commit and push, or sync this project to origin. Do not use for pull request creation, rebasing, or force pushing.
---

# GitHub Commit & Push

目标仓库：`git@github.com:beibei-84/Xuzihe.git`（等价 HTTPS 地址 `https://github.com/beibei-84/Xuzihe.git`）。
认证使用本机已配置的 SSH 公钥，不要在仓库中写入任何凭据。

## 前置检查

1. 确认当前目录是项目根目录（存在 `AGENTS.md`、`frontend/`、`backend/`）。
2. 运行 `git status --short` 与 `git diff --stat`，列出本次将提交的改动。
3. 运行 `git remote -v`，确认 `origin` 存在且为 SSH 地址。
4. 若从未验证过 SSH，运行 `ssh -T git@github.com`：出现 `Hi beibei-84! You've successfully authenticated` 即成功，退出码为 1 属正常现象。

## 提交

1. 逐项 `git add` 具体文件路径，不要使用 `git add .` 或 `git add -A`。
2. 必须排除 `backend/.env`、`node_modules/`、日志等敏感或临时文件；若发现被暂存，立即 `git restore --staged` 并报告。
3. 暂存区为空则跳过提交，直接进入推送步骤。
4. 提交信息使用中文、说明“为什么”，通过 HEREDOC 传入：

```bash
git commit -m "$(cat <<'EOF'
feat: 新增数据库连接页与接口
EOF
)"
```

## 推送

1. 若无 `origin`：

```bash
git remote add origin git@github.com:beibei-84/Xuzihe.git
```

2. 若 `origin` 为 HTTPS 地址，改为 SSH：

```bash
git remote set-url origin git@github.com:beibei-84/Xuzihe.git
```

3. 首次推送当前分支并建立跟踪（本项目分支为 `master`）：

```bash
git push -u origin master
```

4. 之后直接 `git push`。
5. 禁止 `git push --force`、禁止改写已推送历史；推送失败时直接输出 stderr 并停止，不要循环重试。

## 完成汇报

输出：提交 hash、提交信息、推送分支、远程地址、`git status` 结果（应为 clean）。
