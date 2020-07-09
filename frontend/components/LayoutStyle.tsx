import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Menu } from "antd";

type Props = {
  children?: ReactNode;
  title?: string;
};

const LayoutStyle = ({
  children,
  title = "This is the default title",
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      {/* <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav> */}
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/about">
            <a>About</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="usersList">
          <Link href="/users">
            <a>Users List</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="userApi">
          <Link href="/api/users">
            <a>Users API</a>
          </Link>
        </Menu.Item>
      </Menu>
    </header>
    {children}
    {
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    }
  </div>
);

export default LayoutStyle;
