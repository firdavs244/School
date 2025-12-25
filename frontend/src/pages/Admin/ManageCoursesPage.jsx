import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../api';
import { ROUTES } from '../../routes';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Card,
  Statistic,
  Row,
  Col,
  Typography,
} from 'antd';
import {
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

export default function ManageCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      message.error('Kurslarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    form.setFieldsValue({
      title: course.title,
      description: course.description,
    });
    setModalVisible(true);
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      message.success('Kurs o\'chirildi');
      loadCourses();
    } catch (err) {
      message.error('O\'chirishda xatolik');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const courseData = {
        ...values,
        teacher_id: editingCourse?.teacher_id || parseInt(localStorage.getItem('user_id'))
      };

      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
        message.success('Kurs yangilandi');
      } else {
        await createCourse(courseData);
        message.success('Kurs yaratildi');
      }

      setModalVisible(false);
      form.resetFields();
      setEditingCourse(null);
      loadCourses();
    } catch (err) {
      message.error('Xatolik yuz berdi');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Kurs nomi',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Space>
          <BookOutlined style={{ color: '#1890ff' }} />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Tavsif',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text) => text || <span style={{ color: '#bfbfbf' }}>Tavsif yo'q</span>,
    },
    {
      title: 'O\'qituvchi ID',
      dataIndex: 'teacher_id',
      key: 'teacher_id',
      width: 150,
      render: (id) => (
        <Space>
          <UserOutlined />
          <span>{id}</span>
        </Space>
      ),
    },
    {
      title: 'Amallar',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Tahrirlash
          </Button>
          <Popconfirm
            title="Kursni o'chirishni tasdiqlaysizmi?"
            description="Bu amalni qaytarib bo'lmaydi!"
            onConfirm={() => handleDelete(record.id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              O'chirish
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <BookOutlined /> Kurslarni Boshqarish
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setEditingCourse(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Yangi Kurs
          </Button>
          <Button size="large" onClick={() => navigate('/dashboard')}>
            Orqaga
          </Button>
        </Space>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Jami Kurslar"
              value={courses.length}
              prefix={<BookOutlined />}
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Faol Kurslar"
              value={courses.length}
              prefix={<CheckCircleOutlined />}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="O'qituvchilar"
              value={new Set(courses.map(c => c.teacher_id)).size}
              prefix={<UserOutlined />}
              styles={{ content: { color: '#722ed1' } }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Jami ${total} ta kurs`,
          }}
          locale={{
            emptyText: 'Hozircha kurslar yo\'q',
          }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <BookOutlined />
            <span>{editingCourse ? 'Kursni Tahrirlash' : 'Yangi Kurs Yaratish'}</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingCourse(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="title"
            label="Kurs nomi"
            rules={[{ required: true, message: 'Kurs nomini kiriting!' }]}
          >
            <Input
              prefix={<BookOutlined />}
              placeholder="Masalan: Python Dasturlash"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Kurs tavsifi"
            rules={[{ required: false }]}
          >
            <TextArea
              rows={4}
              placeholder="Kurs haqida batafsil ma'lumot..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)} size="large">
                Bekor qilish
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                {editingCourse ? 'Yangilash' : 'Yaratish'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

