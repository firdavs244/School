import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../services/api';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Popconfirm,
  Card,
  Tag,
  Typography,
} from 'antd';
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  BookOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function ManageAssignmentsPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [form] = Form.useForm();

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

  const loadAssignments = async (courseId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/assignments/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      message.error('Topshiriqlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    if (courseId) {
      loadAssignments(courseId);
    } else {
      setAssignments([]);
    }
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    form.setFieldsValue({
      title: assignment.title,
      description: assignment.description,
      course_id: assignment.course_id,
      due_date: assignment.due_date ? dayjs(assignment.due_date) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (assignmentId) => {
    try {
      const res = await fetch(`http://localhost:8000/assignments/${assignmentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        message.success('Topshiriq o\'chirildi');
        loadAssignments(selectedCourse);
      }
    } catch (err) {
      message.error('O\'chirishda xatolik');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const url = editingAssignment
        ? `http://localhost:8000/assignments/${editingAssignment.id}`
        : 'http://localhost:8000/assignments/';

      const res = await fetch(url, {
        method: editingAssignment ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...values,
          course_id: parseInt(values.course_id),
          due_date: values.due_date ? values.due_date.toISOString() : null
        })
      });

      if (res.ok) {
        message.success(editingAssignment ? 'Yangilandi' : 'Yaratildi');
        setModalVisible(false);
        form.resetFields();
        setEditingAssignment(null);
        if (selectedCourse) loadAssignments(selectedCourse);
      }
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
      title: 'Topshiriq nomi',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <Space>
          <FileTextOutlined />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Tavsif',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Muddat',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (date) => date ? (
        <Tag color="orange">
          {new Date(date).toLocaleDateString('uz-UZ')}
        </Tag>
      ) : <Tag>Muddatsiz</Tag>,
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
            title="O'chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
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
          <FileTextOutlined /> Topshiriqlarni Boshqarish
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => {
              setEditingAssignment(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Yangi Topshiriq
          </Button>
          <Button size="large" onClick={() => navigate('/dashboard')}>
            Orqaga
          </Button>
        </Space>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <label style={{ fontWeight: 600 }}>
            <BookOutlined /> Kurs bo'yicha filter:
          </label>
          <Select
            placeholder="Barcha kurslar"
            style={{ width: '100%', maxWidth: 400 }}
            size="large"
            onChange={handleCourseChange}
            value={selectedCourse}
            allowClear
          >
            {courses.map(course => (
              <Option key={course.id} value={course.id}>
                {course.title}
              </Option>
            ))}
          </Select>
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={assignments}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Jami ${total} ta topshiriq`,
          }}
          locale={{
            emptyText: 'Topshiriqlar yo\'q',
          }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <FileTextOutlined />
            <span>{editingAssignment ? 'Topshiriqni Tahrirlash' : 'Yangi Topshiriq'}</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingAssignment(null);
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
            name="course_id"
            label="Kurs"
            rules={[{ required: true, message: 'Kursni tanlang!' }]}
          >
            <Select placeholder="Kursni tanlang">
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
            rules={[{ required: true, message: 'Nomni kiriting!' }]}
          >
            <Input placeholder="Masalan: Uy vazifasi 1" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Tavsif"
          >
            <TextArea rows={4} placeholder="Topshiriq haqida..." showCount maxLength={500} />
          </Form.Item>

          <Form.Item
            name="due_date"
            label="Muddat"
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>Bekor qilish</Button>
              <Button type="primary" htmlType="submit">
                {editingAssignment ? 'Yangilash' : 'Yaratish'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

