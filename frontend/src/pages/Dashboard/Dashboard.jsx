import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCourses, getMyCourses } from '../../api';
import { ROUTES } from '../../routes';
import { getRoleColor, getRoleLabel } from '../../utils';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  Typography,
  Empty,
  Spin,
  Alert,
  Tag,
} from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  PlusOutlined,
  FileTextOutlined,
  EyeOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import '../../styles/pages/Dashboard.css';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);

      if (userData.role === 'student') {
        const enrolledCourses = await getMyCourses();
        setCourses(enrolledCourses);
      } else {
        const allCourses = await getCourses();
        setCourses(allCourses);
      }
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401') || err.message.includes('credentials')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'red',
      teacher: 'green',
      student: 'blue',
    };
    return colors[role] || 'blue';
  };

  const getRoleText = (role) => {
    const roles = {
      admin: 'Administrator',
      teacher: 'O\'qituvchi',
      student: 'O\'quvchi'
    };
    return roles[role] || role;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>Yuklanmoqda...</Paragraph>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Alert title="Xatolik" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <Card className="welcome-card">
        <Row align="middle">
          <Col flex="auto">
            <Space orientation="vertical" size="small">
              <Title level={3} style={{ margin: 0 }}>
                Xush kelibsiz, {user?.full_name}! 👋
              </Title>
              <Tag color={getRoleColor(user?.role)} style={{ fontSize: 14 }}>
                {getRoleText(user?.role)}
              </Tag>
            </Space>
          </Col>
          <Col>
            <DashboardOutlined style={{ fontSize: 64, color: '#1890ff', opacity: 0.3 }} />
          </Col>
        </Row>
      </Card>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={user?.role === 'student' ? 'Mening Kurslarim' : 'Jami Kurslar'}
              value={courses.length}
              prefix={<BookOutlined />}
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tugallangan"
              value={0}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Jarayonda"
              value={0}
              prefix={<ClockCircleOutlined />}
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Topshiriqlar"
              value={0}
              prefix={<BarChartOutlined />}
              styles={{ content: { color: '#722ed1' } }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card
        title={<><SettingOutlined /> Tezkor Harakatlar</>}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {user?.role === 'student' && (
            <>
              <Col xs={24} sm={12} md={8}>
                <Button
                  type="primary"
                  size="large"
                  icon={<BookOutlined />}
                  block
                  onClick={() => navigate('/browse-courses')}
                >
                  Kurslarni Ko'rish
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Button
                  size="large"
                  icon={<FileTextOutlined />}
                  block
                  onClick={() => navigate('/my-assignments')}
                >
                  Topshiriqlarim
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Button
                  size="large"
                  icon={<BarChartOutlined />}
                  block
                  onClick={() => navigate('/my-grades')}
                >
                  Baholarim
                </Button>
              </Col>
            </>
          )}

          {user?.role === 'teacher' && (
            <>
              <Col xs={24} sm={12} md={6}>
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => navigate('/create-course')}
                >
                  Yangi Kurs
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button
                  size="large"
                  icon={<FileTextOutlined />}
                  block
                  onClick={() => navigate('/create-assignment')}
                >
                  Topshiriq Yaratish
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button
                  size="large"
                  icon={<EyeOutlined />}
                  block
                  onClick={() => navigate('/view-submissions')}
                >
                  Topshiriqlarni Ko'rish
                </Button>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button
                  size="large"
                  icon={<BookOutlined />}
                  block
                  onClick={() => navigate('/browse-courses')}
                >
                  Barcha Kurslar
                </Button>
              </Col>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  type="primary"
                  danger
                  size="large"
                  icon={<UserOutlined />}
                  block
                  onClick={() => navigate('/manage-users')}
                >
                  Foydalanuvchilar
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  type="primary"
                  size="large"
                  icon={<BookOutlined />}
                  block
                  onClick={() => navigate('/manage-courses')}
                >
                  Kurslar
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  size="large"
                  icon={<FileTextOutlined />}
                  block
                  onClick={() => navigate('/manage-assignments')}
                >
                  Topshiriqlar
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  size="large"
                  icon={<EyeOutlined />}
                  block
                  onClick={() => navigate('/view-submissions')}
                >
                  Barcha Javoblar
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  size="large"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => navigate('/create-course')}
                >
                  Kurs Yaratish
                </Button>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Button
                  size="large"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => navigate('/create-assignment')}
                >
                  Topshiriq Yaratish
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card>

      {/* Courses Section */}
      <Card title={<><BookOutlined /> {user?.role === 'student' ? 'Mening Kurslarim' : 'Kurslar'}</>}>
        {courses.length === 0 ? (
          <Empty
            description={
              user?.role === 'student'
                ? 'Kurslarni ko\'rish va yozilish uchun yuqoridagi tugmadan foydalaning'
                : 'Yangi kurs yaratish uchun yuqoridagi tugmani bosing'
            }
          />
        ) : (
          <Row gutter={[24, 24]}>
            {courses.map((course) => (
              <Col xs={24} sm={12} lg={8} key={course.id}>
                <Card
                  hoverable
                  style={{ height: '100%', minHeight: '240px' }}
                  bodyStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px'
                  }}
                >
                  <Space orientation="vertical" style={{ width: '100%', height: '100%' }}>
                    <Title level={5} style={{ margin: 0, color: '#1890ff', fontSize: '16px' }}>
                      <BookOutlined /> {course.title || course.course?.title}
                    </Title>
                    <Paragraph
                      ellipsis={{ rows: 3 }}
                      style={{
                        marginBottom: 8,
                        minHeight: '66px',
                        fontSize: '14px',
                        lineHeight: '22px'
                      }}
                    >
                      {course.description || course.course?.description || 'Tavsif yo\'q'}
                    </Paragraph>
                    <div style={{ paddingTop: 12, marginTop: 'auto', borderTop: '1px solid #f0f0f0' }}>
                      <Space orientation="vertical" style={{ width: '100%' }} size="small">
                        <span style={{ color: '#666', fontSize: '13px' }}>
                          <UserOutlined /> O'qituvchi #{course.teacher_id || course.course?.teacher_id}
                        </span>
                        <span style={{ color: '#999', fontSize: '12px' }}>
                          ID: {course.id}
                        </span>
                      </Space>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </div>
  );
}

