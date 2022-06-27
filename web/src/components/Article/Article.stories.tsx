import Article from './Article'
import { standard } from './Article.mock'

export const full = () => {
  return <Article {...standard()} />
}

export const summary = () => {
  return <Article {...standard()} summary={true} />
}

export default { title: 'Components/Article' }
