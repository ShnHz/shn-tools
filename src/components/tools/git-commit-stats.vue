<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Git提交统计器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        扫描指定目录下的Git项目，提取并可视化展示您的提交记录
      </p>
    </div>

    <!-- 步骤指导 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Terminal class="w-5 h-5 mr-2" />
        步骤1: 下载并执行扫描脚本
      </h2>
      
      <div class="space-y-4">
        <!-- 脚本下载区域 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-900 dark:text-white">Windows 脚本</h3>
              <button
                @click="downloadWindowsScript"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Download class="w-4 h-4 mr-1 inline" />
                下载 .bat
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              适用于 Windows 系统，双击运行或在命令行中执行
            </p>
          </div>
          
          <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-900 dark:text-white">Mac/Linux 脚本</h3>
              <button
                @click="downloadUnixScript"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                <Download class="w-4 h-4 mr-1 inline" />
                下载 .sh
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              适用于 macOS 和 Linux 系统，需要在终端中执行
            </p>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <h3 class="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center">
            <Info class="w-4 h-4 mr-2" />
            使用说明
          </h3>
          <div class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <div class="font-medium">Windows用户：</div>
            <ol class="list-decimal list-inside space-y-1 ml-4">
              <li>下载 scan-git-commits.bat 文件</li>
              <li>将文件放到您想要扫描的项目根目录</li>
              <li>双击运行或在命令行中执行：<code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">scan-git-commits.bat</code></li>
              <li>脚本会显示进度条并自动保存结果到文件</li>
              <li>扫描完成后，可以复制控制台输出或打开生成的文件</li>
            </ol>
            
            <div class="font-medium mt-3">Mac/Linux用户：</div>
            <ol class="list-decimal list-inside space-y-1 ml-4">
              <li>下载 scan-git-commits.sh 文件</li>
              <li>将文件放到您想要扫描的项目根目录</li>
              <li>在终端中执行：<code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">chmod +x scan-git-commits.sh && ./scan-git-commits.sh</code></li>
              <li>脚本会显示彩色进度条并自动保存结果到文件</li>
              <li>扫描完成后，可以复制控制台输出或打开生成的文件</li>
            </ol>
            
            <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
              <div class="text-sm text-green-800 dark:text-green-200">
                <strong>✨ 新功能：</strong>
                <ul class="list-disc list-inside mt-1 space-y-1">
                  <li>自动保存扫描结果到 <code>git-commits-YYYY-MM-DD.txt</code> 文件</li>
                  <li>同时生成 Markdown 格式报告 <code>git-commits-YYYY-MM-DD.md</code></li>
                  <li>显示实时进度条，再也不用担心输出过长问题</li>
                  <li>支持大型项目扫描，自动处理超长输出</li>
                  <li><strong>代码行数统计：</strong>自动统计每个提交的新增/删除行数</li>
                  <li><strong>项目级别汇总：</strong>按项目汇总代码变更量和净增长</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 参数配置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               扫描目录路径
             </label>
             <input
               v-model="scanPath"
               type="text"
               placeholder="/path/to/your/projects"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               作者邮箱/姓名
             </label>
             <input
               v-model="authorFilter"
               type="text"
               placeholder="your@email.com 或您的姓名"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               开始日期
             </label>
             <input
               v-model="startDate"
               type="date"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               结束日期
             </label>
             <input
               v-model="endDate"
               type="date"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               快速选择
             </label>
             <select
               @change="(e) => setDateRange((e.target as HTMLSelectElement).value)"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             >
               <option value="">选择时间范围</option>
               <option value="last-week">上周 ({{ getLastWeekLabel() }})</option>
               <option value="this-week">本周</option>
               <option value="last-month">上个月</option>
               <option value="this-month">本月</option>
               <option value="last-3-months">最近3个月</option>
               <option value="last-6-months">最近6个月</option>
               <option value="this-year">今年</option>
               <option value="last-year">去年</option>
               <option value="all">全部时间</option>
             </select>
           </div>
         </div>

         <!-- 命令预览和折叠区域 -->
         <div class="border border-gray-200 dark:border-gray-600 rounded-lg">
           <div 
             class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
             @click="toggleCommandView"
           >
             <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
               命令预览 (点击{{ showCommand ? '收起' : '展开' }})
             </span>
             <ChevronDown :class="['w-4 h-4 transition-transform', showCommand ? 'rotate-180' : '']" />
           </div>
           
           <div v-if="showCommand" class="border-t border-gray-200 dark:border-gray-600 p-3">
             <p class="text-gray-600 dark:text-gray-400 mb-2 text-sm">
               当前配置对应的命令：
             </p>
             <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
               <pre class="whitespace-pre-wrap">{{ scanCommand }}</pre>
               <button
                 @click="copyCommand"
                 class="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded"
                 title="复制命令"
               >
                 <Copy class="w-4 h-4" />
               </button>
             </div>
           </div>
         </div>

         <div class="flex gap-2 flex-wrap">
           <button
             @click="clearSavedSettings"
             class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
             title="清除保存的路径和作者信息"
           >
             <Trash class="w-4 h-4 mr-2 inline" />
             清除配置
           </button>
         </div>
      </div>
    </div>

    <!-- 数据输入区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Upload class="w-5 h-5 mr-2" />
        步骤2: 粘贴脚本输出
      </h2>
      
      <div class="space-y-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          您可以选择以下任一方式输入数据：
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li>复制控制台输出粘贴到下方文本框</li>
            <li>打开生成的 <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">git-commits-YYYY-MM-DD.txt</code> 文件，复制内容粘贴到下方</li>
          </ul>
        </div>
        
        <textarea
          v-model="gitLogData"
          placeholder="请将脚本的输出结果或生成文件的内容粘贴到这里..."
          class="w-full h-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
        ></textarea>
        
        <div class="flex gap-2">
          <button
            @click="parseGitData"
            :disabled="!gitLogData.trim()"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <BarChart class="w-4 h-4 mr-2 inline" />
            解析并统计
          </button>
          <button
            @click="clearData"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Trash class="w-4 h-4 mr-2 inline" />
            清空数据
          </button>
        </div>
      </div>
    </div>

    <!-- 统计结果展示 -->
    <div v-if="parsedData.length > 0" class="space-y-6">
      <!-- 总体统计 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <PieChart class="w-5 h-5 mr-2" />
          总体统计
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.totalCommits }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">总提交数</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.totalProjects }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">涉及项目</div>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.activeDays }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">活跃天数</div>
          </div>
          <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.avgCommitsPerDay.toFixed(1) }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">日均提交</div>
          </div>
        </div>
        
        <!-- 代码行数统计 -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">代码行数统计</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+{{ stats.totalAdditions.toLocaleString() }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">新增行数</div>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">-{{ stats.totalDeletions.toLocaleString() }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">删除行数</div>
            </div>
            <div class="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {{ stats.netChanges >= 0 ? '+' : '' }}{{ stats.netChanges.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">净变化</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 按项目统计 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FolderOpen class="w-5 h-5 mr-2" />
          按项目统计
        </h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">项目名称</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">提交数</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">新增行数</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">删除行数</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">净变化</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">首次提交</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">最近提交</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">占比</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projectStats" :key="project.name" class="border-b border-gray-100 dark:border-gray-700">
                <td class="py-2 px-3 font-mono text-sm">{{ project.name }}</td>
                <td class="py-2 px-3">{{ project.commits }}</td>
                <td class="py-2 px-3 text-emerald-600 dark:text-emerald-400">+{{ project.totalAdditions.toLocaleString() }}</td>
                <td class="py-2 px-3 text-red-600 dark:text-red-400">-{{ project.totalDeletions.toLocaleString() }}</td>
                <td class="py-2 px-3 font-medium" :class="project.netChanges >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                  {{ project.netChanges >= 0 ? '+' : '' }}{{ project.netChanges.toLocaleString() }}
                </td>
                <td class="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(project.firstCommit) }}</td>
                <td class="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(project.lastCommit) }}</td>
                <td class="py-2 px-3">
                  <div class="flex items-center">
                    <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        class="bg-blue-500 h-2 rounded-full" 
                        :style="{ width: `${project.percentage}%` }"
                      ></div>
                    </div>
                    <span class="text-sm">{{ project.percentage }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 时间线分析 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calendar class="w-5 h-5 mr-2" />
          提交时间线
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 按月统计 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">按月统计</h3>
            <div class="space-y-2">
              <div v-for="month in monthlyStats" :key="month.month" class="flex items-center">
                <div class="w-20 text-sm text-gray-600 dark:text-gray-400">{{ month.month }}</div>
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                  <div 
                    class="bg-green-500 h-3 rounded-full transition-all duration-300" 
                    :style="{ width: `${(month.commits / stats.maxMonthlyCommits) * 100}%` }"
                  ></div>
                </div>
                <div class="w-8 text-sm text-gray-900 dark:text-white">{{ month.commits }}</div>
              </div>
            </div>
          </div>

          <!-- 按星期统计 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">按星期统计</h3>
            <div class="space-y-2">
              <div v-for="day in weeklyStats" :key="day.day" class="flex items-center">
                <div class="w-16 text-sm text-gray-600 dark:text-gray-400">{{ day.day }}</div>
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                  <div 
                    class="bg-purple-500 h-3 rounded-full transition-all duration-300" 
                    :style="{ width: `${(day.commits / stats.maxWeeklyCommits) * 100}%` }"
                  ></div>
                </div>
                <div class="w-8 text-sm text-gray-900 dark:text-white">{{ day.commits }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

             <!-- 详细记录 -->
       <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
         <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
           <List class="w-5 h-5 mr-2" />
           提交记录详情
         </h2>
         
         <div class="space-y-4">
           <div class="flex items-center gap-4">
             <label class="flex items-center">
               <input
                 v-model="enableDeduplication"
                 type="checkbox"
                 class="mr-2"
               />
               <span class="text-sm text-gray-700 dark:text-gray-300">启用去重</span>
             </label>
             <label class="flex items-center">
               <input
                 v-model="enableFiltering"
                 type="checkbox"
                 class="mr-2"
               />
               <span class="text-sm text-gray-700 dark:text-gray-300">过滤无效提交</span>
             </label>
             <button
               @click="copyCommitDetails"
               class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
             >
               <Copy class="w-4 h-4 mr-1 inline" />
               复制
             </button>
           </div>
           
           <textarea
             v-model="commitDetailsText"
             readonly
             placeholder="处理后的提交记录将显示在这里..."
             class="w-full h-80 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm resize-none"
           ></textarea>
           
           <div class="text-sm text-gray-500 dark:text-gray-400">
             共 {{ filteredCommits.length }} 条记录
             <span v-if="enableDeduplication && deduplicatedCount > 0">
               (去重 {{ deduplicatedCount }} 条)
             </span>
             <span v-if="enableFiltering && filteredCount > 0">
               (过滤 {{ filteredCount }} 条)
             </span>
           </div>
         </div>
       </div>

      <!-- 导出功能 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Download class="w-5 h-5 mr-2" />
          导出数据
        </h2>
        
        <div class="flex gap-2">
          <button
            @click="exportJSON"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileJson class="w-4 h-4 mr-2 inline" />
            导出JSON
          </button>
          <button
            @click="exportCSV"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileSpreadsheet class="w-4 h-4 mr-2 inline" />
            导出CSV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  Terminal, Copy, RefreshCw, Upload, BarChart, Trash, PieChart, 
  FolderOpen, Calendar, List, Download, FileJson, FileSpreadsheet, Info, ChevronDown 
} from 'lucide-vue-next'

interface CommitData {
  hash: string
  date: Date
  message: string
  author: string
  project: string
  additions: number
  deletions: number
  files: Array<{name: string, additions: number, deletions: number}>
}

interface ProjectStat {
  name: string
  commits: number
  firstCommit: Date
  lastCommit: Date
  percentage: number
  totalAdditions: number
  totalDeletions: number
  netChanges: number
}

interface MonthStat {
  month: string
  commits: number
}

interface WeekStat {
  day: string
  commits: number
}

// localStorage键名常量
const STORAGE_KEYS = {
  SCAN_PATH: 'git-commit-stats-scan-path',
  AUTHOR_FILTER: 'git-commit-stats-author-filter'
}

// 从localStorage读取保存的值
const getSavedScanPath = () => {
  return localStorage.getItem(STORAGE_KEYS.SCAN_PATH) || '/path/to/your/projects'
}

const getSavedAuthorFilter = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTHOR_FILTER) || ''
}

// 响应式数据
const scanPath = ref(getSavedScanPath())
const authorFilter = ref(getSavedAuthorFilter())
const gitLogData = ref('')
const parsedData = ref<CommitData[]>([])
const startDate = ref('')
const endDate = ref('')
const enableDeduplication = ref(true)
const enableFiltering = ref(true)
const showCommand = ref(false)

// 生成扫描命令
const scanCommand = computed(() => {
  const path = scanPath.value || '/path/to/your/projects'
  const author = authorFilter.value ? ` --author="${authorFilter.value}"` : ''
  
  let dateRange = ''
  if (startDate.value) {
    dateRange += ` --since="${startDate.value}"`
  }
  if (endDate.value) {
    // 结束日期需要包含整天，所以加上时间
    const endDateTime = new Date(endDate.value)
    endDateTime.setHours(23, 59, 59, 999)
    dateRange += ` --until="${endDateTime.toISOString()}"`
  }
  
  return `find "${path}" -name ".git" -type d | while read gitdir; do
  repo=\$(dirname "\$gitdir")
  echo "=== \$(basename "\$repo") ==="
  cd "\$repo"
  git log --pretty=format:"%H|%ad|%s|%an|%ae" --numstat --date=iso${author}${dateRange} 2>/dev/null || echo "Error reading git log"
  echo ""
done`
})

// 生成命令
const generateCommand = () => {
  // 命令已通过computed自动更新
}

// 复制命令
const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(scanCommand.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy command:', err)
  }
}

// 解析Git数据
const parseGitData = () => {
  const lines = gitLogData.value.trim().split('\n')
  const commits: CommitData[] = []
  let currentProject = ''
  let currentCommit: Partial<CommitData> | null = null

  for (const line of lines) {
    if (line.startsWith('=== ') && line.endsWith(' ===')) {
      currentProject = line.slice(4, -4)
    } else if (line.includes('|') && currentProject) {
      // 如果当前已有提交数据，先保存
      if (currentCommit && currentCommit.hash) {
        commits.push({
          ...currentCommit,
          project: currentProject,
          additions: currentCommit.additions || 0,
          deletions: currentCommit.deletions || 0,
          files: currentCommit.files || []
        } as CommitData)
      }
      
      // 解析新的提交信息
      const parts = line.split('|')
      if (parts.length >= 5) {
        currentCommit = {
          hash: parts[0],
          date: new Date(parts[1]),
          message: parts[2],
          author: parts[3],
          additions: 0,
          deletions: 0,
          files: []
        }
      }
    } else if (currentCommit && line.trim() && !line.startsWith('Error')) {
      // 解析文件统计信息 (格式: additions deletions filename)
      const statParts = line.trim().split('\t')
      if (statParts.length >= 3) {
        const additions = parseInt(statParts[0]) || 0
        const deletions = parseInt(statParts[1]) || 0
        const filename = statParts[2]
        
        currentCommit.additions = (currentCommit.additions || 0) + additions
        currentCommit.deletions = (currentCommit.deletions || 0) + deletions
        currentCommit.files = currentCommit.files || []
        currentCommit.files.push({ name: filename, additions, deletions })
      }
    }
  }

  // 保存最后一个提交
  if (currentCommit && currentCommit.hash && currentProject) {
    commits.push({
      ...currentCommit,
      project: currentProject,
      additions: currentCommit.additions || 0,
      deletions: currentCommit.deletions || 0,
      files: currentCommit.files || []
    } as CommitData)
  }

  parsedData.value = commits.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// 清空数据
const clearData = () => {
  gitLogData.value = ''
  parsedData.value = []
}

// 统计数据
const stats = computed(() => {
  const commits = parsedData.value
  const projects = new Set(commits.map(c => c.project))
  const days = new Set(commits.map(c => c.date.toDateString()))
  
  const monthlyCommits = monthlyStats.value.map(m => m.commits)
  const weeklyCommits = weeklyStats.value.map(w => w.commits)
  
  const totalAdditions = commits.reduce((sum, commit) => sum + commit.additions, 0)
  const totalDeletions = commits.reduce((sum, commit) => sum + commit.deletions, 0)

  return {
    totalCommits: commits.length,
    totalProjects: projects.size,
    activeDays: days.size,
    avgCommitsPerDay: days.size > 0 ? commits.length / days.size : 0,
    maxMonthlyCommits: Math.max(...monthlyCommits, 1),
    maxWeeklyCommits: Math.max(...weeklyCommits, 1),
    totalAdditions,
    totalDeletions,
    netChanges: totalAdditions - totalDeletions
  }
})

// 按项目统计
const projectStats = computed(() => {
  const projects = new Map<string, CommitData[]>()
  
  parsedData.value.forEach(commit => {
    if (!projects.has(commit.project)) {
      projects.set(commit.project, [])
    }
    projects.get(commit.project)!.push(commit)
  })

  const result: ProjectStat[] = []
  projects.forEach((commits, name) => {
    const dates = commits.map(c => c.date).sort((a, b) => a.getTime() - b.getTime())
    const totalAdditions = commits.reduce((sum, commit) => sum + commit.additions, 0)
    const totalDeletions = commits.reduce((sum, commit) => sum + commit.deletions, 0)
    
    result.push({
      name,
      commits: commits.length,
      firstCommit: dates[0],
      lastCommit: dates[dates.length - 1],
      percentage: Math.round((commits.length / parsedData.value.length) * 100),
      totalAdditions,
      totalDeletions,
      netChanges: totalAdditions - totalDeletions
    })
  })

  return result.sort((a, b) => b.commits - a.commits)
})

// 按月统计
const monthlyStats = computed(() => {
  const months = new Map<string, number>()
  
  parsedData.value.forEach(commit => {
    const month = commit.date.toISOString().slice(0, 7) // YYYY-MM
    months.set(month, (months.get(month) || 0) + 1)
  })

  const result: MonthStat[] = []
  months.forEach((commits, month) => {
    result.push({ month, commits })
  })

  return result.sort((a, b) => a.month.localeCompare(b.month))
})

// 按星期统计
const weeklyStats = computed(() => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const days = new Map<number, number>()
  
  parsedData.value.forEach(commit => {
    const day = commit.date.getDay()
    days.set(day, (days.get(day) || 0) + 1)
  })

  const result: WeekStat[] = []
  for (let i = 0; i < 7; i++) {
    result.push({
      day: weekdays[i],
      commits: days.get(i) || 0
    })
  }

  return result
})

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 导出JSON
const exportJSON = () => {
  const data = {
    stats: stats.value,
    projects: projectStats.value,
    commits: parsedData.value
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `git-commit-stats-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// 导出CSV
const exportCSV = () => {
  const headers = ['项目', '提交哈希', '日期', '提交信息', '作者', '新增行数', '删除行数', '净变化']
  const rows = parsedData.value.map(commit => [
    commit.project,
    commit.hash,
    commit.date.toISOString(),
    `"${commit.message.replace(/"/g, '""')}"`,
    commit.author,
    commit.additions,
    commit.deletions,
    commit.additions - commit.deletions
  ])
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `git-commit-stats-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// 计算上周一至周日的日期
const getLastWeekDates = () => {
  const today = new Date()
  const currentDay = today.getDay() // 0=周日, 1=周一, ..., 6=周六
  
  // 计算本周一的日期
  const thisMonday = new Date(today)
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1 // 如果是周日，则距离周一6天
  thisMonday.setDate(today.getDate() - daysFromMonday)
  
  // 上周一 = 本周一 - 7天
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)
  
  // 上周日 = 上周一 + 6天
  const lastSunday = new Date(lastMonday)
  lastSunday.setDate(lastMonday.getDate() + 6)
  
  return {
    start: lastMonday,
    end: lastSunday
  }
}

// 格式化日期为YYYY-MM-DD格式
const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0]
}

// 获取上周的标签显示
const getLastWeekLabel = () => {
  const { start, end } = getLastWeekDates()
  const startStr = start.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  const endStr = end.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  return `${startStr} - ${endStr}`
}

// 设置日期范围
const setDateRange = (range: string) => {
  const today = new Date()
  
  switch (range) {
    case 'last-week': {
      const { start, end } = getLastWeekDates()
      startDate.value = formatDateForInput(start)
      endDate.value = formatDateForInput(end)
      break
    }
    case 'this-week': {
      const currentDay = today.getDay()
      const thisMonday = new Date(today)
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1
      thisMonday.setDate(today.getDate() - daysFromMonday)
      
      const thisSunday = new Date(thisMonday)
      thisSunday.setDate(thisMonday.getDate() + 6)
      
      startDate.value = formatDateForInput(thisMonday)
      endDate.value = formatDateForInput(thisSunday)
      break
    }
    case 'last-month': {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
      
      startDate.value = formatDateForInput(lastMonth)
      endDate.value = formatDateForInput(lastMonthEnd)
      break
    }
    case 'this-month': {
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      
      startDate.value = formatDateForInput(thisMonth)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-3-months': {
      const threeMonthsAgo = new Date(today)
      threeMonthsAgo.setMonth(today.getMonth() - 3)
      
      startDate.value = formatDateForInput(threeMonthsAgo)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-6-months': {
      const sixMonthsAgo = new Date(today)
      sixMonthsAgo.setMonth(today.getMonth() - 6)
      
      startDate.value = formatDateForInput(sixMonthsAgo)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'this-year': {
      const thisYear = new Date(today.getFullYear(), 0, 1)
      
      startDate.value = formatDateForInput(thisYear)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-year': {
      const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
      const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31)
      
      startDate.value = formatDateForInput(lastYearStart)
      endDate.value = formatDateForInput(lastYearEnd)
      break
    }
    case 'all': {
      startDate.value = ''
      endDate.value = ''
      break
    }
  }
}

// 监听扫描路径变化，自动保存到localStorage
watch(scanPath, (newValue) => {
  if (newValue && newValue !== '/path/to/your/projects') {
    localStorage.setItem(STORAGE_KEYS.SCAN_PATH, newValue)
  }
})

// 监听作者过滤器变化，自动保存到localStorage
watch(authorFilter, (newValue) => {
  if (newValue) {
    localStorage.setItem(STORAGE_KEYS.AUTHOR_FILTER, newValue)
  } else {
    // 如果清空了作者信息，也要从localStorage中删除
    localStorage.removeItem(STORAGE_KEYS.AUTHOR_FILTER)
  }
})

// 过滤无效提交的规则
const filterRules = [
  /^chore:\s*save$/i,           // chore: save
  /^update$/i,                  // update
  /^fix$/i,                     // fix
  /^minor\s*fix$/i,            // minor fix
  /^wip$/i,                     // wip (work in progress)
  /^test$/i,                    // test
  /^commit$/i,                  // commit
  /^\.$/,                       // 单个点
  /^initial\s*commit$/i,        // initial commit
  /^first\s*commit$/i,          // first commit
  /^auto\s*commit$/i,           // auto commit
  /^temp$/i,                    // temp
  /^tmp$/i,                     // tmp
  /^backup$/i,                  // backup
  /^.*\s*\.\.\.\s*$/,          // 以...结尾的
  /^[0-9]+$/,                   // 纯数字
  /^[a-f0-9]{7,40}$/,          // 看起来像hash的
  /^merge\s+branch/i,          // merge branch相关提交
]

// 判断提交信息是否应该被过滤
const shouldFilterCommit = (message: string): boolean => {
  if (!message || message.trim().length === 0) return true
  return filterRules.some(rule => rule.test(message.trim()))
}

// 过滤和去重后的提交数据
const filteredCommits = computed(() => {
  let commits = [...parsedData.value]
  
  // 过滤无效提交
  if (enableFiltering.value) {
    commits = commits.filter(commit => !shouldFilterCommit(commit.message))
  }
  
  // 去重处理
  if (enableDeduplication.value) {
    const seen = new Set<string>()
    commits = commits.filter(commit => {
      const key = `${commit.project}:${commit.message.trim()}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }
  
  return commits.sort((a, b) => b.date.getTime() - a.date.getTime())
})

// 去重数量统计
const deduplicatedCount = computed(() => {
  if (!enableDeduplication.value) return 0
  return parsedData.value.length - new Set(parsedData.value.map(c => `${c.project}:${c.message.trim()}`)).size
})

// 过滤数量统计
const filteredCount = computed(() => {
  if (!enableFiltering.value) return 0
  return parsedData.value.filter(commit => shouldFilterCommit(commit.message)).length
})

// 提取提交类型
const getCommitType = (message: string): string => {
  const match = message.match(/^([a-zA-Z]+)(\([^)]*\))?:\s*/)
  if (match) {
    return match[1].toLowerCase()
  }
  return 'other'
}

// 提交类型排序优先级
const commitTypePriority = new Map([
  ['feat', 1],
  ['perf', 2], 
  ['fix', 3],
  ['other', 999]
])

// 获取提交类型的排序权重
const getTypeWeight = (type: string): number => {
  return commitTypePriority.get(type) || 999
}

// 生成提交详情文本 - 按项目和类型分类
const commitDetailsText = computed(() => {
  // 按项目分组
  const projectGroups = new Map<string, CommitData[]>()
  
  filteredCommits.value.forEach(commit => {
    if (!projectGroups.has(commit.project)) {
      projectGroups.set(commit.project, [])
    }
    projectGroups.get(commit.project)!.push(commit)
  })
  
  // 按项目名称排序
  const sortedProjects = Array.from(projectGroups.keys()).sort()
  
  // 生成格式化文本
  const result: string[] = []
  
  sortedProjects.forEach(projectName => {
    const commits = projectGroups.get(projectName)!
    result.push(`【${projectName}】`)
    
    // 按提交类型分组
    const typeGroups = new Map<string, CommitData[]>()
    commits.forEach(commit => {
      const type = getCommitType(commit.message)
      if (!typeGroups.has(type)) {
        typeGroups.set(type, [])
      }
      typeGroups.get(type)!.push(commit)
    })
    
    // 按类型优先级排序
    const sortedTypes = Array.from(typeGroups.keys()).sort((a, b) => {
      const weightA = getTypeWeight(a)
      const weightB = getTypeWeight(b)
      if (weightA !== weightB) {
        return weightA - weightB
      }
      // 相同权重按字母排序
      return a.localeCompare(b)
    })
    
    // 输出每个类型的提交
    sortedTypes.forEach(type => {
      const typeCommits = typeGroups.get(type)!
      // 每个类型内按时间倒序排列
      const sortedCommits = typeCommits.sort((a, b) => b.date.getTime() - a.date.getTime())
      
      sortedCommits.forEach(commit => {
        result.push(commit.message)
      })
    })
    
    // 项目之间添加空行
    result.push('')
  })
  
  // 移除最后的空行
  if (result.length > 0 && result[result.length - 1] === '') {
    result.pop()
  }
  
  return result.join('\n')
})

// 复制提交详情
const copyCommitDetails = async () => {
  try {
    await navigator.clipboard.writeText(commitDetailsText.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy commit details:', err)
  }
}

// 清除保存的配置
const clearSavedSettings = () => {
  if (confirm('确定要清除保存的配置吗？这将删除已保存的扫描路径和作者信息。')) {
    localStorage.removeItem(STORAGE_KEYS.SCAN_PATH)
    localStorage.removeItem(STORAGE_KEYS.AUTHOR_FILTER)
    scanPath.value = '/path/to/your/projects'
    authorFilter.value = ''
  }
}

// 切换命令预览
const toggleCommandView = () => {
  showCommand.value = !showCommand.value
}

// 生成Windows脚本内容
const generateWindowsScript = () => {
  const path = scanPath.value && scanPath.value !== '/path/to/your/projects' ? scanPath.value.replace(/\//g, '\\') : '%~dp0'
  const author = authorFilter.value ? ` --author="${authorFilter.value}"` : ''
  
  let dateRange = ''
  if (startDate.value) {
    dateRange += ` --since="${startDate.value}"`
  }
  if (endDate.value) {
    const endDateTime = new Date(endDate.value)
    endDateTime.setHours(23, 59, 59, 999)
    dateRange += ` --until="${endDateTime.toISOString()}"`
  }

  const today = new Date().toISOString().slice(0, 10)

  return `@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo Git提交统计扫描脚本 - Windows版本
echo 扫描目录: ${path}
echo.

REM 获取脚本执行目录的绝对路径
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM 设置输出文件（绝对路径）
set "output_file=%SCRIPT_DIR%git-commits-${today}.txt"
set "markdown_file=%SCRIPT_DIR%git-commits-${today}.md"

REM 清空输出文件
echo Git提交统计报告 > "%output_file%"
echo 生成时间: %date% %time% >> "%output_file%"
echo 扫描目录: ${path} >> "%output_file%"
echo. >> "%output_file%"

REM 创建Markdown文件
echo # Git提交统计报告 > "%markdown_file%"
echo. >> "%markdown_file%"
echo **生成时间:** %date% %time% >> "%markdown_file%"
echo **扫描目录:** \`${path}\` >> "%markdown_file%"
echo. >> "%markdown_file%"
echo \`\`\` >> "%markdown_file%"

echo 正在统计Git目录数量...
REM 创建临时文件存储git目录
set "tempfile=%temp%\\gitdirs.txt"
dir "${path}" /s /b /ad | findstr /e ".git" > "%tempfile%"

REM 计算总目录数
set /a total_count=0
for /f %%i in ("%tempfile%") do set /a total_count+=1

echo 找到 %total_count% 个Git项目，开始扫描...
echo.

REM 初始化进度计数器
set /a current_count=0
set /a progress_percent=0

REM 读取每个git目录并处理
for /f "usebackq delims=" %%i in ("%tempfile%") do (
    set "gitdir=%%i"
    set "repodir=!gitdir:\\.git=!"
    
    REM 更新进度
    set /a current_count+=1
    set /a progress_percent=current_count*100/total_count
    
    REM 获取项目名称
    for %%j in ("!repodir!") do set "reponame=%%~nxj"
    
    REM 显示进度
    echo [!progress_percent!%%] (!current_count!/!total_count!) 正在扫描: !reponame!
    
    REM 输出到控制台和文件
    echo === !reponame! ===
    echo === !reponame! === >> "%output_file%"
    
    pushd "!repodir!" >nul 2>&1
    if !errorlevel! equ 0 (
        REM 创建临时文件存储当前项目的git log输出
        set "temp_output=%temp%\\git_output_!current_count!.txt"
        set "temp_stats=%temp%\\git_stats_!current_count!.txt"
        
        REM 获取提交信息和代码行数统计
        git log --pretty=format:"%%H^|%%ad^|%%s^|%%an^|%%ae" --numstat --date=iso${author}${dateRange} 2>nul > "!temp_output!"
        
        REM 检查git命令是否成功
        if !errorlevel! equ 0 (
            REM 显示到控制台并追加到主输出文件
            type "!temp_output!"
            type "!temp_output!" >> "%output_file%"
        ) else (
            echo Error: 无法读取git日志
            echo Error: 无法读取git日志 >> "%output_file%"
        )
        
        REM 清理临时文件
        del "!temp_output!" >nul 2>&1
        popd >nul 2>&1
    ) else (
        echo Error: 无法访问目录 !repodir!
        echo Error: 无法访问目录 !repodir! >> "%output_file%"
    )
    echo.
    echo. >> "%output_file%"
)

REM 完成Markdown文件
echo \`\`\` >> "%markdown_file%"
echo. >> "%markdown_file%"
echo **扫描完成时间:** %date% %time% >> "%markdown_file%"

REM 将TXT内容复制到Markdown文件
echo. >> "%markdown_file%"
echo ## 原始数据 >> "%markdown_file%"
echo \`\`\` >> "%markdown_file%"
type "%output_file%" >> "%markdown_file%"
echo \`\`\` >> "%markdown_file%"

REM 清理临时文件
del "%tempfile%" >nul 2>&1

echo.
echo ================================
echo 扫描完成！
echo.
echo 输出文件已保存到：
echo - TXT格式: %output_file%
echo - Markdown格式: %markdown_file%
echo.
echo 您可以：
echo 1. 复制上述控制台输出到网页工具中
echo 2. 或者直接打开 %output_file% 文件复制内容
echo 3. 或者查看 %markdown_file% 获得格式化报告
echo ================================
pause`
}

// 生成Unix脚本内容
const generateUnixScript = () => {
  const path = scanPath.value && scanPath.value !== '/path/to/your/projects' ? scanPath.value : '.'
  const author = authorFilter.value ? ` --author="${authorFilter.value}"` : ''
  
  let dateRange = ''
  if (startDate.value) {
    dateRange += ` --since="${startDate.value}"`
  }
  if (endDate.value) {
    const endDateTime = new Date(endDate.value)
    endDateTime.setHours(23, 59, 59, 999)
    dateRange += ` --until="${endDateTime.toISOString()}"`
  }

  const today = new Date().toISOString().slice(0, 10)

  return `#!/bin/bash

# 颜色定义
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
PURPLE='\\033[0;35m'
CYAN='\\033[0;36m'
NC='\\033[0m' # No Color

# 进度条函数
show_progress() {
    local current=\$1
    local total=\$2
    local project_name=\$3
    local percent=\$((current * 100 / total))
    local bar_length=30
    local filled_length=\$((percent * bar_length / 100))
    
    printf "\\r[\${CYAN}"
    for ((i=0; i<filled_length; i++)); do printf "█"; done
    for ((i=filled_length; i<bar_length; i++)); do printf "░"; done
    printf "\${NC}] \${percent}%% (\${current}/\${total}) \${YELLOW}\${project_name}\${NC}"
}

echo -e "\${GREEN}Git提交统计扫描脚本 - Unix/Linux版本\${NC}"
echo -e "扫描目录: \${BLUE}$(cd "${path}" && pwd)\${NC}"
echo ""

# 获取脚本执行目录的绝对路径
SCRIPT_DIR="\$(cd "\$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
cd "\$SCRIPT_DIR"

# 设置输出文件（绝对路径）
OUTPUT_FILE="\$SCRIPT_DIR/git-commits-${today}.txt"
MARKDOWN_FILE="\$SCRIPT_DIR/git-commits-${today}.md"

# 创建输出文件头部
cat > "\$OUTPUT_FILE" << EOF
Git提交统计报告
生成时间: \$(date)
扫描目录: $(cd "${path}" && pwd)

EOF

# 创建Markdown文件
cat > "\$MARKDOWN_FILE" << EOF
# Git提交统计报告

**生成时间:** \$(date)  
**扫描目录:** \`$(cd "${path}" && pwd)\`

\`\`\`
EOF

echo -e "\${YELLOW}正在统计Git目录数量...\${NC}"

# 查找所有Git目录并计算总数
git_dirs=()
while IFS= read -r -d '' gitdir; do
    git_dirs+=("\$gitdir")
done < <(find "${path}" -name ".git" -type d -print0 2>/dev/null)

total_count=\${#git_dirs[@]}

if [ \$total_count -eq 0 ]; then
    echo -e "\${RED}错误: 在指定目录中未找到任何Git项目\${NC}"
    exit 1
fi

echo -e "找到 \${GREEN}\$total_count\${NC} 个Git项目，开始扫描..."
echo ""

# 扫描每个Git项目
current_count=0

for gitdir in "\${git_dirs[@]}"; do
    repo=\$(dirname "\$gitdir")
    reponame=\$(basename "\$repo")
    
    ((current_count++))
    
    # 显示进度条
    show_progress \$current_count \$total_count "\$reponame"
    
    # 输出项目标识符到文件和控制台
    echo "" # 换行，为了不覆盖进度条
    echo "=== \$reponame ==="
    echo "=== \$reponame ===" >> "\$OUTPUT_FILE"
    
    # 创建临时文件存储当前项目的git log输出
    temp_output="\$(mktemp)"
    
    (
        cd "\$repo" || { 
            echo "Error: 无法访问目录 \$repo"
            echo "Error: 无法访问目录 \$repo" >> "\$OUTPUT_FILE"
            rm -f "\$temp_output"
            return 1
        }
        
        # 执行git log到临时文件，包含代码行数统计
        if git log --pretty=format:"%H|%ad|%s|%an|%ae" --numstat --date=iso${author}${dateRange} 2>/dev/null > "\$temp_output"; then
            # 显示到控制台
            cat "\$temp_output"
            # 追加到主输出文件
            cat "\$temp_output" >> "\$OUTPUT_FILE"
        else
            echo "Error: 无法读取git日志"
            echo "Error: 无法读取git日志" >> "\$OUTPUT_FILE"
        fi
    )
    
    # 清理临时文件
    rm -f "\$temp_output"
    
    echo ""
    echo "" >> "\$OUTPUT_FILE"
done

# 完成进度条显示
echo ""
echo ""

# 完成Markdown文件
cat >> "\$MARKDOWN_FILE" << EOF
\`\`\`

**扫描完成时间:** \$(date)
EOF

# 复制内容到Markdown文件
echo "" >> "\$MARKDOWN_FILE"
echo "## 原始数据" >> "\$MARKDOWN_FILE"
echo "\`\`\`" >> "\$MARKDOWN_FILE"
cat "\$OUTPUT_FILE" >> "\$MARKDOWN_FILE"
echo "\`\`\`" >> "\$MARKDOWN_FILE"

echo -e "\${GREEN}================================\${NC}"
echo -e "\${GREEN}扫描完成！\${NC}"
echo ""
echo -e "输出文件已保存到："
echo -e "- TXT格式: \${CYAN}\$OUTPUT_FILE\${NC}"
echo -e "- Markdown格式: \${CYAN}\$MARKDOWN_FILE\${NC}"
echo ""
echo -e "您可以："
echo -e "1. 复制上述控制台输出到网页工具中"
echo -e "2. 或者直接打开 \${CYAN}\$OUTPUT_FILE\${NC} 文件复制内容"
echo -e "3. 或者查看 \${CYAN}\$MARKDOWN_FILE\${NC} 获得格式化报告"
echo -e "\${GREEN}================================\${NC}"

# 显示文件大小信息
if [ -f "\$OUTPUT_FILE" ]; then
    file_size=\$(du -h "\$OUTPUT_FILE" | cut -f1)
    echo -e "输出文件大小: \${YELLOW}\$file_size\${NC}"
fi`
}

// 下载Windows脚本
const downloadWindowsScript = () => {
  const script = generateWindowsScript()
  const blob = new Blob([script], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'scan-git-commits.bat'
  a.click()
  URL.revokeObjectURL(url)
}

// 下载Unix脚本
const downloadUnixScript = () => {
  const script = generateUnixScript()
  const blob = new Blob([script], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'scan-git-commits.sh'
  a.click()
  URL.revokeObjectURL(url)
}

// 组件挂载时的初始化
onMounted(() => {
  // 默认设置为上周一至周日
  setDateRange('last-week')
})
</script>