import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Card,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TeamOutlined,
  CrownOutlined,
  BookOutlined,
} from '@ant-design/icons';
import './ManageUsersPage.css';

const { Option } = Select;

export default function ManageUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/users/', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      message.error('Foydalanuvchilarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    });
    setModalVisible(true);
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        message.success('Foydalanuvchi o\'chirildi');
        loadUsers();
      } else {
        message.error('O\'chirishda xatolik');
      }
    } catch (err) {
      message.error('O\'chirishda xatolik');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const url = editingUser
        ? `http://localhost:8000/users/${editingUser.id}`
        : 'http://localhost:8000/users/register';

      const res = await fetch(url, {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        message.success(editingUser ? 'Yangilandi' : 'Yaratildi');
        setModalVisible(false);
        form.resetFields();
        setEditingUser(null);
        loadUsers();
      } else {
        message.error('Xatolik yuz berdi');
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
      title: 'To\'liq ism',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text) => (
        <Space>
          <UserOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const colors = {
          admin: 'red',
          teacher: 'green',
          student: 'blue',
        };
        const labels = {
          admin: 'Administrator',
          teacher: 'O\'qituvchi',
          student: 'O\'quvchi',
        };
        return <Tag color={colors[role]}>{labels[role]}</Tag>;
      },
    },
    {
      title: 'Amallar',
      key: 'actions',
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

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><TeamOutlined /> Foydalanuvchilarni Boshqarish</h1>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Yangi Foydalanuvchi
          </Button>
          <Button onClick={() => navigate('/dashboard')}>Orqaga</Button>
        </Space>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Jami"
              value={stats.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="O'quvchilar"
              value={stats.students}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="O'qituvchilar"
              value={stats.teachers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Administratorlar"
              value={stats.admins}
              prefix={<CrownOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Jami ${total} ta`,
          }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Foydalanuvchini Tahrirlash' : 'Yangi Foydalanuvchi'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="full_name"
            label="To'liq ism"
            rules={[{ required: true, message: 'Ism kiriting!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ism Familiya" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email kiriting!' },
              { type: 'email', message: 'To\'g\'ri email kiriting!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="email@example.com" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Parol"
              rules={[{ required: true, message: 'Parol kiriting!' }]}
            >
              <Input.Password placeholder="Parol" />
            </Form.Item>
          )}

          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: 'Rol tanlang!' }]}
          >
            <Select placeholder="Rolni tanlang">
              <Option value="student">O'quvchi</Option>
              <Option value="teacher">O'qituvchi</Option>
              <Option value="admin">Administrator</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalVisible(false)}>Bekor qilish</Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Yangilash' : 'Yaratish'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

