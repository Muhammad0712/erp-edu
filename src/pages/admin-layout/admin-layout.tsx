import React, { useState } from 'react';
import {
  BookOutlined,
  ContactsOutlined,
  FileOutlined,
  PieChartOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import Groups from '../groups/groups';
import logOut from '@assets/images/log-out-my.svg'

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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
  getItem('Groups', '1', <TeamOutlined />),
  getItem('Teachers', '2', <ReadOutlined />),
  getItem('Students', '3', <BookOutlined />),
  getItem('Lids', '4', <ContactsOutlined   />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '5'),
    getItem('Bill', '6'),
    getItem('Alex', '7'),
  ]),
  getItem('Team', 'sub2', <PieChartOutlined />, [getItem('Team 1', '8'), getItem('Team 2', '9')]),
  getItem('Files', '10', <FileOutlined />),
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const throwGroupsPage = (url: string) => {
    navigate(`/${role}/${url}`);
    return
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        throwGroupsPage('groups')
        break;
      case '2':
        throwGroupsPage('group')
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick}/>
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
          <h1 className="text-2xl font-bold">Groups</h1>
          <img src={logOut} alt="log-out" className='w-[40px] h-[40px] cursor-pointer' onClick={handleLogOut}/>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Groups/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
