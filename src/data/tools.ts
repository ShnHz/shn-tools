import type { ToolInfo, CategoryInfo, ToolCategory } from '@/types/tools'

/**
 * 分类配置
 */
export const categories: CategoryInfo[] = [
  {
    id: 'text',
    name: '文本处理',
    description: '文本编辑、格式转换、正则匹配等',
    icon: 'FileText',
    color: 'bg-blue-500'
  },
  {
    id: 'color',
    name: '颜色设计',
    description: '颜色选择、格式转换、配色方案等',
    icon: 'Palette',
    color: 'bg-purple-500'
  },
  {
    id: 'image',
    name: '图片处理',
    description: '图片压缩、格式转换、编辑等',
    icon: 'Image',
    color: 'bg-green-500'
  },
  {
    id: 'datetime',
    name: '日期时间',
    description: '时间戳转换、日期计算、倒计时等',
    icon: 'Clock',
    color: 'bg-orange-500'
  },
  {
    id: 'math',
    name: '数学计算',
    description: '单位转换、数学运算、进制转换等',
    icon: 'Calculator',
    color: 'bg-red-500'
  },
  {
    id: 'encode',
    name: '编码加密',
    description: 'Base64、哈希、UUID、密码等',
    icon: 'Lock',
    color: 'bg-indigo-500'
  },
  {
    id: 'web',
    name: 'Web开发',
    description: 'JSON处理、HTTP状态、正则等',
    icon: 'Code',
    color: 'bg-cyan-500'
  },
  {
    id: 'random',
    name: '随机生成',
    description: '随机数、密码、名字、颜色等',
    icon: 'Shuffle',
    color: 'bg-pink-500'
  },
  {
    id: 'file',
    name: '文件处理',
    description: 'CSV、PDF、ZIP、Excel等格式处理',
    icon: 'FolderOpen',
    color: 'bg-yellow-500'
  },
  {
    id: 'data',
    name: '数据可视化',
    description: '图表生成、数据预览、格式转换等',
    icon: 'BarChart',
    color: 'bg-teal-500'
  }
]

/**
 * 100个工具配置
 */
export const tools: ToolInfo[] = [
  // 文本处理 (1-10)
  {
    id: 'word-count',
    name: '字数统计',
    description: '实时统计文本字数、字符数、段落数',
    category: 'text',
    icon: 'Hash',
    featured: true,
    tags: ['文本', '统计', '字数'],
    implemented: true
  },
  {
    id: 'char-case',
    name: '大小写转换',
    description: '文本大小写、驼峰命名等格式转换',
    category: 'text',
    icon: 'Type',
    tags: ['文本', '转换', '格式']
  },
  {
    id: 'slugify',
    name: 'URL Slug生成',
    description: '将文本转换为URL友好的slug格式',
    category: 'text',
    icon: 'Link',
    tags: ['URL', 'slug', 'SEO']
  },
  {
    id: 'lorem-ipsum',
    name: '假文生成器',
    description: '生成Lorem Ipsum占位文本',
    category: 'text',
    icon: 'FileText',
    tags: ['占位符', '假文', '测试']
  },
  {
    id: 'markdown-preview',
    name: 'Markdown预览',
    description: 'Markdown转HTML实时预览',
    category: 'text',
    icon: 'Eye',
    featured: true,
    tags: ['Markdown', 'HTML', '预览']
  },
  {
    id: 'json-pretty',
    name: 'JSON格式化',
    description: 'JSON美化、压缩、验证',
    category: 'text',
    icon: 'Braces',
    featured: true,
    tags: ['JSON', '格式化', '验证'],
    implemented: true
  },
  {
    id: 'yaml-to-json',
    name: 'YAML↔JSON',
    description: 'YAML与JSON格式互相转换',
    category: 'text',
    icon: 'RefreshCw',
    tags: ['YAML', 'JSON', '转换']
  },
  {
    id: 'html-to-text',
    name: 'HTML转文本',
    description: '提取HTML中的纯文本内容',
    category: 'text',
    icon: 'FileCode',
    tags: ['HTML', '文本', '提取']
  },
  {
    id: 'regex-tester',
    name: '正则测试器',
    description: '正则表达式实时匹配测试',
    category: 'text',
    icon: 'Search',
    featured: true,
    tags: ['正则', '匹配', '测试']
  },
  {
    id: 'diff-viewer',
    name: '文本对比',
    description: '比较两个文本的差异',
    category: 'text',
    icon: 'GitCompare',
    tags: ['对比', '差异', '文本'],
    implemented: true
  },

  // 颜色设计 (11-20)
  {
    id: 'color-picker',
    name: '颜色选择器',
    description: '选择颜色并获取各种格式代码',
    category: 'color',
    icon: 'Pipette',
    featured: true,
    tags: ['颜色', '选择器', 'HEX'],
    implemented: true
  },
  {
    id: 'hex-rgb',
    name: 'HEX↔RGB',
    description: 'HEX与RGB颜色格式互转',
    category: 'color',
    icon: 'Palette',
    tags: ['HEX', 'RGB', '转换'],
    implemented: true
  },
  {
    id: 'palette-generator',
    name: '调色板生成',
    description: '自动生成配色方案',
    category: 'color',
    icon: 'SwatchBook',
    tags: ['调色板', '配色', '生成'],
    implemented: true
  },
  {
    id: 'contrast-checker',
    name: '对比度检测',
    description: '检查颜色对比度是否符合无障碍标准',
    category: 'color',
    icon: 'Eye',
    tags: ['对比度', '无障碍', '检测'],
    implemented: true
  },
  {
    id: 'gradient-maker',
    name: '渐变生成器',
    description: '生成CSS渐变代码',
    category: 'color',
    icon: 'Zap',
    featured: true,
    tags: ['渐变', 'CSS', '生成']
  },
  {
    id: 'shadow-generator',
    name: '阴影生成器',
    description: '生成CSS盒阴影代码',
    category: 'color',
    icon: 'Square',
    tags: ['阴影', 'CSS', 'box-shadow']
  },
  {
    id: 'border-radius',
    name: '圆角预览器',
    description: '可视化调整CSS圆角效果',
    category: 'color',
    icon: 'Square',
    tags: ['圆角', 'CSS', '预览']
  },
  {
    id: 'favicon-generator',
    name: 'Favicon生成',
    description: '生成多尺寸网站图标',
    category: 'color',
    icon: 'Star',
    tags: ['favicon', '图标', '网站']
  },
  {
    id: 'css-clamp',
    name: 'CSS Clamp计算',
    description: '计算响应式字体大小',
    category: 'color',
    icon: 'Ruler',
    tags: ['CSS', 'clamp', '响应式']
  },
  {
    id: 'tailwind-cheatsheet',
    name: 'Tailwind速查',
    description: 'Tailwind CSS类名快速查找',
    category: 'color',
    icon: 'BookOpen',
    tags: ['Tailwind', 'CSS', '速查']
  },

  // 编码加密 (21-30)
  {
    id: 'base64-encode',
    name: 'Base64编码',
    description: 'Base64编码解码工具',
    category: 'encode',
    icon: 'Code',
    featured: true,
    tags: ['Base64', '编码', '解码'],
    implemented: true
  },
  {
    id: 'url-encode',
    name: 'URL编码',
    description: 'URL编码解码工具',
    category: 'encode',
    icon: 'Link',
    tags: ['URL', '编码', '解码']
  },
  {
    id: 'jwt-decode',
    name: 'JWT解析',
    description: '解析JWT Token内容',
    category: 'encode',
    icon: 'Key',
    featured: true,
    tags: ['JWT', 'Token', '解析']
  },
  {
    id: 'md5-hash',
    name: 'MD5哈希',
    description: '计算文本MD5哈希值',
    category: 'encode',
    icon: 'Hash',
    tags: ['MD5', '哈希', '加密']
  },
  {
    id: 'sha256-hash',
    name: 'SHA256哈希',
    description: '计算文本SHA256哈希值',
    category: 'encode',
    icon: 'Shield',
    tags: ['SHA256', '哈希', '加密']
  },
  {
    id: 'uuid-generator',
    name: 'UUID生成',
    description: '生成UUID v4标识符',
    category: 'encode',
    icon: 'Fingerprint',
    featured: true,
    tags: ['UUID', '唯一标识', '生成']
  },
  {
    id: 'bcrypt-hash',
    name: 'Bcrypt哈希',
    description: '生成Bcrypt密码哈希',
    category: 'encode',
    icon: 'Lock',
    tags: ['Bcrypt', '密码', '哈希']
  },
  {
    id: 'qr-generator',
    name: '二维码生成',
    description: '生成QR二维码',
    category: 'encode',
    icon: 'QrCode',
    featured: true,
    tags: ['二维码', 'QR', '生成']
  },
  {
    id: 'barcode-generator',
    name: '条形码生成',
    description: '生成条形码',
    category: 'encode',
    icon: 'BarChart',
    tags: ['条形码', '生成', '扫描']
  },
  {
    id: 'password-strength',
    name: '密码强度',
    description: '检测密码强度等级',
    category: 'encode',
    icon: 'ShieldCheck',
    tags: ['密码', '强度', '安全']
  },

  // 数学计算 (31-40)
  {
    id: 'unit-convert',
    name: '单位转换',
    description: '长度、重量、温度等单位转换',
    category: 'math',
    icon: 'Ruler',
    featured: true,
    tags: ['单位', '转换', '度量']
  },
  {
    id: 'percentage-calc',
    name: '百分比计算',
    description: '百分比相关计算',
    category: 'math',
    icon: 'Percent',
    tags: ['百分比', '计算', '比例']
  },
  {
    id: 'triangle-solver',
    name: '三角形求解',
    description: '根据边角求三角形其他属性',
    category: 'math',
    icon: 'Triangle',
    tags: ['三角形', '几何', '计算']
  },
  {
    id: 'prime-checker',
    name: '质数检测',
    description: '检测数字是否为质数',
    category: 'math',
    icon: 'Hash',
    tags: ['质数', '数学', '检测']
  },
  {
    id: 'quadratic-solver',
    name: '二次方程',
    description: '解一元二次方程',
    category: 'math',
    icon: 'Calculator',
    tags: ['方程', '数学', '求解']
  },
  {
    id: 'matrix-math',
    name: '矩阵运算',
    description: '矩阵加减乘除运算',
    category: 'math',
    icon: 'Grid',
    tags: ['矩阵', '线性代数', '运算']
  },
  {
    id: 'currency-convert',
    name: '汇率换算',
    description: '货币汇率转换计算',
    category: 'math',
    icon: 'DollarSign',
    tags: ['汇率', '货币', '转换']
  },
  {
    id: 'roman-numeral',
    name: '罗马数字',
    description: '阿拉伯数字与罗马数字互转',
    category: 'math',
    icon: 'Type',
    tags: ['罗马数字', '转换', '历史']
  },
  {
    id: 'base-n',
    name: '进制转换',
    description: '2、8、10、16进制转换',
    category: 'math',
    icon: 'Binary',
    featured: true,
    tags: ['进制', '转换', '编程']
  },
  {
    id: 'random-number',
    name: '随机数生成',
    description: '生成指定范围的随机数',
    category: 'math',
    icon: 'Dices',
    tags: ['随机数', '生成', '范围']
  },

  // 日期时间 (41-50)
  {
    id: 'unix-timestamp',
    name: '时间戳转换',
    description: 'Unix时间戳与日期互转',
    category: 'datetime',
    icon: 'Clock',
    featured: true,
    tags: ['时间戳', '日期', '转换']
  },
  {
    id: 'cron-parser',
    name: 'Cron解析器',
    description: '解析Cron表达式的执行时间',
    category: 'datetime',
    icon: 'Calendar',
    tags: ['Cron', '定时任务', '解析']
  },
  {
    id: 'age-calculator',
    name: '年龄计算器',
    description: '精确计算年龄和天数',
    category: 'datetime',
    icon: 'User',
    tags: ['年龄', '计算', '生日']
  },
  {
    id: 'time-diff',
    name: '时间间隔',
    description: '计算两个日期之间的间隔',
    category: 'datetime',
    icon: 'Timer',
    tags: ['时间', '间隔', '计算']
  },
  {
    id: 'timezone-convert',
    name: '时区转换',
    description: '不同时区时间转换',
    category: 'datetime',
    icon: 'Globe',
    tags: ['时区', '转换', '世界时间']
  },
  {
    id: 'week-number',
    name: '周数计算',
    description: '计算ISO周数',
    category: 'datetime',
    icon: 'Calendar',
    tags: ['周数', 'ISO', '日历']
  },
  {
    id: 'countdown-timer',
    name: '倒计时器',
    description: '可视化倒计时工具',
    category: 'datetime',
    icon: 'Timer',
    tags: ['倒计时', '计时器', '提醒']
  },
  {
    id: 'date-add',
    name: '日期计算',
    description: '日期加减天数/月份/年份',
    category: 'datetime',
    icon: 'Plus',
    tags: ['日期', '计算', '加减']
  },
  {
    id: 'working-days',
    name: '工作日计算',
    description: '计算工作日天数',
    category: 'datetime',
    icon: 'Briefcase',
    tags: ['工作日', '假期', '计算']
  },
  {
    id: 'calendar-maker',
    name: '日历生成',
    description: '生成月历图片',
    category: 'datetime',
    icon: 'Calendar',
    tags: ['日历', '生成', '图片']
  },

  // Web开发 (51-60)
  {
    id: 'json-to-ts',
    name: 'JSON转TS',
    description: 'JSON转TypeScript接口定义',
    category: 'web',
    icon: 'FileCode',
    featured: true,
    tags: ['JSON', 'TypeScript', '接口']
  },
  {
    id: 'http-status',
    name: 'HTTP状态码',
    description: 'HTTP状态码查询工具',
    category: 'web',
    icon: 'Globe',
    tags: ['HTTP', '状态码', '查询']
  },
  {
    id: 'user-agent',
    name: 'User-Agent解析',
    description: '解析浏览器User-Agent信息',
    category: 'web',
    icon: 'Monitor',
    tags: ['User-Agent', '浏览器', '解析']
  },
  {
    id: 'mime-search',
    name: 'MIME类型查询',
    description: '查询文件MIME类型',
    category: 'web',
    icon: 'FileType',
    tags: ['MIME', '文件类型', '查询']
  },
  {
    id: 'dns-lookup',
    name: 'DNS查询',
    description: '域名DNS记录查询',
    category: 'web',
    icon: 'Search',
    tags: ['DNS', '域名', '查询']
  },
  {
    id: 'ip-info',
    name: 'IP信息查询',
    description: '查询IP地址信息',
    category: 'web',
    icon: 'MapPin',
    tags: ['IP', '地理位置', '查询']
  },
  {
    id: 'jwt-generator',
    name: 'JWT生成',
    description: '生成JWT Token',
    category: 'web',
    icon: 'Key',
    tags: ['JWT', 'Token', '生成']
  },
  {
    id: 'uuid-namespace',
    name: 'UUID v5生成',
    description: '基于命名空间生成UUID v5',
    category: 'web',
    icon: 'Tag',
    tags: ['UUID', '命名空间', '生成']
  },
  {
    id: 'regex-cheatsheet',
    name: '正则速查表',
    description: '常用正则表达式参考',
    category: 'web',
    icon: 'BookOpen',
    tags: ['正则', '速查', '参考']
  },
  {
    id: 'json-diff',
    name: 'JSON对比',
    description: '比较两个JSON的差异',
    category: 'web',
    icon: 'GitCompare',
    tags: ['JSON', '对比', '差异']
  },

  // 随机生成 (61-70)
  {
    id: 'lorem-image',
    name: '占位图片',
    description: '生成占位图片URL',
    category: 'random',
    icon: 'Image',
    tags: ['占位图', '生成', '测试']
  },
  {
    id: 'fake-user',
    name: '虚拟用户',
    description: '生成虚拟用户资料',
    category: 'random',
    icon: 'User',
    featured: true,
    tags: ['虚拟用户', '测试数据', '生成']
  },
  {
    id: 'random-color',
    name: '随机颜色',
    description: '生成随机颜色值',
    category: 'random',
    icon: 'Palette',
    tags: ['随机', '颜色', '生成']
  },
  {
    id: 'name-generator',
    name: '姓名生成器',
    description: '生成随机中英文姓名',
    category: 'random',
    icon: 'User',
    tags: ['姓名', '随机', '生成']
  },
  {
    id: 'quote-generator',
    name: '名言生成器',
    description: '随机显示名人名言',
    category: 'random',
    icon: 'Quote',
    tags: ['名言', '随机', '灵感']
  },
  {
    id: 'password-generator',
    name: '密码生成器',
    description: '生成安全密码',
    category: 'random',
    icon: 'Key',
    featured: true,
    tags: ['密码', '安全', '生成']
  },
  {
    id: 'uuid-batch',
    name: '批量UUID',
    description: '批量生成UUID',
    category: 'random',
    icon: 'List',
    tags: ['UUID', '批量', '生成']
  },
  {
    id: 'dice-roller',
    name: '骰子工具',
    description: 'RPG骰子投掷器',
    category: 'random',
    icon: 'Dices',
    tags: ['骰子', 'RPG', '游戏']
  },
  {
    id: 'lottery-picker',
    name: '抽奖器',
    description: '随机抽奖工具',
    category: 'random',
    icon: 'Gift',
    tags: ['抽奖', '随机', '选择']
  },
  {
    id: 'story-prompt',
    name: '写作灵感',
    description: '生成写作提示和灵感',
    category: 'random',
    icon: 'PenTool',
    tags: ['写作', '灵感', '创意']
  },

  // 文件处理 (71-80)
  {
    id: 'csv-to-json',
    name: 'CSV转JSON',
    description: 'CSV文件转JSON格式',
    category: 'file',
    icon: 'FileSpreadsheet',
    featured: true,
    tags: ['CSV', 'JSON', '转换']
  },
  {
    id: 'json-to-csv',
    name: 'JSON转CSV',
    description: 'JSON数据转CSV文件',
    category: 'file',
    icon: 'Table',
    tags: ['JSON', 'CSV', '转换']
  },
  {
    id: 'markdown-toc',
    name: 'Markdown目录',
    description: '生成Markdown文档目录',
    category: 'file',
    icon: 'List',
    tags: ['Markdown', '目录', 'TOC']
  },
  {
    id: 'text-to-pdf',
    name: '文本转PDF',
    description: '将文本转换为PDF文件',
    category: 'file',
    icon: 'FileText',
    tags: ['PDF', '文本', '转换']
  },
  {
    id: 'merge-pdf',
    name: 'PDF合并',
    description: '合并多个PDF文件',
    category: 'file',
    icon: 'FilePlus',
    tags: ['PDF', '合并', '文档']
  },
  {
    id: 'split-pdf',
    name: 'PDF分割',
    description: '将PDF拆分为多个文件',
    category: 'file',
    icon: 'FileMinus',
    tags: ['PDF', '分割', '文档']
  },
  {
    id: 'excel-to-json',
    name: 'Excel转JSON',
    description: 'Excel文件转JSON数据',
    category: 'file',
    icon: 'FileSpreadsheet',
    tags: ['Excel', 'JSON', '转换']
  },
  {
    id: 'zip-extract',
    name: 'ZIP解压',
    description: '在线解压ZIP文件',
    category: 'file',
    icon: 'Archive',
    tags: ['ZIP', '解压', '压缩包']
  },
  {
    id: 'image-to-pdf',
    name: '图片转PDF',
    description: '将图片转换为PDF文档',
    category: 'file',
    icon: 'Image',
    tags: ['图片', 'PDF', '转换']
  },
  {
    id: 'file-hash',
    name: '文件校验',
    description: '计算文件哈希校验值',
    category: 'file',
    icon: 'Shield',
    tags: ['文件', '哈希', '校验']
  },

  // 图片处理 (81-90)
  {
    id: 'image-compress',
    name: '图片压缩',
    description: '在线压缩JPG/PNG/WebP图片',
    category: 'image',
    icon: 'Download',
    featured: true,
    tags: ['图片', '压缩', '优化']
  },
  {
    id: 'image-resize',
    name: '图片缩放',
    description: '等比例缩放图片尺寸',
    category: 'image',
    icon: 'Maximize',
    tags: ['图片', '缩放', '尺寸']
  },
  {
    id: 'image-convert',
    name: '格式转换',
    description: 'PNG↔WebP↔JPG格式转换',
    category: 'image',
    icon: 'RefreshCw',
    tags: ['图片', '转换', '格式']
  },
  {
    id: 'image-crop',
    name: '图片裁剪',
    description: '在线裁剪图片',
    category: 'image',
    icon: 'Crop',
    tags: ['图片', '裁剪', '编辑']
  },
  {
    id: 'exif-viewer',
    name: 'EXIF查看器',
    description: '查看和删除图片元数据',
    category: 'image',
    icon: 'Info',
    tags: ['EXIF', '元数据', '隐私']
  },
  {
    id: 'svg-minify',
    name: 'SVG压缩',
    description: '压缩SVG文件大小',
    category: 'image',
    icon: 'Minimize',
    tags: ['SVG', '压缩', '优化']
  },
  {
    id: 'gif-split',
    name: 'GIF帧分离',
    description: '将GIF动图分离为单独帧',
    category: 'image',
    icon: 'Film',
    tags: ['GIF', '动图', '分离']
  },
  {
    id: 'video-trim',
    name: '视频剪辑',
    description: '在浏览器中剪辑视频片段',
    category: 'image',
    icon: 'Video',
    tags: ['视频', '剪辑', '编辑']
  },
  {
    id: 'audio-convert',
    name: '音频转换',
    description: '音频格式转换',
    category: 'image',
    icon: 'Music',
    tags: ['音频', '转换', '格式']
  },
  {
    id: 'icon-spriter',
    name: 'SVG雪碧图',
    description: '生成SVG雪碧图',
    category: 'image',
    icon: 'Grid',
    tags: ['SVG', '雪碧图', '优化']
  },

  // 数据可视化 (91-100)
  {
    id: 'csv-preview',
    name: 'CSV预览器',
    description: '在线预览CSV文件内容',
    category: 'data',
    icon: 'Table',
    tags: ['CSV', '预览', '表格']
  },
  {
    id: 'json-plot',
    name: 'JSON图表',
    description: '将JSON数据生成图表',
    category: 'data',
    icon: 'BarChart',
    featured: true,
    tags: ['JSON', '图表', '可视化']
  },
  {
    id: 'markdown-mermaid',
    name: 'Mermaid预览',
    description: 'Mermaid图表预览器',
    category: 'data',
    icon: 'Workflow',
    tags: ['Mermaid', '流程图', '预览']
  },
  {
    id: 'geojson-viewer',
    name: 'GeoJSON查看',
    description: 'GeoJSON地理数据查看器',
    category: 'data',
    icon: 'Map',
    tags: ['GeoJSON', '地图', '地理']
  },
  {
    id: 'base64-image',
    name: 'Base64图片',
    description: 'Base64图片预览器',
    category: 'data',
    icon: 'Eye',
    tags: ['Base64', '图片', '预览']
  },
  {
    id: 'html-preview',
    name: 'HTML预览',
    description: '实时HTML代码预览',
    category: 'data',
    icon: 'Monitor',
    tags: ['HTML', '预览', '实时']
  },
  {
    id: 'table-sorter',
    name: '表格排序',
    description: '表格数据排序和筛选',
    category: 'data',
    icon: 'ArrowUpDown',
    tags: ['表格', '排序', '筛选']
  },
  {
    id: 'url-parser',
    name: 'URL解析器',
    description: '解析URL各个组成部分',
    category: 'data',
    icon: 'Link',
    tags: ['URL', '解析', '组件']
  },
  {
    id: 'email-validator',
    name: '邮箱验证',
    description: '验证邮箱地址格式',
    category: 'data',
    icon: 'Mail',
    tags: ['邮箱', '验证', '格式']
  },
  {
    id: 'credit-card-check',
    name: '银行卡验证',
    description: '银行卡号Luhn算法验证',
    category: 'data',
    icon: 'CreditCard',
    tags: ['银行卡', 'Luhn', '验证']
  }
]

/**
 * 根据ID获取工具信息
 */
export function getToolById(id: string): ToolInfo | undefined {
  return tools.find(tool => tool.id === id)
}

/**
 * 根据分类获取工具列表
 */
export function getToolsByCategory(category: ToolCategory): ToolInfo[] {
  return tools.filter(tool => tool.category === category)
}

/**
 * 获取热门工具
 */
export function getFeaturedTools(): ToolInfo[] {
  return tools.filter(tool => tool.featured)
}

/**
 * 搜索工具
 */
export function searchTools(query: string): ToolInfo[] {
  const lowercaseQuery = query.toLowerCase()
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
} 