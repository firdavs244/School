import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCourses, getCourseAssignments } from '../../api';
import { ROUTES, createRoute } from '../../routes';
import { isOverdue, getDaysUntilDue, formatDate } from '../../utils';
import {
  Card,
  Row,
  Col,
  Button,
  Tag,
  Empty,
  Spin,
  Typography,
  Space,
  message,
  Alert,
} from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function MyAssignmentsPage() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const courses = await getMyCourses();

      const allAssignments = [];
      for (const enrollment of courses) {
        try {
          const courseAssignments = await getCourseAssignments(enrollment.course_id);
          allAssignments.push(...courseAssignments.map(a => ({
            ...a,
            courseName: enrollment.course?.title || 'Kurs'
          })));
        } catch (err) {
          // Kurs topshiriqlarini olishda xatolik bo'lsa, o'tkazib yuborish
          console.error(`Kurs ${enrollment.course_id} topshiriqlarini olishda xatolik:`, err);
        }
      }

      setAssignments(allAssignments);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>Topshiriqlar yuklanmoqda...</Paragraph>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <FileTextOutlined /> Mening Topshiriqlarim
        </Title>
        <Button onClick={() => navigate('/dashboard')}>Orqaga</Button>
      </div>

      {assignments.length === 0 ? (
        <Card>
          <Empty description="O'qituvchilar topshiriq berganda bu yerda ko'rinadi" />
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {assignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.due_date);
            const overdue = isOverdue(assignment.due_date);

            return (
              <Col xs={24} sm={12} lg={8} key={assignment.id}>
                <Card
                  hoverable
                  style={{ height: '100%', minHeight: '380px' }}
                  bodyStyle={{
                    height: 'calc(100% - 118px)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px'
                  }}
                  title={
                    <Space style={{ width: '100%' }}>
                      <FileTextOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
                      <span style={{ fontWeight: 600, fontSize: '16px' }}>
                        {assignment.title}
                      </span>
                    </Space>
                  }
                  extra={
                    overdue ? (
                      <Tag color="red">Muddati o'tgan</Tag>
                    ) : daysLeft !== null && daysLeft <= 3 ? (
                      <Tag color="orange">Tez topshiring</Tag>
                    ) : (
                      <Tag color="blue">Faol</Tag>
                    )
                  }
                  actions={[
                    <Button
                      key="submit"
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => navigate(`/submit-assignment/${assignment.id}`)}
                      size="large"
                      style={{ width: '90%', margin: '8px auto' }}
                    >
                      Topshirish
                    </Button>
                  ]}
                >
                  <Space orientation="vertical" style={{ width: '100%', height: '100%' }} size="middle">
                    <Tag color="geekblue" style={{ width: 'fit-content', fontSize: '13px' }}>
                      {assignment.courseName}
                    </Tag>

                    <Paragraph
                      ellipsis={{ rows: 3 }}
                      style={{
                        marginBottom: 0,
                        minHeight: '66px',
                        fontSize: '14px',
                        lineHeight: '22px'
                      }}
                    >
                      {assignment.description || 'Tavsif mavjud emas'}
                    </Paragraph>

                    {assignment.due_date && (
                      <Alert
                        style={{ marginTop: 'auto', fontSize: '13px' }}
                        message={
                          overdue
                            ? `Muddati o'tgan: ${new Date(assignment.due_date).toLocaleDateString()}`
                            : daysLeft === 0
                            ? 'Bugun topshirish kerak!'
                            : daysLeft === 1
                            ? 'Ertaga topshirish kerak'
                            : `${daysLeft} kun qoldi: ${new Date(assignment.due_date).toLocaleDateString()}`
                        }
                        type={overdue || daysLeft <= 3 ? 'error' : 'info'}
                        showIcon
                        icon={overdue ? <ExclamationCircleOutlined /> : <ClockCircleOutlined />}
                      />
                    )}
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

