// RegisterPage - Ro'yxatdan o'tish sahifasi
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, getCurrentUser } from '../../api';
import { ROUTES } from '../../routes';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
  LoginOutlined
} from '@ant-design/icons';
import '../../styles/pages/Auth.css';

const { Title, Paragraph } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Token mavjudligini va haqiqiyligini tekshirish
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await getCurrentUser();
          // Token haqiqiy - dashboardga o'tish
          navigate(ROUTES.DASHBOARD);
        } catch {
          // Token eskirgan - o'chirish
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Parollar mos kelmadi');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        email: values.email,
        full_name: values.full_name,
        password: values.password,
        role: 'student'
      });

      message.success('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi tizimga kiring.');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      message.error(err.message || 'Ro\'yxatdan o\'tishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Space orientation="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div className="auth-icon">
            <UserAddOutlined style={{ fontSize: 64, color: '#1890ff' }} />
          </div>

          <div>
            <Title level={2}>Ro'yxatdan O'tish</Title>
            <Paragraph type="secondary">Yangi hisob yaratish</Paragraph>
          </div>

          <Form
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ width: '100%' }}
          >
            <Form.Item
              name="full_name"
              rules={[{ required: true, message: 'Ismingizni kiriting!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Ism Familiya"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email kiriting!' },
                { type: 'email', message: 'To\'g\'ri email kiriting!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="email@example.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Parol kiriting!' },
                { min: 6, message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Kamida 6 ta belgi"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Parolni tasdiqlang!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Parolni qayta kiriting"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                icon={<UserAddOutlined />}
              >
                Ro'yxatdan o'tish
              </Button>
            </Form.Item>
          </Form>

          <Space separator="|">
            <span>Hisobingiz bormi?</span>
            <Link to={ROUTES.LOGIN}>
              <Button type="link" icon={<LoginOutlined />}>
                Tizimga kirish
              </Button>
            </Link>
          </Space>

          <Link to={ROUTES.HOME}>
            <Button type="text">← Bosh sahifaga qaytish</Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
}

