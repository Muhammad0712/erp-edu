import React, { useEffect, useState } from 'react';
import {
  BookOutlined,
  CodepenOutlined,
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
  getInfo('Groups', 'admin', <TeamOutlined />),
  getInfo('Courses', 'courses', <JavaScriptOutlined />),
  getInfo('Teachers', 'teachers', <ReadOutlined />),
  getInfo('Students', 'students', <BookOutlined />),
  getInfo('Branches', 'branches', <ContactsOutlined   />),
  getInfo('Rooms', 'rooms', <CodepenOutlined />),
];

const AdminLayout = () => {

  // Current time
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  // ---------------


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

  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    navigate('/')
  }

  
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[location.pathname.split('/')[2] || location.pathname.split('/')[1]]} mode="inline" items={items} onClick={handleMenuClick}/>
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
          <div className="flex gap-2 items-center justify-between w-[150px]">
            <h1 className="text-2xl font-bold">{time.toLocaleTimeString()}</h1>
            <Tooltip title="Log out">
              <img src={logOut} alt="log-out" className='w-[25px] h-[25px] cursor-pointer' onClick={handleLogOut} />
            </Tooltip>
          </div>
        </Header>
        <Content style={{ margin: '10px 10px' }}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
