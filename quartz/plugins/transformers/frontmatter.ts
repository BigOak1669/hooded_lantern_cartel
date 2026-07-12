import remarkFrontmatter from "remark-frontmatter"
import { parse } from "yaml"
import { QuartzTransformerPlugin } from "../types"

/** Parse YAML frontmatter before the community transformers consume metadata. */
export const Frontmatter: QuartzTransformerPlugin = () => ({
  name: "Frontmatter",
  markdownPlugins() {
    return [
      remarkFrontmatter,
      () => (tree, file) => {
        const first = tree.children[0] as { type?: string; value?: string } | undefined
        if (first?.type !== "yaml" || typeof first.value !== "string") return

        const parsed = parse(first.value)
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          file.data.frontmatter = parsed
        }
        tree.children.shift()
      },
    ]
  },
})
