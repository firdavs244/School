import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { LockOutlined, MailOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import './Auth.css';

const { Title, Paragraph } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await loginUser(values.username, values.password);
      localStorage.setItem('token', data.access_token);

      // Fetch and store user data
      const userRes = await fetch('http://localhost:8000/users/me', {
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        localStorage.setItem('user_id', userData.id);
      }

      message.success('Tizimga muvaffaqiyatli kirdingiz!');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.message || 'Kirish xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div className="auth-icon">
            <LoginOutlined style={{ fontSize: 64, color: '#1890ff' }} />
          </div>

          <div>
            <Title level={2}>Tizimga Kirish</Title>
            <Paragraph type="secondary">Hisobingizga kiring</Paragraph>
          </div>

          <Form
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ width: '100%' }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Email kiriting!' },
                { type: 'email', message: 'To\'g\'ri email kiriting!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="emailingizni kiriting"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Parol kiriting!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="parolingizni kiriting"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                icon={<LoginOutlined />}
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>

          <Space split="|">
            <span>Hisobingiz yo'qmi?</span>
            <Link to="/register">
              <Button type="link" icon={<UserAddOutlined />}>
                Ro'yxatdan o'tish
              </Button>
            </Link>
          </Space>

          <Link to="/">
            <Button type="text">← Bosh sahifaga qaytish</Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
}

