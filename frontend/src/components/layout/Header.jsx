// Header komponenti
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { getCurrentUser } from '../../api';
import { ROLE_COLORS } from '../../constants';
import { ROUTES } from '../../routes';
import '../../styles/layout/Header.css';

const { Header: AntHeader } = Layout;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then(setUser)
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUser(null);
    navigate(ROUTES.HOME);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate(ROUTES.DASHBOARD),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Chiqish',
      danger: true,
      onClick: handleLogout,
    },
  ];

  const getRoleColor = (role) => ROLE_COLORS[role] || '#1890ff';

  const menuItems = user ? [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Boshqaruv',
      onClick: () => navigate(ROUTES.DASHBOARD),
    },
    ...(user.role === 'student' ? [
      {
        key: 'courses',
        icon: <BookOutlined />,
        label: 'Kurslar',
        onClick: () => navigate(ROUTES.BROWSE_COURSES),
      },
      {
        key: 'assignments',
        icon: <FileTextOutlined />,
        label: 'Topshiriqlar',
        onClick: () => navigate(ROUTES.MY_ASSIGNMENTS),
      },
      {
        key: 'grades',
        icon: <BarChartOutlined />,
        label: 'Baholar',
        onClick: () => navigate(ROUTES.MY_GRADES),
      },
    ] : []),
    ...(user.role === 'teacher' ? [
      {
        key: 'create-course',
        icon: <BookOutlined />,
        label: 'Kurs Yaratish',
        onClick: () => navigate(ROUTES.CREATE_COURSE),
      },
      {
        key: 'submissions',
        icon: <FileTextOutlined />,
        label: 'Topshiriqlar',
        onClick: () => navigate(ROUTES.VIEW_SUBMISSIONS),
      },
    ] : []),
    ...(user.role === 'admin' ? [
      {
        key: 'users',
        icon: <UserOutlined />,
        label: 'Foydalanuvchilar',
        onClick: () => navigate(ROUTES.MANAGE_USERS),
      },
      {
        key: 'courses-manage',
        icon: <BookOutlined />,
        label: 'Kurslar',
        onClick: () => navigate(ROUTES.MANAGE_COURSES),
      },
    ] : []),
  ] : [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Bosh sahifa',
      onClick: () => navigate(ROUTES.HOME),
    },
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: 'Kurslar',
      onClick: () => navigate(ROUTES.BROWSE_COURSES),
    },
  ];

  return (
    <AntHeader className="site-header">
      <div className="header-content">
        <div className="header-logo" onClick={() => navigate(ROUTES.HOME)}>
          <BookOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
          <span className="logo-text">Online Maktab</span>
        </div>

        <div className="header-desktop-menu">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent' }}
          />
        </div>

        <div className="header-actions">
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Space className="user-info">
                <Avatar
                  style={{ backgroundColor: getRoleColor(user.role) }}
                  icon={<UserOutlined />}
                />
                <span className="user-name">{user.full_name}</span>
              </Space>
            </Dropdown>
          ) : (
            <Space>
              <Button
                type="default"
                icon={<LoginOutlined />}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Kirish
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Ro'yxatdan o'tish
              </Button>
            </Space>
          )}
        </div>

        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Menu mode="vertical" items={menuItems} style={{ border: 'none' }} />
          {!user && (
            <div className="mobile-menu-actions">
              <Button block icon={<LoginOutlined />} onClick={() => navigate(ROUTES.LOGIN)}>
                Kirish
              </Button>
              <Button block type="primary" icon={<UserAddOutlined />} onClick={() => navigate(ROUTES.REGISTER)}>
                Ro'yxatdan o'tish
              </Button>
            </div>
          )}
        </div>
      )}
    </AntHeader>
  );
}

