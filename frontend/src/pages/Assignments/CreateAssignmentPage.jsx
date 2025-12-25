import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, createAssignment } from '../../api';
import { ROUTES } from '../../routes';
import { Form, Input, Button, Card, Typography, Space, Select, DatePicker, message } from 'antd';
import { FileTextOutlined, SaveOutlined, BookOutlined } from '@ant-design/icons';
import '../../styles/pages/Auth.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function CreateAssignmentPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      message.error('Kurslarni yuklashda xatolik');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createAssignment({
        title: values.title,
        description: values.description,
        course_id: parseInt(values.course_id),
        due_date: values.due_date ? values.due_date.toISOString() : null
      });
      message.success('Topshiriq muvaffaqiyatli yaratildi!');
      navigate('/dashboard');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ background: 'linear-gradient(135deg, #faad14 0%, #d48806 100%)' }}>
      <Card className="auth-card" style={{ maxWidth: 700 }}>
        <Space orientation="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div className="auth-icon">
            <FileTextOutlined style={{ fontSize: 64, color: '#faad14' }} />
          </div>

          <div>
            <Title level={2}>Yangi Topshiriq Yaratish</Title>
            <Paragraph type="secondary">O'quvchilar uchun topshiriq bering</Paragraph>
          </div>

          <Form
            name="createAssignment"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ width: '100%', textAlign: 'left' }}
          >
            <Form.Item
              name="course_id"
              label="Kurs"
              rules={[{ required: true, message: 'Kursni tanlang!' }]}
            >
              <Select
                placeholder="Kursni tanlang"
                prefix={<BookOutlined />}
              >
                {courses.map(course => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="title"
              label="Topshiriq nomi"
              rules={[{ required: true, message: 'Topshiriq nomini kiriting!' }]}
            >
              <Input
                prefix={<FileTextOutlined />}
                placeholder="Masalan: Uy vazifasi 1"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Tavsif"
            >
              <TextArea
                rows={4}
                placeholder="Topshiriq haqida batafsil..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              name="due_date"
              label="Topshirish muddati (ixtiyoriy)"
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ width: '100%' }}
                placeholder="Muddatni tanlang"
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
                Topshiriq Yaratish
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

