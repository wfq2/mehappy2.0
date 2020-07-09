import Link from 'next/link'
import LayoutStyle from '../components/LayoutStyle';

const AboutPage = () => (
  <LayoutStyle title="About | Next.js + TypeScript Example">
    <h1>about</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </LayoutStyle>
)

export default AboutPage;
