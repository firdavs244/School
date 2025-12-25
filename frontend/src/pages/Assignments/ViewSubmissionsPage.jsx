import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, getCourseAssignments, getAssignmentSubmissions } from '../../api';
import { ROUTES, createRoute } from '../../routes';
import {
  Card,
  Select,
  List,
  Button,
  Empty,
  Typography,
  Space,
  Tag,
  message,
  Divider,
} from 'antd';
import {
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function ViewSubmissionsPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAssignments = async (courseId) => {
    try {
      const data = await getCourseAssignments(courseId);
      setAssignments(data);
    } catch (err) {
      message.error(err.message);
    }
  };

  const loadSubmissions = async (assignmentId) => {
    try {
      const data = await getAssignmentSubmissions(assignmentId);
      setSubmissions(data);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedAssignment(null);
    setSubmissions([]);
    loadAssignments(courseId);
  };

  const handleAssignmentChange = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    loadSubmissions(assignmentId);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <FileTextOutlined /> Topshiriqlarni Ko'rish
        </Title>
        <Button onClick={() => navigate('/dashboard')}>Orqaga</Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Space orientation="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              <BookOutlined /> Kursni tanlang:
            </label>
            <Select
              placeholder="Kursni tanlang"
              style={{ width: '100%' }}
              size="large"
              onChange={handleCourseChange}
              value={selectedCourse}
            >
              {courses.map(course => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </div>

          {selectedCourse && (
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                <FileTextOutlined /> Topshiriqni tanlang:
              </label>
              <Select
                placeholder="Topshiriqni tanlang"
                style={{ width: '100%' }}
                size="large"
                onChange={handleAssignmentChange}
                value={selectedAssignment}
              >
                {assignments.map(assignment => (
                  <Option key={assignment.id} value={assignment.id}>
                    {assignment.title}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </Space>
      </Card>

      {selectedAssignment && (
        <Card title={`Topshirilgan javoblar (${submissions.length})`}>
          {submissions.length === 0 ? (
            <Empty description="Hali hech kim topshirmagan" />
          ) : (
            <List
              dataSource={submissions}
              renderItem={(submission) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => navigate(`/grade-submission/${submission.id}`)}
                    >
                      Baholash
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
                    title={
                      <Space>
                        <span>O'quvchi ID: {submission.student_id}</span>
                        <Tag color="blue">{new Date(submission.submitted_at).toLocaleString('uz-UZ')}</Tag>
                      </Space>
                    }
                    description={
                      <div style={{ marginTop: 8 }}>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          <strong>Javob:</strong> {submission.content}
                        </Paragraph>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      )}
    </div>
  );
}

