import Link from "next/link";
import { FC } from "react";
import LayoutStyle from "../components/LayoutStyle";
import App from "../components/App";
import RestaurantList from "../components/RestaurantList";
import { Layout, Input, Card, Row, Col, Typography} from "antd";
import FooterLayout from "../components/FooterLayout";

const { Search } = Input;
const { Title } = Typography;

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
        <div style={{marginTop: 50, textAlign: "center"}}>
          <Title>Restaurant Review</Title>
          <Title level={4}>Hello Food Critics</Title>
        </div>
        <div>
          <Row justify="space-around" style={{marginTop: 50, marginBottom: 50}}>
            <Col>
              <Card title="Default Title" bordered={true} style={{width: 400}}>
                <p><RestaurantList /></p>
                <p>Card Content</p>
                <p>Card Content</p>
              </Card>
            </Col>
            <Col>
              <Card title="Default Title" bordered={true} style={{width: 400}}>
                <p>Card Content</p>
                <p>Card Content</p>
                <p>Card Content</p>
              </Card>
            </Col>
            <Col>
              <Card title="Default Title" bordered={true} style={{width: 400}}>
                <p>Card Content</p>
                <p>Card Content</p>
                <p>Card Content</p>
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
