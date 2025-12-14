import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { getCurrentUser } from '../services/api';
import './Header.css';

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
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate('/dashboard'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Chiqish',
      danger: true,
      onClick: handleLogout,
    },
  ];

  const getRoleColor = (role) => {
    const colors = {
      admin: '#ff4d4f',
      teacher: '#52c41a',
      student: '#1890ff',
    };
    return colors[role] || '#1890ff';
  };

  const menuItems = user ? [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Boshqaruv',
      onClick: () => navigate('/dashboard'),
    },
    ...(user.role === 'student' ? [
      {
        key: 'courses',
        icon: <BookOutlined />,
        label: 'Kurslar',
        onClick: () => navigate('/browse-courses'),
      },
      {
        key: 'assignments',
        icon: <FileTextOutlined />,
        label: 'Topshiriqlar',
        onClick: () => navigate('/my-assignments'),
      },
      {
        key: 'grades',
        icon: <BarChartOutlined />,
        label: 'Baholar',
        onClick: () => navigate('/my-grades'),
      },
    ] : []),
    ...(user.role === 'teacher' ? [
      {
        key: 'create-course',
        icon: <BookOutlined />,
        label: 'Kurs Yaratish',
        onClick: () => navigate('/create-course'),
      },
      {
        key: 'submissions',
        icon: <FileTextOutlined />,
        label: 'Topshiriqlar',
        onClick: () => navigate('/view-submissions'),
      },
    ] : []),
    ...(user.role === 'admin' ? [
      {
        key: 'users',
        icon: <UserOutlined />,
        label: 'Foydalanuvchilar',
        onClick: () => navigate('/manage-users'),
      },
      {
        key: 'courses-manage',
        icon: <BookOutlined />,
        label: 'Kurslar',
        onClick: () => navigate('/manage-courses'),
      },
    ] : []),
  ] : [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Bosh sahifa',
      onClick: () => navigate('/'),
    },
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: 'Kurslar',
      onClick: () => navigate('/browse-courses'),
    },
  ];

  return (
    <AntHeader className="site-header">
      <div className="header-content">
        <div className="header-logo" onClick={() => navigate('/')}>
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
                onClick={() => navigate('/login')}
              >
                Kirish
              </Button>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => navigate('/register')}
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
          <Menu
            mode="vertical"
            items={menuItems}
            style={{ border: 'none' }}
          />
          {!user && (
            <div className="mobile-menu-actions">
              <Button block icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                Kirish
              </Button>
              <Button block type="primary" icon={<UserAddOutlined />} onClick={() => navigate('/register')}>
                Ro'yxatdan o'tish
              </Button>
            </div>
          )}
        </div>
      )}
    </AntHeader>
  );
}

