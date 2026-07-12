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
    const orderFor = (node: ExplorerNode): number => {
      const frontmatter = node.data?.frontmatter as { nav_order?: unknown } | undefined
      return typeof frontmatter?.nav_order === "number"
        ? frontmatter.nav_order
        : Number.MAX_SAFE_INTEGER
    }
    const orderDifference = orderFor(a) - orderFor(b)
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
