import { FC } from "react";
import App from "../components/App";
import LayoutStyle from "../components/LayoutStyle";
import Login from "../components/Login";

const LoginPage: FC = () => (
  <App>
    <LayoutStyle title="Home | Next.js + TypeScript Example">
      <h1>Login</h1>
      <div>
        <Login></Login>
      </div>
    </LayoutStyle>
  </App>
);

export default LoginPage;
