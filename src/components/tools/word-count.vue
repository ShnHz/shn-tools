<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">输入文本</h2>
      <textarea
        v-model="text"
        placeholder="在此输入或粘贴文本进行统计..."
        class="textarea min-h-[200px] resize-y"
      />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.characters }}</div>
        <div class="text-sm text-muted-foreground">字符数</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.charactersNoSpaces }}</div>
        <div class="text-sm text-muted-foreground">字符数(不含空格)</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.words }}</div>
        <div class="text-sm text-muted-foreground">单词数</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.lines }}</div>
        <div class="text-sm text-muted-foreground">行数</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.paragraphs }}</div>
        <div class="text-sm text-muted-foreground">段落数</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.sentences }}</div>
        <div class="text-sm text-muted-foreground">句子数</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.readingTime }}</div>
        <div class="text-sm text-muted-foreground">阅读时间(分钟)</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.speakingTime }}</div>
        <div class="text-sm text-muted-foreground">朗读时间(分钟)</div>
      </div>
    </div>

    <div v-if="text.trim()" class="space-y-4">
      <h3 class="text-lg font-semibold">详细信息</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="card p-4">
          <h4 class="font-medium mb-2">字符分布</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>中文字符：</span>
              <span class="font-mono">{{ stats.chineseChars }}</span>
            </div>
            <div class="flex justify-between">
              <span>英文字符：</span>
              <span class="font-mono">{{ stats.englishChars }}</span>
            </div>
            <div class="flex justify-between">
              <span>数字字符：</span>
              <span class="font-mono">{{ stats.numberChars }}</span>
            </div>
            <div class="flex justify-between">
              <span>标点符号：</span>
              <span class="font-mono">{{ stats.punctuationChars }}</span>
            </div>
            <div class="flex justify-between">
              <span>空格字符：</span>
              <span class="font-mono">{{ stats.spaceChars }}</span>
            </div>
          </div>
        </div>
        
        <div class="card p-4">
          <h4 class="font-medium mb-2">其他统计</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>平均单词长度：</span>
              <span class="font-mono">{{ stats.avgWordLength }} 字符</span>
            </div>
            <div class="flex justify-between">
              <span>平均句子长度：</span>
              <span class="font-mono">{{ stats.avgSentenceLength }} 单词</span>
            </div>
            <div class="flex justify-between">
              <span>平均段落长度：</span>
              <span class="font-mono">{{ stats.avgParagraphLength }} 句子</span>
            </div>
            <div class="flex justify-between">
              <span>最长单词：</span>
              <span class="font-mono">{{ stats.longestWord }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <button
        @click="clearText"
        class="btn btn-secondary"
        :disabled="!text.trim()"
      >
        清空文本
      </button>
      <button
        @click="copyStats"
        class="btn btn-primary"
        :disabled="!text.trim()"
      >
        复制统计信息
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const text = ref('')

/**
 * 文本统计信息
 */
const stats = computed(() => {
  const content = text.value

  if (!content) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      lines: 0,
      paragraphs: 0,
      sentences: 0,
      readingTime: 0,
      speakingTime: 0,
      chineseChars: 0,
      englishChars: 0,
      numberChars: 0,
      punctuationChars: 0,
      spaceChars: 0,
      avgWordLength: 0,
      avgSentenceLength: 0,
      avgParagraphLength: 0,
      longestWord: ''
    }
  }

  // 基础统计
  const characters = content.length
  const charactersNoSpaces = content.replace(/\s/g, '').length
  const lines = content.split('\n').length
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim()).length
  
  // 单词统计（支持中英文）
  const words = content.match(/[\u4e00-\u9fa5]|[a-zA-Z]+/g) || []
  const wordCount = words.length
  
  // 句子统计
  const sentences = content.split(/[.!?。！？；;]+/).filter(s => s.trim()).length
  
  // 字符类型统计
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const englishChars = (content.match(/[a-zA-Z]/g) || []).length
  const numberChars = (content.match(/[0-9]/g) || []).length
  const punctuationChars = (content.match(/[^\w\s\u4e00-\u9fa5]/g) || []).length
  const spaceChars = (content.match(/\s/g) || []).length
  
  // 平均长度计算
  const avgWordLength = wordCount > 0 ? Math.round(content.replace(/\s/g, '').length / wordCount * 10) / 10 : 0
  const avgSentenceLength = sentences > 0 ? Math.round(wordCount / sentences * 10) / 10 : 0
  const avgParagraphLength = paragraphs > 0 ? Math.round(sentences / paragraphs * 10) / 10 : 0
  
  // 最长单词
  const longestWord = words.reduce((longest, word) => 
    word.length > longest.length ? word : longest, '')
  
  // 阅读时间（每分钟200字）
  const readingTime = Math.ceil(wordCount / 200)
  
  // 朗读时间（每分钟150字）
  const speakingTime = Math.ceil(wordCount / 150)

  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    lines,
    paragraphs,
    sentences,
    readingTime,
    speakingTime,
    chineseChars,
    englishChars,
    numberChars,
    punctuationChars,
    spaceChars,
    avgWordLength,
    avgSentenceLength,
    avgParagraphLength,
    longestWord
  }
})

/**
 * 清空文本
 */
const clearText = () => {
  text.value = ''
}

/**
 * 复制统计信息
 */
const copyStats = async () => {
  const statsText = `文本统计信息：
字符数：${stats.value.characters}
字符数(不含空格)：${stats.value.charactersNoSpaces}
单词数：${stats.value.words}
行数：${stats.value.lines}
段落数：${stats.value.paragraphs}
句子数：${stats.value.sentences}
阅读时间：${stats.value.readingTime}分钟
朗读时间：${stats.value.speakingTime}分钟`

  try {
    await navigator.clipboard.writeText(statsText)
    // 这里可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script> 