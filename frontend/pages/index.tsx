import Link from "next/link";
import { FC } from "react";
import LayoutStyle from "../components/LayoutStyle";
import App from "../components/App";
import RestaurantList from "../components/RestaurantList";
import { Layout, Input, Card, Row, Col} from "antd";
import FooterLayout from "../components/FooterLayout";

const { Search } = Input;

const { Content } = Layout;
const IndexPage: FC = () => (
  <App>
    <LayoutStyle title="Home | Next.js + TypeScript Example">
      <Content>
        {/* <h1>Hello Wyatt 👋</h1> */}
        {/* <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p> */}
        <div style={{padding: 150, background: '#134968'}}>
        {/* '#144959' */}
          <Search 
            placeholder="Find"
            style={{fontSize: 18}}
          />
        </div>
        <div>
          <Row gutter={16}>
            <Col>
              <Card bordered={true} bodyStyle={{}}>
                <p><RestaurantList /></p>
              </Card>
            </Col>
            <Col>
              <Card bordered={true}>
                Card content
              </Card>
            </Col>
            <Col>
              <Card bordered={true}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <FooterLayout>
          </FooterLayout>
        </div>
      </Content>
    </LayoutStyle>
  </App>
);

export default IndexPage;
