import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse, getCurrentUser } from '../services/api';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { BookOutlined, SaveOutlined } from '@ant-design/icons';
import './Auth.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [teacherId, setTeacherId] = useState(0);

  useEffect(() => {
    getCurrentUser().then(user => {
      setTeacherId(user.id);
    }).catch(() => {
      navigate('/login');
    });
  }, [navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createCourse({
        ...values,
        teacher_id: teacherId
      });
      message.success('Kurs muvaffaqiyatli yaratildi!');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)' }}>
      <Card className="auth-card" style={{ maxWidth: 700 }}>
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div className="auth-icon">
            <BookOutlined style={{ fontSize: 64, color: '#52c41a' }} />
          </div>

          <div>
            <Title level={2}>Yangi Kurs Yaratish</Title>
            <Paragraph type="secondary">O'quvchilar uchun yangi kurs qo'shing</Paragraph>
          </div>

          <Form
            name="createCourse"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ width: '100%', textAlign: 'left' }}
          >
            <Form.Item
              name="title"
              label="Kurs nomi"
              rules={[{ required: true, message: 'Kurs nomini kiriting!' }]}
            >
              <Input
                prefix={<BookOutlined />}
                placeholder="Masalan: Python Dasturlash"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Kurs tavsifi"
            >
              <TextArea
                rows={4}
                placeholder="Kurs haqida batafsil ma'lumot..."
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
                icon={<SaveOutlined />}
              >
                Kurs Yaratish
              </Button>
            </Form.Item>
          </Form>

          <Button type="text" onClick={() => navigate('/dashboard')}>
            ← Boshqaruv paneliga qaytish
          </Button>
        </Space>
      </Card>
    </div>
  );
}

