import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getAuthHeaders, createGrade, getSubmission } from '../../api';
import { ROUTES } from '../../routes';
import { Form, InputNumber, Input, Button, Card, Typography, Space, message, Alert } from 'antd';
import { CheckOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function GradeSubmissionPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSubmission();
  }, [submissionId]);

  const loadSubmission = async () => {
    try {
      const res = await fetch(`http://localhost:8000/submissions/${submissionId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setSubmission(data);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const gradeData = {
        enrollment_id: 1, // Simplified - needs proper enrollment lookup
        submission_id: parseInt(submissionId),
        score: parseFloat(values.score),
        feedback: values.feedback
      };

      const res = await fetch('http://localhost:8000/grades/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(gradeData)
      });

      if (!res.ok) throw new Error('Baho berishda xatolik');

      message.success('Baho muvaffaqiyatli berildi!');
      navigate('/view-submissions');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!submission) {
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
          <CheckOutlined /> Topshiriqni Baholash
        </Title>
        <Button onClick={() => navigate('/view-submissions')}>Orqaga</Button>
      </div>

      <Card title="O'quvchi javobi" style={{ marginBottom: 24 }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Alert
            message={`O'quvchi ID: ${submission.student_id}`}
            description={`Topshirilgan: ${new Date(submission.submitted_at).toLocaleString('uz-UZ')}`}
            type="info"
            showIcon
          />
          <Card size="small" style={{ background: '#f0f2f5' }}>
            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {submission.content}
            </Paragraph>
          </Card>
        </Space>
      </Card>

      <Card title="Baho berish">
        <Form
          name="gradeSubmission"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="score"
            label="Ball (0-100)"
            rules={[
              { required: true, message: 'Ballni kiriting!' },
              { type: 'number', min: 0, max: 100, message: '0 dan 100 gacha bo\'lishi kerak!' }
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
              placeholder="Ball kiriting"
            />
          </Form.Item>

          <Form.Item
            name="feedback"
            label="Fikr-mulohaza"
          >
            <TextArea
              rows={4}
              placeholder="O'quvchiga fikr-mulohaza yozing..."
              prefix={<MessageOutlined />}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<CheckOutlined />}
            >
              Bahoni Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

