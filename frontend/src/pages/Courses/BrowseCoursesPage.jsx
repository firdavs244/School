import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, enrollInCourse, getCurrentUser } from '../../api';
import { ROUTES } from '../../routes';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Tag,
  Empty,
  Spin,
  Typography,
  Space,
  message,
} from 'antd';
import {
  BookOutlined,
  SearchOutlined,
  UserOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

export default function BrowseCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  const loadData = async () => {
    try {
      const [userData, coursesData] = await Promise.all([
        getCurrentUser(),
        getCourses()
      ]);
      setUser(userData);
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user) return;

    setEnrolling(courseId);
    try {
      await enrollInCourse(user.id, courseId);
      message.success('Kursga muvaffaqiyatli yozildingiz!');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.message);
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>Kurslar yuklanmoqda...</Paragraph>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <BookOutlined /> Barcha Kurslar
        </Title>
        <Button onClick={() => navigate('/dashboard')}>Orqaga</Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Search
          placeholder="Kurs nomi bo'yicha qidiring..."
          allowClear
          size="large"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 600 }}
        />
      </Card>

      {filteredCourses.length === 0 ? (
        <Card>
          <Empty description="Kurslar topilmadi" />
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <Card
                hoverable
                style={{ height: '100%', minHeight: '320px' }}
                bodyStyle={{
                  height: 'calc(100% - 118px)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px'
                }}
                title={
                  <Space style={{ width: '100%' }}>
                    <BookOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>{course.title}</span>
                  </Space>
                }
                extra={<Tag color="blue">ID: {course.id}</Tag>}
                actions={[
                  <Button
                    key="enroll"
                    type="primary"
                    icon={<CheckOutlined />}
                    loading={enrolling === course.id}
                    onClick={() => handleEnroll(course.id)}
                    size="large"
                    style={{ width: '90%', margin: '8px auto' }}
                  >
                    Kursga Yozilish
                  </Button>
                ]}
              >
                <Space orientation="vertical" style={{ width: '100%', height: '100%' }}>
                  <Paragraph
                    ellipsis={{ rows: 4 }}
                    style={{
                      marginBottom: 16,
                      minHeight: '88px',
                      fontSize: '14px',
                      lineHeight: '22px'
                    }}
                  >
                    {course.description || 'Tavsif mavjud emas'}
                  </Paragraph>
                  <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                    <Space>
                      <UserOutlined style={{ color: '#1890ff' }} />
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        O'qituvchi ID: {course.teacher_id}
                      </span>
                    </Space>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

