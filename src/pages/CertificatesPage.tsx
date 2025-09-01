import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  Tag,
  Progress,
  Breadcrumb,
  Empty,
  Avatar,
  Divider
} from 'antd';
import {
  TrophyOutlined,
  DownloadOutlined,
  EyeOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;

// Mock certificates data
const mockCertificates = [
  {
    id: 1,
    courseName: 'Современный JavaScript - с Нуля до Junior Специалиста',
    issueDate: '2024-08-15',
    progress: 100,
    certificateNumber: 'EDU-JS-2024-001',
    status: 'issued',
    instructor: 'Yury Aliashkevich',
    duration: '10 часов',
    skills: ['JavaScript', 'ES6', 'DOM', 'Async/Await']
  },
  {
    id: 2,
    courseName: 'Python-разработчик + ИИ',
    issueDate: null,
    progress: 75,
    certificateNumber: null,
    status: 'in_progress',
    instructor: 'Skillbox Team',
    duration: '6 месяцев',
    skills: ['Python', 'Machine Learning', 'AI', 'Data Science']
  },
  {
    id: 3,
    courseName: 'Excel + Google Таблицы с нуля до PRO',
    issueDate: null,
    progress: 45,
    certificateNumber: null,
    status: 'in_progress',
    instructor: 'Data Expert',
    duration: '8 месяцев',
    skills: ['Excel', 'Google Sheets', 'Data Analysis', 'Formulas']
  }
];

const CertificatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [certificates] = useState(mockCertificates);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'success';
      case 'in_progress':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'issued':
        return 'Выдан';
      case 'in_progress':
        return 'В процессе';
      default:
        return 'Не начат';
    }
  };

  const CertificateCard = ({ certificate }: { certificate: any }) => (
    <Card
      style={{ marginBottom: 16 }}
      actions={
        certificate.status === 'issued'
          ? [
              <Button key="view" type="link" icon={<EyeOutlined />}>
                Посмотреть
              </Button>,
              <Button key="download" type="link" icon={<DownloadOutlined />}>
                Скачать PDF
              </Button>
            ]
          : [
              <Button key="continue" type="link" onClick={() => navigate(`/course/${certificate.id}`)}>
                Продолжить курс
              </Button>
            ]
      }
    >
      <Row gutter={16}>
        <Col flex="auto">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Title level={4} style={{ margin: 0, flex: 1 }}>
                {certificate.courseName}
              </Title>
              <Tag color={getStatusColor(certificate.status)}>
                {getStatusText(certificate.status)}
              </Tag>
            </div>
            
            <Text type="secondary">
              Преподаватель: {certificate.instructor}
            </Text>
            
            <Space size="large">
              <Space size="small">
                <ClockCircleOutlined />
                <Text type="secondary">{certificate.duration}</Text>
              </Space>
              
              {certificate.issueDate && (
                <Space size="small">
                  <CalendarOutlined />
                  <Text type="secondary">
                    Выдан: {new Date(certificate.issueDate).toLocaleDateString('ru-RU')}
                  </Text>
                </Space>
              )}
              
              {certificate.certificateNumber && (
                <Text type="secondary">
                  № {certificate.certificateNumber}
                </Text>
              )}
            </Space>

            <div style={{ marginTop: 12 }}>
              <Text strong>Прогресс: {certificate.progress}%</Text>
              <Progress 
                percent={certificate.progress} 
                status={certificate.progress === 100 ? 'success' : 'active'}
                style={{ marginTop: 4 }}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <Text type="secondary" style={{ marginRight: 8 }}>Навыки:</Text>
              <Space wrap>
                {certificate.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </Space>
            </div>
          </Space>
        </Col>
        
        <Col flex="none">
          <div style={{ textAlign: 'center' }}>
            <TrophyOutlined 
              style={{ 
                fontSize: 48, 
                color: certificate.status === 'issued' ? '#faad14' : '#d9d9d9' 
              }} 
            />
          </div>
        </Col>
      </Row>
    </Card>
  );

  const issuedCertificates = certificates.filter(cert => cert.status === 'issued');
  const inProgressCertificates = certificates.filter(cert => cert.status === 'in_progress');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title 
              level={3} 
              style={{ 
                margin: 0, 
                color: '#1890ff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/')}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#40a9ff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1890ff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              🎓 EduPlatform
            </Title>
          </Col>
          <Col>
            <Space>
              <LanguageSwitcher variant="dropdown" size="small" showLabel={false} />
              <Tag color="green" style={{ fontSize: '12px', padding: '4px 8px' }}>
                {t('subscription.active')}
              </Tag>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.name || t('auth.user', { defaultValue: 'Пользователь' })}</span>
              <Button type="text" danger icon={<LogoutOutlined />} onClick={logout}>
                {t('navigation.logout')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Button 
                  type="link" 
                  onClick={() => navigate('/')} 
                  style={{ 
                    padding: 0, 
                    height: 'auto', 
                    lineHeight: 'inherit',
                    fontSize: 'inherit'
                  }}
                >
                  Главная
                </Button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Сертификаты</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <TrophyOutlined style={{ fontSize: 64, color: '#faad14', marginBottom: 16 }} />
            <Title level={2}>Мои сертификаты</Title>
            <Paragraph type="secondary" style={{ fontSize: 16 }}>
              Здесь отображаются все ваши сертификаты о прохождении курсов
            </Paragraph>
          </div>

          {/* Statistics */}
          <Row gutter={16} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center' }}>
                <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>
                  {issuedCertificates.length}
                </Title>
                <Text type="secondary">Получено сертификатов</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>
                  {inProgressCertificates.length}
                </Title>
                <Text type="secondary">В процессе получения</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: 32, color: '#faad14', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>
                  {certificates.reduce((acc, cert) => acc + cert.skills.length, 0)}
                </Title>
                <Text type="secondary">Изученных навыков</Text>
              </Card>
            </Col>
          </Row>

          {/* Issued Certificates */}
          {issuedCertificates.length > 0 && (
            <>
              <Title level={3} style={{ marginBottom: 16 }}>
                Полученные сертификаты
              </Title>
              {issuedCertificates.map(certificate => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
              <Divider />
            </>
          )}

          {/* In Progress Certificates */}
          {inProgressCertificates.length > 0 && (
            <>
              <Title level={3} style={{ marginBottom: 16 }}>
                Сертификаты в процессе получения
              </Title>
              {inProgressCertificates.map(certificate => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </>
          )}

          {/* Empty State */}
          {certificates.length === 0 && (
            <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Empty
                image={<TrophyOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
                description={
                  <span>
                    У вас пока нет сертификатов<br />
                    Начните изучение курсов, чтобы получить свой первый сертификат!
                  </span>
                }
              >
                <Button type="primary" size="large" onClick={() => navigate('/courses')}>
                  Перейти к курсам
                </Button>
              </Empty>
            </Card>
          )}

          {/* Information Card */}
          <Card style={{ marginTop: 32, backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Title level={4} style={{ color: '#389e0d', marginBottom: 12 }}>
              Как получить сертификат?
            </Title>
            <Paragraph style={{ marginBottom: 8 }}>
              • Завершите все уроки курса с прогрессом 100%
            </Paragraph>
            <Paragraph style={{ marginBottom: 8 }}>
              • Пройдите итоговое тестирование с результатом не менее 80%
            </Paragraph>
            <Paragraph style={{ marginBottom: 8 }}>
              • Выполните практические задания (если предусмотрены)
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              • Сертификат будет автоматически выдан и доступен для скачивания
            </Paragraph>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default CertificatesPage;