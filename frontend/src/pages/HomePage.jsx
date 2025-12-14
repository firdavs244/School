import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Statistic, Typography, Space } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import './HomePage.css';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            <BookOutlined /> Online Maktab
          </Title>
          <Title level={3} className="hero-subtitle">
            Zamonaviy Onlayn Ta'lim Platformasi
          </Title>
          <Paragraph className="hero-description">
            Kurslarni boshqarish, topshiriqlar berish va baholarni qo'yish uchun
            professional platforma. Eng yaxshi amaliyotlar va zamonaviy texnologiyalar asosida qurilgan.
          </Paragraph>
          <Space size="large">
            {isAuthenticated ? (
              <>
                <Button
                  type="primary"
                  size="large"
                  icon={<DashboardOutlined />}
                  onClick={() => navigate('/dashboard')}
                >
                  Boshqaruv Paneli
                </Button>
                <Button
                  size="large"
                  icon={<BookOutlined />}
                  onClick={() => navigate('/browse-courses')}
                >
                  Kurslarni Ko'rish
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={() => navigate('/login')}
                >
                  Boshlash
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Ro'yxatdan o'tish
                </Button>
              </>
            )}
          </Space>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <Statistic
                title="O'quvchilar"
                value={1000}
                prefix={<TeamOutlined />}
                suffix="+"
                valueStyle={{ color: '#1890ff', fontSize: '36px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <Statistic
                title="O'qituvchilar"
                value={50}
                prefix={<UserOutlined />}
                suffix="+"
                valueStyle={{ color: '#52c41a', fontSize: '36px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <Statistic
                title="Kurslar"
                value={200}
                prefix={<BookOutlined />}
                suffix="+"
                valueStyle={{ color: '#722ed1', fontSize: '36px' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <Statistic
                title="Topshiriqlar"
                value={5000}
                prefix={<CheckCircleOutlined />}
                suffix="+"
                valueStyle={{ color: '#faad14', fontSize: '36px' }}
              />
            </Card>
          </Col>
        </Row>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Title level={2} className="section-title">
          Kuchli Imkoniyatlar
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={8}>
            <Card className="feature-card" hoverable style={{ height: '100%' }}>
              <UserOutlined className="feature-icon" style={{ color: '#1890ff' }} />
              <Title level={4}>O'quvchilar Uchun</Title>
              <Paragraph style={{ minHeight: '60px' }}>
                Kurslarga yoziling, topshiriqlarni bajaring va akademik yutuqlaringizni kuzating.
              </Paragraph>
              <ul className="feature-list">
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Mavjud kurslarni ko'rish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Topshiriqlarni topshirish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Baholar va fikr-mulohazalar</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> O'z natijalarini kuzatish</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card className="feature-card" hoverable style={{ height: '100%' }}>
              <BookOutlined className="feature-icon" style={{ color: '#52c41a' }} />
              <Title level={4}>O'qituvchilar Uchun</Title>
              <Paragraph style={{ minHeight: '60px' }}>
                Kurslarni yarating, topshiriqlarni boshqaring va o'quvchilarni samarali baholang.
              </Paragraph>
              <ul className="feature-list">
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Kurslar yaratish va boshqarish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Uy vazifalarini berish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Topshiriqlarni baholash</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> O'quvchilar jarayonini kuzatish</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card className="feature-card" hoverable style={{ height: '100%' }}>
              <SafetyOutlined className="feature-icon" style={{ color: '#722ed1' }} />
              <Title level={4}>Administratorlar Uchun</Title>
              <Paragraph style={{ minHeight: '60px' }}>
                Butun ta'lim boshqaruv tizimi ustidan to'liq nazorat.
              </Paragraph>
              <ul className="feature-list">
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Foydalanuvchilarni boshqarish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Barcha kurslarni nazorat qilish</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Tizim sozlamalari</li>
                <li><CheckCircleOutlined style={{ color: '#52c41a' }} /> Hisobotlar va tahlillar</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <Title level={2}>Boshlashga Tayyormisiz?</Title>
          <Paragraph style={{ fontSize: 18, marginBottom: 32 }}>
            Minglab o'quvchi va o'qituvchilar platformamizdan foydalanmoqda
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltOutlined />}
            onClick={() => navigate('/register')}
            style={{ height: 50, fontSize: 18, padding: '0 40px' }}
          >
            Bepul Boshlash
          </Button>
        </section>
      )}
    </div>
  );
}

