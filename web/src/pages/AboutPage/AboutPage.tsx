import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <p className="font-light">
          This site was created to demonstrate my mastery of Redwood: Look on my works, ye mighty, and despair!
        </p>
      </div>
    </>
  )
}

export default AboutPage
