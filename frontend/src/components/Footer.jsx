import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout, Row, Col, Space, Typography } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AntFooter className="site-footer">
      <div className="footer-container">
        <Row gutter={[32, 32]}>
          {/* About */}
          <Col xs={24} sm={12} lg={6}>
            <Space direction="vertical" size="middle">
              <Title level={4} style={{ color: 'white' }}>
                📚 Online Maktab
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)' }}>
                Zamonaviy onlayn ta'lim platformasi. Bilim olish va o'rgatishning
                eng qulay va samarali usuli.
              </Paragraph>
              <Space size="large">
                <a href="#" className="footer-social-icon">
                  <FacebookOutlined />
                </a>
                <a href="#" className="footer-social-icon">
                  <TwitterOutlined />
                </a>
                <a href="#" className="footer-social-icon">
                  <InstagramOutlined />
                </a>
                <a href="#" className="footer-social-icon">
                  <YoutubeOutlined />
                </a>
              </Space>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white' }}>Tezkor Havolalar</Title>
            <Space direction="vertical">
              <Link to="/" className="footer-link">Bosh sahifa</Link>
              <Link to="/browse-courses" className="footer-link">Kurslar</Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="footer-link">Boshqaruv Paneli</Link>
              ) : (
                <>
                  <Link to="/login" className="footer-link">Kirish</Link>
                  <Link to="/register" className="footer-link">Ro'yxatdan o'tish</Link>
                </>
              )}
            </Space>
          </Col>

          {/* Resources */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white' }}>Resurslar</Title>
            <Space direction="vertical">
              <a href="#" className="footer-link">Yordam markazi</a>
              <a href="#" className="footer-link">Qo'llanma</a>
              <a href="#" className="footer-link">Ko'p so'raladigan savollar</a>
              <a href="#" className="footer-link">Texnik yordam</a>
            </Space>
          </Col>

          {/* Contact */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white' }}>Aloqa</Title>
            <Space direction="vertical">
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                <MailOutlined /> info@onlinemaktab.uz
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                <PhoneOutlined /> +998 (90) 123-45-67
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                <EnvironmentOutlined /> Toshkent, O'zbekiston
              </Text>
            </Space>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                © {currentYear} Online Maktab. Barcha huquqlar himoyalangan.
              </Text>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
              <Space split="|">
                <a href="#" className="footer-link">Maxfiylik siyosati</a>
                <a href="#" className="footer-link">Foydalanish shartlari</a>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
}

