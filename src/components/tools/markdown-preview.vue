<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Markdown预览器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        实时编辑和预览Markdown文档，支持完整的Markdown语法
      </p>
    </div>

    <!-- 工具栏 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div class="flex flex-wrap gap-2">
        <button
          @click="insertMarkdown('**粗体文本**')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="粗体"
        >
          <Bold class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('*斜体文本*')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="斜体"
        >
          <Italic class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('`代码`')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="行内代码"
        >
          <Code class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('[链接文本](URL)')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="链接"
        >
          <Link class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('![图片描述](图片URL)')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="图片"
        >
          <Image class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('# 标题')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="标题"
        >
          <Heading class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('- 列表项')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="无序列表"
        >
          <List class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('1. 有序列表项')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="有序列表"
        >
          <ListOrdered class="w-4 h-4" />
        </button>
        <button
          @click="insertMarkdown('> 引用文本')"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="引用"
        >
          <Quote class="w-4 h-4" />
        </button>
        <div class="border-l border-gray-300 dark:border-gray-600 mx-2"></div>
        <button
          @click="clearContent"
          class="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
          title="清空内容"
        >
          <Trash class="w-4 h-4" />
        </button>
        <button
          @click="copyHtml"
          class="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
          title="复制HTML"
        >
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 编辑器和预览 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 编辑器 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Edit class="w-5 h-5 mr-2" />
            Markdown编辑器
          </h3>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ markdownText.length }} 字符
          </div>
        </div>
        <div class="p-4">
          <textarea
            ref="textareaRef"
            v-model="markdownText"
            placeholder="在这里输入Markdown文档..."
            class="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm resize-none"
          ></textarea>
        </div>
      </div>

      <!-- 预览 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Eye class="w-5 h-5 mr-2" />
            预览结果
          </h3>
          <button
            @click="toggleFullscreen"
            class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            title="全屏预览"
          >
            <Maximize class="w-4 h-4" />
          </button>
        </div>
        <div class="p-4 h-96 overflow-y-auto">
          <div
            v-if="htmlContent"
            v-html="htmlContent"
            class="prose prose-sm dark:prose-invert max-w-none"
          ></div>
          <div
            v-else
            class="text-gray-500 dark:text-gray-400 italic text-center py-8"
          >
            在左侧编辑器中输入Markdown，这里将显示预览结果
          </div>
        </div>
      </div>
    </div>

    <!-- 示例 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <BookOpen class="w-5 h-5 mr-2" />
        Markdown语法示例
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="example in examples"
          :key="example.name"
          @click="loadExample(example.content)"
          class="text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="font-medium text-gray-900 dark:text-white">{{ example.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ example.description }}</div>
        </button>
      </div>
    </div>

    <!-- 全屏预览模态框 -->
    <div
      v-if="isFullscreen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="toggleFullscreen"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-full overflow-hidden"
        @click.stop
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Markdown预览</h3>
          <button
            @click="toggleFullscreen"
            class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 max-h-96 overflow-y-auto">
          <div
            v-if="htmlContent"
            v-html="htmlContent"
            class="prose dark:prose-invert max-w-none"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { marked } from 'marked'
import { 
  Bold, Italic, Code, Link, Image, Heading, List, ListOrdered, 
  Quote, Trash, Copy, Edit, Eye, Maximize, BookOpen, X 
} from 'lucide-vue-next'

const markdownText = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const isFullscreen = ref(false)
const htmlContent = ref('')

// 转换为HTML
const convertMarkdown = async (text: string) => {
  if (!text.trim()) {
    htmlContent.value = ''
    return
  }
  
  try {
    const result = await marked(text, {
      gfm: true,
      breaks: true,
    })
    htmlContent.value = typeof result === 'string' ? result : await result
  } catch (error) {
    htmlContent.value = '<p class="text-red-500">Markdown解析错误</p>'
  }
}

// 监听文本变化并转换
watch(markdownText, (newText) => {
  convertMarkdown(newText)
}, { immediate: true })

// 插入Markdown语法
const insertMarkdown = (syntax: string) => {
  if (!textareaRef.value) return
  
  const start = textareaRef.value.selectionStart
  const end = textareaRef.value.selectionEnd
  const text = markdownText.value
  
  markdownText.value = text.substring(0, start) + syntax + text.substring(end)
  
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
      textareaRef.value.setSelectionRange(start + syntax.length, start + syntax.length)
    }
  })
}

// 清空内容
const clearContent = () => {
  if (confirm('确定要清空所有内容吗？')) {
    markdownText.value = ''
  }
}

// 复制HTML
const copyHtml = async () => {
  if (!htmlContent.value) return
  
  try {
    await navigator.clipboard.writeText(htmlContent.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy HTML:', err)
  }
}

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// 加载示例
const loadExample = (content: string) => {
  markdownText.value = content
}

// 示例内容
const examples = [
  {
    name: '基础语法',
    description: '标题、段落、强调等基本语法',
    content: `# 一级标题

## 二级标题

### 三级标题

这是一个普通段落。

**这是粗体文本**

*这是斜体文本*

~~这是删除线文本~~

\`这是行内代码\`

[这是一个链接](https://example.com)

> 这是一个引用
> 可以跨多行`
  },
  {
    name: '列表和表格',
    description: '有序列表、无序列表、表格',
    content: `## 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

## 有序列表

1. 第一步
2. 第二步
3. 第三步

## 表格

| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |
| 王五 | 28   | 广州 |`
  },
  {
    name: '代码块',
    description: '代码高亮显示',
    content: `## JavaScript代码

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Python代码

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## 行内代码

使用 \`console.log()\` 来输出调试信息。`
  },
  {
    name: '任务列表',
    description: '待办事项清单',
    content: `## 今日任务

- [x] 完成项目文档
- [x] 代码review
- [ ] 单元测试
- [ ] 部署到测试环境
- [ ] 性能优化

## 本周计划

- [x] 需求分析
- [x] 技术选型
- [ ] 原型设计
- [ ] 开发实现
- [ ] 测试验证`
  }
]
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: inherit;
}

.prose a {
  color: #3b82f6;
}

.prose blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  font-style: italic;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.dark .prose code {
  background-color: #374151;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.dark .prose pre {
  background-color: #1f2937;
}

.prose table {
  border-collapse: collapse;
  width: 100%;
}

.prose th,
.prose td {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  text-align: left;
}

.dark .prose th,
.dark .prose td {
  border-color: #4b5563;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}

.dark .prose th {
  background-color: #374151;
}
</style> 