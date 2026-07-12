import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Frontmatter } from "./quartz/plugins/transformers/frontmatter"

const config = await loadQuartzConfig()
config.plugins.transformers.unshift(Frontmatter())
export default config
export const layout = await loadQuartzLayout()
