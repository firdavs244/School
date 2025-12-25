import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyGrades } from '../../api';
import { ROUTES } from '../../routes';
import { getGradeColor } from '../../utils';
import {
  Card,
  Row,
  Col,
  Statistic,
  Empty,
  Spin,
  Typography,
  Space,
  Tag,
  message,
} from 'antd';
import {
  BarChartOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function MyGradesPage() {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await getMyGrades();
      setGrades(data);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 75) return 'blue';
    if (score >= 60) return 'orange';
    return 'red';
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.score, 0);
    return (sum / grades.length).toFixed(1);
  };

  const getHighestScore = () => {
    if (grades.length === 0) return 0;
    return Math.max(...grades.map(g => g.score));
  };

  const getLowestScore = () => {
    if (grades.length === 0) return 0;
    return Math.min(...grades.map(g => g.score));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>Baholar yuklanmoqda...</Paragraph>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <BarChartOutlined /> Mening Baholarim
        </Title>
        <button className="ant-btn" onClick={() => navigate('/dashboard')}>Orqaga</button>
      </div>

      {grades.length === 0 ? (
        <Card>
          <Empty description="O'qituvchi baholash bajarib bo'lgandan so'ng bu yerda ko'rinadi" />
        </Card>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="O'rtacha Ball"
                  value={calculateAverage()}
                  prefix={<BarChartOutlined />}
                  styles={{ content: { color: '#1890ff' } }}
                  suffix="/ 100"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Eng Yuqori"
                  value={getHighestScore()}
                  prefix={<TrophyOutlined />}
                  styles={{ content: { color: '#52c41a' } }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Eng Past"
                  value={getLowestScore()}
                  prefix={<FallOutlined />}
                  styles={{ content: { color: '#faad14' } }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Jami Baholar"
                  value={grades.length}
                  prefix={<CheckCircleOutlined />}
                  styles={{ content: { color: '#722ed1' } }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {grades.map((grade, index) => (
              <Col xs={24} md={12} lg={8} key={grade.id || index}>
                <Card style={{ height: '100%', minHeight: '280px' }}>
                  <Space orientation="vertical" style={{ width: '100%' }} size="large">
                    <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Title level={5} style={{ margin: 0, fontSize: '16px' }}>
                        <BarChartOutlined /> Baho #{index + 1}
                      </Title>
                      <Tag
                        color={getScoreColor(grade.score)}
                        style={{
                          fontSize: '18px',
                          padding: '6px 16px',
                          fontWeight: 'bold',
                          minWidth: '90px',
                          textAlign: 'center'
                        }}
                      >
                        {grade.score}/100
                      </Tag>
                    </Space>

                    {grade.feedback && (
                      <Card
                        size="small"
                        style={{
                          background: '#f0f2f5',
                          border: '1px solid #d9d9d9'
                        }}
                      >
                        <Space orientation="vertical" style={{ width: '100%' }} size="small">
                          <strong style={{ color: '#1890ff', fontSize: '14px' }}>
                            <MessageOutlined /> O'qituvchi fikri:
                          </strong>
                          <Paragraph
                            ellipsis={{ rows: 3 }}
                            style={{
                              margin: 0,
                              fontStyle: 'italic',
                              color: '#666',
                              fontSize: '14px',
                              lineHeight: '20px',
                              minHeight: '60px'
                            }}
                          >
                            {grade.feedback}
                          </Paragraph>
                        </Space>
                      </Card>
                    )}

                    <div style={{ paddingTop: 12, marginTop: 'auto', borderTop: '1px solid #f0f0f0' }}>
                      <Space orientation="vertical" style={{ width: '100%' }} size="small">
                        <span style={{ color: '#666', fontSize: '13px' }}>
                          📅 {new Date(grade.graded_at || Date.now()).toLocaleDateString('uz-UZ')}
                        </span>
                        <span style={{ color: '#999', fontSize: '12px' }}>
                          🆔 Baho ID: {grade.id}
                        </span>
                      </Space>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

