import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import logOut from '../assets/images/log-out-my.svg'

const AvatarDropdown = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        navigate('/')
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account'
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: 'Profile',
            extra: '⌘P',
        },
        {
            key: '3',
            label: 'Billing',
            extra: '⌘B',
        },
        {
            key: '4',
            label: 'Log Out',
            icon: <img src={logOut} alt="logout" style={{ width: 16 }} />,
            onClick: handleLogOut,
        },
    ];

    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <div className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center">
                        <span className="text-lg">A</span>
                    </div>
                    
                </Space>
            </a>
        </Dropdown>
    );
};

export { AvatarDropdown };
