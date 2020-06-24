import Link from "next/link";
import { FC } from "react"
import Layout from "../components/Layout";
import App from "../components/App";
import RestaurantList from "../components/RestaurantList";

const IndexPage: FC = () => (
  <App>
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Wyatt 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div>
        <RestaurantList />
      </div>
    </Layout>
  </App>
);

export default IndexPage;
