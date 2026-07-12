import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Frontmatter } from "./quartz/plugins/transformers/frontmatter"
import { Explorer } from "./.quartz/plugins/index"

interface ExplorerNode {
  displayName?: string
  isFolder: boolean
  data: Record<string, unknown> | null
}

Explorer({
  sortFn: (a: ExplorerNode, b: ExplorerNode) => {
    const aFrontmatter = a.data?.frontmatter as { nav_order?: unknown } | undefined
    const bFrontmatter = b.data?.frontmatter as { nav_order?: unknown } | undefined
    const aOrder = typeof aFrontmatter?.nav_order === "number" ? aFrontmatter.nav_order : Number.MAX_SAFE_INTEGER
    const bOrder = typeof bFrontmatter?.nav_order === "number" ? bFrontmatter.nav_order : Number.MAX_SAFE_INTEGER
    const orderDifference = aOrder - bOrder
    if (orderDifference !== 0) return orderDifference
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
})
const config = await loadQuartzConfig()
config.plugins.transformers.unshift(Frontmatter())
export default config
export const layout = await loadQuartzLayout()
