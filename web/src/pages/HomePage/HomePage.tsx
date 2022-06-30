import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="container mx-auto space-y-4">
        <ArticlesCell />
      </div>
    </>
  )
}

export default HomePage
