import Link from "next/link";
import { FC } from "react";
import LayoutStyle from "../components/LayoutStyle";
import App from "../components/App";
import RestaurantList from "../components/RestaurantList";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
const IndexPage: FC = () => (
  <App>
    <LayoutStyle title="Home | Next.js + TypeScript Example">
      <Content>
        <h1>Hello Wyatt 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
        <div>
          <RestaurantList />
        </div>
      </Content>
    </LayoutStyle>
  </App>
);

export default IndexPage;
