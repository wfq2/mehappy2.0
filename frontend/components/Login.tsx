import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { LoginMutation, LoginMutationVariables } from "../generated/types";
import { Input, Space, Button, Form, Alert } from "antd";
import { FC, useState } from "react";
import { setToken } from "../lib/graphql-client";

// const GET_ALL_RESTAURANTS = loader("./allRestaurants.graphql");
const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password })
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface State {
  error?: string;
  message?: string;
}

const Login: FC = () => {
  async function onFinish(values: { email: string; password: string }) {
    try {
      const token = (await login({ variables: values })).data?.login;
      console.log(token);
      if (token) {
        setToken(token);
      }
      setState({ message: token });
    } catch (e) {
      setState({ error: String(e) });
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [login, { data }] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN
  );

  const [state, setState] = useState<State>({});

  return (
    <Form
      {...layout}
      name="loginform"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {state?.message ? (
        <Alert message={state.message} type="success"></Alert>
      ) : null}
      {state?.error ? <Alert message={state.error} type="error"></Alert> : null}
    </Form>
  );
};

export default Login;
