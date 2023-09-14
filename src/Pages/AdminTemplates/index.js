import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function AdminTemplates() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu style={{ fontSize: "15px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}>
          <Menu.Item key={1}
            icon={<UserOutlined />}>
            <NavLink to="/admin/user">
              User
            </NavLink>
          </Menu.Item>
          <Menu.Item key={2}
            icon={<GlobalOutlined />}>
            <NavLink to="/admin/location">
              Location
            </NavLink>
          </Menu.Item>
          <Menu.Item key={3}
            icon={<HomeOutlined />}>
            <NavLink to="/admin/room">
              Room
            </NavLink>
          </Menu.Item>
          <Menu.Item key={4}
            icon={<PhoneOutlined />}>
            <NavLink to="/admin/booking">
              Booking
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 20px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <button>Đăng xuất</button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div style={{ padding: "24px", margin: "24px 16px", minHeight: "700px", background: "colorBgContainer" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
