import React, { useState } from 'react';
import {
  BookOutlined,
  CodepenOutlined,
  ContactsOutlined,
  JavaScriptOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getItem } from '@helpers';
import { AvatarDropdown } from '@components';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getInfo(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getInfo('Groups', 'admin', <TeamOutlined />),
  getInfo('Courses', 'courses', <JavaScriptOutlined />),
  getInfo('Teachers', 'teachers', <ReadOutlined />),
  getInfo('Students', 'students', <BookOutlined />),
  getInfo('Branches', 'branches', <ContactsOutlined />),
  getInfo('Rooms', 'rooms', <CodepenOutlined />),
];

const AdminLayout = () => {
  const [title, setTitle] = useState<React.ReactNode>(<span>Admin</span>);

  const location = useLocation()
  const navigate = useNavigate()
  const role = getItem('role')
  const throwPage = (url: string) => {
    navigate(`/${role}/${url}`);
    return
  }
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'admin':
        throwPage('')
        break;
      case 'courses':
        throwPage('courses')
        break;
      case 'students':
        throwPage('students')
        break;
      case 'teachers':
        throwPage('teachers')
        break;
      case 'branches':
        throwPage('branches')
        break;
      case 'rooms':
        throwPage('rooms')
        break;

      default:
        break;
    }
  };

  return (
    <Layout style={{
      minHeight: '100vh',
      marginLeft: collapsed ? 80 : 200,
      transition: 'margin-left 0.2s' // Silliq o'tish
    }}>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={80}
        onCollapse={(value) => {
          setTitle(value ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-user-icon lucide-shield-user"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M6.376 18.91a6 6 0 0 1 11.249.003" /><circle cx="12" cy="11" r="4" /></svg> : <>{'Admin'}</>);
          setCollapsed(value)
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <div className={`flex items-center justify-center w-full h-[60px] transition-all duration-300 overflow-hidden`}>
          {<span className='text-2xl font-bold text-white'>{title}</span>}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname.split('/')[2] || location.pathname.split('/')[1]]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 16px',
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end'
        }}
        >
          <AvatarDropdown />
        </Header>
        <Content style={{ margin: '10px 10px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
