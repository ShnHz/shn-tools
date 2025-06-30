# SHN工具箱 - 100个实用小工具

此工具完全基于cursor ai自动开发，并使用github action自动部署到github pages

一个基于 Vue 3 + TypeScript + TailwindCSS 构建的纯前端工具集合，包含100个实用的开发和日常使用工具。

## 🚀 特性

- ✨ **100个工具** - 涵盖文本处理、颜色设计、图片处理、日期时间、数学计算、编码加密、Web开发、随机生成、文件处理、数据可视化等10大类别
- 🎨 **现代化设计** - 使用 Bento Grid 布局，支持浅色/深色主题切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **纯前端运行** - 无需服务器，所有计算都在浏览器中完成
- 🔒 **隐私保护** - 数据不上传到服务器，保护用户隐私
- 🛠️ **开箱即用** - 无需注册登录，打开即用

## 🏗️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS
- **图标库**: Lucide Vue
- **路由**: Vue Router
- **状态管理**: Pinia
- **工具库**: VueUse

## 📦 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或
yarn dev

# 访问 http://localhost:5173
```

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint

# 自动修复代码风格问题
npm run lint --fix
```

## 📁 项目结构

```
shn-tools/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 公共组件
│   │   ├── tools/         # 工具组件 (100个)
│   │   └── ToolCard.vue   # 工具卡片组件
│   ├── data/              # 数据配置
│   │   └── tools.ts       # 工具配置
│   ├── router/            # 路由配置
│   ├── types/             # TypeScript 类型定义
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tailwind.config.js     # TailwindCSS 配置
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 🛠️ 工具分类

### 📝 文本处理 (10个)
- 字数统计 - 实时统计文本字数、字符数、段落数
- 大小写转换 - 文本大小写、驼峰命名等格式转换
- URL Slug生成 - 将文本转换为URL友好的slug格式
- 假文生成器 - 生成Lorem Ipsum占位文本
- Markdown预览 - Markdown转HTML实时预览
- JSON格式化 - JSON美化、压缩、验证
- YAML↔JSON - YAML与JSON格式互相转换
- HTML转文本 - 提取HTML中的纯文本内容
- 正则测试器 - 正则表达式实时匹配测试
- 文本对比 - 比较两个文本的差异

### 🎨 颜色设计 (10个)
- 颜色选择器 - 选择颜色并获取各种格式代码
- HEX↔RGB - HEX与RGB颜色格式互转
- 调色板生成 - 自动生成配色方案
- 对比度检测 - 检查颜色对比度是否符合无障碍标准
- 渐变生成器 - 生成CSS渐变代码
- 阴影生成器 - 生成CSS盒阴影代码
- 圆角预览器 - 可视化调整CSS圆角效果
- Favicon生成 - 生成多尺寸网站图标
- CSS Clamp计算 - 计算响应式字体大小
- Tailwind速查 - Tailwind CSS类名快速查找

### 🖼️ 图片处理 (10个)
- 图片压缩 - 在线压缩JPG/PNG/WebP图片
- 图片缩放 - 等比例缩放图片尺寸
- 格式转换 - PNG↔WebP↔JPG格式转换
- 图片裁剪 - 在线裁剪图片
- EXIF查看器 - 查看和删除图片元数据
- SVG压缩 - 压缩SVG文件大小
- GIF帧分离 - 将GIF动图分离为单独帧
- 视频剪辑 - 在浏览器中剪辑视频片段
- 音频转换 - 音频格式转换
- SVG雪碧图 - 生成SVG雪碧图

### ⏰ 日期时间 (10个)
- 时间戳转换 - Unix时间戳与日期互转
- Cron解析器 - 解析Cron表达式的执行时间
- 年龄计算器 - 精确计算年龄和天数
- 时间间隔 - 计算两个日期之间的间隔
- 时区转换 - 不同时区时间转换
- 周数计算 - 计算ISO周数
- 倒计时器 - 可视化倒计时工具
- 日期计算 - 日期加减天数/月份/年份
- 工作日计算 - 计算工作日天数
- 日历生成 - 生成月历图片

### 🧮 数学计算 (10个)
- 单位转换 - 长度、重量、温度等单位转换
- 百分比计算 - 百分比相关计算
- 三角形求解 - 根据边角求三角形其他属性
- 质数检测 - 检测数字是否为质数
- 二次方程 - 解一元二次方程
- 矩阵运算 - 矩阵加减乘除运算
- 汇率换算 - 货币汇率转换计算
- 罗马数字 - 阿拉伯数字与罗马数字互转
- 进制转换 - 2、8、10、16进制转换
- 随机数生成 - 生成指定范围的随机数

### 🔐 编码加密 (10个)
- Base64编码 - Base64编码解码工具
- URL编码 - URL编码解码工具
- JWT解析 - 解析JWT Token内容
- MD5哈希 - 计算文本MD5哈希值
- SHA256哈希 - 计算文本SHA256哈希值
- UUID生成 - 生成UUID v4标识符
- Bcrypt哈希 - 生成Bcrypt密码哈希
- 二维码生成 - 生成QR二维码
- 条形码生成 - 生成条形码
- 密码强度 - 检测密码强度等级

### 💻 Web开发 (10个)
- JSON转TS - JSON转TypeScript接口定义
- HTTP状态码 - HTTP状态码查询工具
- User-Agent解析 - 解析浏览器User-Agent信息
- MIME类型查询 - 查询文件MIME类型
- DNS查询 - 域名DNS记录查询
- IP信息查询 - 查询IP地址信息
- JWT生成 - 生成JWT Token
- UUID v5生成 - 基于命名空间生成UUID v5
- 正则速查表 - 常用正则表达式参考
- JSON对比 - 比较两个JSON的差异

### 🎲 随机生成 (10个)
- 占位图片 - 生成占位图片URL
- 虚拟用户 - 生成虚拟用户资料
- 随机颜色 - 生成随机颜色值
- 姓名生成器 - 生成随机中英文姓名
- 名言生成器 - 随机显示名人名言
- 密码生成器 - 生成安全密码
- 批量UUID - 批量生成UUID
- 骰子工具 - RPG骰子投掷器
- 抽奖器 - 随机抽奖工具
- 写作灵感 - 生成写作提示和灵感

### 📁 文件处理 (10个)
- CSV转JSON - CSV文件转JSON格式
- JSON转CSV - JSON数据转CSV文件
- Markdown目录 - 生成Markdown文档目录
- 文本转PDF - 将文本转换为PDF文件
- PDF合并 - 合并多个PDF文件
- PDF分割 - 将PDF拆分为多个文件
- Excel转JSON - Excel文件转JSON数据
- ZIP解压 - 在线解压ZIP文件
- 图片转PDF - 将图片转换为PDF文档
- 文件校验 - 计算文件哈希校验值

### 📊 数据可视化 (10个)
- CSV预览器 - 在线预览CSV文件内容
- JSON图表 - 将JSON数据生成图表
- Mermaid预览 - Mermaid图表预览器
- GeoJSON查看 - GeoJSON地理数据查看器
- Base64图片 - Base64图片预览器
- HTML预览 - 实时HTML代码预览
- 表格排序 - 表格数据排序和筛选
- URL解析器 - 解析URL各个组成部分
- 邮箱验证 - 验证邮箱地址格式
- 银行卡验证 - 银行卡号Luhn算法验证

## 🤝 贡献指南

欢迎贡献代码！请按照以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💡 反馈与建议

如果您有任何问题、建议或发现了 bug，请在 [GitHub Issues](../../issues) 中提出。

---

**让开发更高效，让工具更好用！** ⚡ 