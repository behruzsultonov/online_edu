import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Card, 
  Typography, 
  Avatar, 
  Progress, 
  Tag, 
  Button, 
  Row, 
  Col, 
  Statistic, 
  Timeline,
  Tabs,
  Rate,
  Badge,
  Space,
  Divider,
  List,
  Breadcrumb
} from 'antd';
import {
  UserOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
  CalendarOutlined,
  DownloadOutlined,
  EditOutlined,
  SafetyCertificateOutlined,
  CodeOutlined,
  DesktopOutlined,
  MobileOutlined,
  DatabaseOutlined,
  CloudOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  EyeOutlined,
  ShareAltOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - in real app this would come from API
  const profileData = {
    name: user?.name || 'Пользователь',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+992 00 000 0000',
    avatar: '',
    title: 'Frontend разработчик',
    level: 'Средний',
    totalCourses: 12,
    completedCourses: 8,
    certificates: 5,
    totalHours: 156,
    currentStreak: 15,
    joinDate: '2024-01-15'
  };

  const skills = [
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'React', level: 78, category: 'Framework' },
    { name: 'TypeScript', level: 70, category: 'Programming' },
    { name: 'HTML/CSS', level: 90, category: 'Markup' },
    { name: 'Node.js', level: 65, category: 'Backend' },
    { name: 'Git', level: 80, category: 'Tools' },
    { name: 'Python', level: 60, category: 'Programming' },
    { name: 'SQL', level: 55, category: 'Database' }
  ];

  const recentActivity = [
    {
      date: '2024-01-28',
      action: 'Завершен курс',
      title: 'Advanced React Patterns',
      points: 150
    },
    {
      date: '2024-01-25',
      action: 'Получен сертификат',
      title: 'JavaScript Fundamentals',
      points: 200
    },
    {
      date: '2024-01-22',
      action: 'Завершен проект',
      title: 'E-commerce Dashboard',
      points: 300
    },
    {
      date: '2024-01-20',
      action: 'Изучен урок',
      title: 'Redux Toolkit',
      points: 50
    }
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Полнофункциональная платформа электронной коммерции с React и Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '',
      link: 'https://github.com/username/ecommerce',
      status: 'Завершен',
      date: '2024-01-15'
    },
    {
      title: 'Task Management App',
      description: 'Приложение для управления задачами с функциями совместной работы',
      technologies: ['React', 'TypeScript', 'Firebase'],
      image: '',
      link: 'https://github.com/username/taskapp',
      status: 'В разработке',
      date: '2024-01-10'
    },
    {
      title: 'Weather Dashboard',
      description: 'Панель управления погодой с графиками и прогнозами',
      technologies: ['JavaScript', 'Chart.js', 'API'],
      image: '',
      link: 'https://github.com/username/weather',
      status: 'Завершен',
      date: '2023-12-20'
    }
  ];

  const certificates = [
    {
      title: 'JavaScript Developer Certificate',
      issuer: 'EduPlatform',
      date: '2024-01-25',
      id: 'CERT-JS-2024-001'
    },
    {
      title: 'React Specialist Certificate',
      issuer: 'EduPlatform',
      date: '2024-01-20',
      id: 'CERT-REACT-2024-002'
    },
    {
      title: 'Frontend Basics Certificate',
      issuer: 'EduPlatform',
      date: '2024-01-15',
      id: 'CERT-FE-2024-003'
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return '#52c41a';
    if (level >= 60) return '#1890ff';
    if (level >= 40) return '#faad14';
    return '#f5222d';
  };

  const renderOverview = () => (
    <Row gutter={[24, 24]}>
      {/* Profile Info */}
      <Col span={24}>
        <Card>
          <Row gutter={24} align="middle">
            <Col>
              <Avatar size={100} icon={<UserOutlined />} />
            </Col>
            <Col flex="auto">
              <Title level={2} style={{ margin: 0 }}>{profileData.name}</Title>
              <Text type="secondary" style={{ fontSize: '16px' }}>{profileData.title}</Text>
              <br />
              <Tag color="blue" style={{ marginTop: 8 }}>{profileData.level}</Tag>
              <div style={{ marginTop: 16 }}>
                <Space size="large">
                  <Button icon={<EditOutlined />}>Редактировать профиль</Button>
                  <Button icon={<DownloadOutlined />}>Скачать резюме</Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Statistics */}
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Всего курсов"
                value={profileData.totalCourses}
                prefix={<BookOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Завершено"
                value={profileData.completedCourses}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Сертификаты"
                value={profileData.certificates}
                prefix={<SafetyCertificateOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Часов обучения"
                value={profileData.totalHours}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      </Col>

      {/* Recent Activity */}
      <Col span={24}>
        <Card title="Последняя активность">
          <Timeline>
            {recentActivity.map((activity, index) => (
              <Timeline.Item
                key={index}
                dot={<StarOutlined style={{ fontSize: '16px' }} />}
                color="blue"
              >
                <div>
                  <Text strong>{activity.action}: {activity.title}</Text>
                  <br />
                  <Text type="secondary">{activity.date}</Text>
                  <Tag color="green" style={{ marginLeft: 8 }}>+{activity.points} XP</Tag>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </Col>
    </Row>
  );

  const renderSkills = () => (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title="Технические навыки">
          <Row gutter={[16, 16]}>
            {skills.map((skill, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card size="small">
                  <div style={{ marginBottom: 8 }}>
                    <Text strong>{skill.name}</Text>
                    <Tag style={{ float: 'right' }}>{skill.category}</Tag>
                  </div>
                  <Progress
                    percent={skill.level}
                    strokeColor={getSkillColor(skill.level)}
                    size="small"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      {/* Skill Categories */}
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <CodeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                <Title level={4}>Programming</Title>
                <Text type="secondary">JavaScript, TypeScript, Python</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <DesktopOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                <Title level={4}>Frontend</Title>
                <Text type="secondary">React, HTML/CSS, UI/UX</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <DatabaseOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                <Title level={4}>Backend</Title>
                <Text type="secondary">Node.js, SQL, APIs</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <CloudOutlined style={{ fontSize: '32px', color: '#722ed1' }} />
                <Title level={4}>Tools</Title>
                <Text type="secondary">Git, Docker, AWS</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const renderPortfolio = () => (
    <Row gutter={[24, 24]}>
      {/* Projects */}
      <Col span={24}>
        <Card title="Проекты">
          <Row gutter={[16, 16]}>
            {projects.map((project, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  hoverable
                  cover={
                    <div style={{ 
                      height: 200, 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DesktopOutlined style={{ fontSize: '48px', color: 'white' }} />
                    </div>
                  }
                  actions={[
                    <GithubOutlined key="github" />,
                    <EyeOutlined key="view" />,
                    <ShareAltOutlined key="share" />
                  ]}
                >
                  <Card.Meta
                    title={project.title}
                    description={
                      <div>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {project.description}
                        </Paragraph>
                        <div style={{ marginTop: 8 }}>
                          {project.technologies.map(tech => (
                            <Tag key={tech}>{tech}</Tag>
                          ))}
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Badge 
                            status={project.status === 'Завершен' ? 'success' : 'processing'} 
                            text={project.status} 
                          />
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      {/* Certificates */}
      <Col span={24}>
        <Card title="Сертификаты">
          <List
            dataSource={certificates}
            renderItem={(cert) => (
              <List.Item
                actions={[
                  <Button icon={<DownloadOutlined />} type="link">Скачать</Button>,
                  <Button icon={<EyeOutlined />} type="link">Просмотр</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<SafetyCertificateOutlined style={{ fontSize: '24px', color: '#faad14' }} />}
                  title={cert.title}
                  description={
                    <div>
                      <Text type="secondary">Выдан: {cert.issuer}</Text>
                      <br />
                      <Text type="secondary">Дата: {cert.date}</Text>
                      <br />
                      <Text code>{cert.id}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      {/* Contact Links */}
      <Col span={24}>
        <Card title="Контакты и ссылки">
          <Space size="large" wrap>
            <Button icon={<GithubOutlined />} size="large">
              GitHub
            </Button>
            <Button icon={<LinkedinOutlined />} size="large">
              LinkedIn
            </Button>
            <Button icon={<MailOutlined />} size="large">
              Email
            </Button>
            <Button icon={<DesktopOutlined />} size="large">
              Portfolio
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header style={{ 
        backgroundColor: '#fff', 
        padding: '0 24px', 
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LanguageSwitcher variant="dropdown" size="small" showLabel={false} />
          <Tag color="green" style={{ fontSize: '12px', padding: '4px 8px' }}>
            {t('subscription.active')}
          </Tag>
          <Avatar icon={<UserOutlined />} />
          <span>{user?.name || t('auth.user', { defaultValue: 'Пользователь' })}</span>
          <Button type="text" danger icon={<LogoutOutlined />} onClick={logout}>
            {t('navigation.logout')}
          </Button>
        </div>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 24 }}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Button 
                  type="link" 
                  icon={<HomeOutlined />}
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
              <Breadcrumb.Item>Профиль</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* Back Button */}
          <div style={{ marginBottom: 16 }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
              style={{ marginRight: 16 }}
            >
              Назад
            </Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/courses')}
            >
              Перейти к курсам
            </Button>
          </div>

          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            size="large"
            style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}
          >
            <TabPane tab="Обзор" key="overview">
              {renderOverview()}
            </TabPane>
            <TabPane tab="Навыки" key="skills">
              {renderSkills()}
            </TabPane>
            <TabPane tab="Портфолио" key="portfolio">
              {renderPortfolio()}
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;