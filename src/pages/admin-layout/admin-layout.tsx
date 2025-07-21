import React, { useState } from 'react';
import {
  BookOutlined,
  ContactsOutlined,
  JavaScriptOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Tooltip } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import logOut from '@assets/images/log-out-my.svg'
import { getItem } from '@helpers';

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
  getInfo('Groups', 'groups', <TeamOutlined />),
  getInfo('Courses', 'courses', <JavaScriptOutlined />),
  getInfo('Teachers', 'teachers', <ReadOutlined />),
  getInfo('Students', 'students', <BookOutlined />),
  getInfo('Branches', 'branches', <ContactsOutlined   />),
];

const AdminLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const role = getItem('role')
  const throwPage = (url: string) => {
    navigate(`/${role}/${url}`);
    return
  }
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'groups':
        throwPage('groups')
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
    
      default:
        break;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    navigate('/')
  }

  
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[location.pathname.split('/')[2]]} mode="inline" items={items} onClick={handleMenuClick}/>
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}
        >
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Tooltip title="Log out">
            <img src={logOut} alt="log-out" className='w-[25px] h-[25px] cursor-pointer' onClick={handleLogOut} />
          </Tooltip>
        </Header>
        <Content style={{ margin: '10px 10px' }}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
