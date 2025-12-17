import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getAuthHeaders, submitAssignment, getAssignment } from '../../api';
import { ROUTES } from '../../routes';
import { formatDate, isOverdue } from '../../utils';
import { Form, Input, Button, Card, Typography, Space, Alert, message } from 'antd';
import { FileTextOutlined, SendOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function SubmitAssignmentPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  const loadAssignment = async () => {
    try {
      const res = await fetch(`http://localhost:8000/assignments/${assignmentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!res.ok) throw new Error('Topshiriq topilmadi');

      const data = await res.json();
      setAssignment(data);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/submissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          assignment_id: parseInt(assignmentId),
          content: values.content
        })
      });

      if (!res.ok) throw new Error('Topshirishda xatolik');

      message.success('Topshiriq muvaffaqiyatli topshirildi!');
      navigate('/my-assignments');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!assignment) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <FileTextOutlined /> Topshiriq Topshirish
        </Title>
        <Button onClick={() => navigate('/my-assignments')}>Orqaga</Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Title level={4}>{assignment.title}</Title>
          <Paragraph>{assignment.description || 'Tavsif yo\'q'}</Paragraph>
          {assignment.due_date && (
            <Alert
              message={`Muddat: ${new Date(assignment.due_date).toLocaleString('uz-UZ')}`}
              type="warning"
              showIcon
              icon={<ClockCircleOutlined />}
            />
          )}
        </Space>
      </Card>

      <Card>
        <Form
          name="submitAssignment"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="content"
            label="Sizning javobingiz"
            rules={[{ required: true, message: 'Javobingizni kiriting!' }]}
          >
            <TextArea
              rows={10}
              placeholder="Javobingizni bu yerga yozing..."
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<SendOutlined />}
            >
              Topshiriqni Topshirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

