/**
 * 工具分类
 */
export type ToolCategory = 
  | 'text'          // 文本处理
  | 'color'         // 颜色/设计
  | 'image'         // 图片/多媒体
  | 'datetime'      // 日期/时间
  | 'math'          // 数学/单位
  | 'encode'        // 编码/加密
  | 'web'           // Web/DevTools
  | 'random'        // 随机/生成器
  | 'file'          // 文件/文档
  | 'data'          // 数据/可视化

/**
 * 工具信息接口
 */
export interface ToolInfo {
  /** 工具唯一标识 */
  id: string
  /** 工具名称 */
  name: string
  /** 工具描述 */
  description: string
  /** 工具分类 */
  category: ToolCategory
  /** 工具图标 */
  icon: string
  /** 是否为热门工具 */
  featured?: boolean
  /** 工具标签 */
  tags?: string[]
  /** 是否已实现 */
  implemented?: boolean
}

/**
 * 分类信息接口
 */
export interface CategoryInfo {
  /** 分类标识 */
  id: ToolCategory
  /** 分类名称 */
  name: string
  /** 分类描述 */
  description: string
  /** 分类图标 */
  icon: string
  /** 分类颜色 */
  color: string
} 