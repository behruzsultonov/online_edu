import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SubscriptionCard from '../components/SubscriptionCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Button,
  Space,
  Progress,
  Collapse,
  Tag,
  Avatar,
  Rate,
  Breadcrumb,
  Divider,
  List,
  Badge
} from 'antd';
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
  StarFilled,
  CheckCircleOutlined,
  LockOutlined,
  HomeOutlined,
  LogoutOutlined,
  ExpandAltOutlined,
  CompressOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'video' | 'text' | 'quiz' | 'practice';
}

interface CourseSection {
  id: number;
  title: string;
  lessons: Lesson[];
  totalDuration: string;
  completed: number;
  total: number;
}

// Mock course data
const mockCourse: {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  totalDuration: string;
  totalLessons: number;
  totalSections: number;
  description: string;
  image: string;
  progress: number;
  sections: CourseSection[];
} = {
  id: 1,
  title: 'Полный курс по JavaScript + React - с нуля до результата',
  instructor: 'Иван Петриченко',
  rating: 4.8,
  students: 18290,
  totalDuration: '72 ч 48 мин',
  totalLessons: 360,
  totalSections: 17,
  description: 'Изучите современный JavaScript и React с нуля. Создавайте интерактивные веб-приложения и станьте востребованным разработчиком.',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
  progress: 15,
  sections: [
    {
      id: 1,
      title: 'Введение',
      totalDuration: '5 мин',
      completed: 3,
      total: 3,
      lessons: [
        { id: 1, title: 'Введение', duration: '02:38', completed: true, locked: false, type: 'video' as const },
        { id: 2, title: 'ВАЖНО! ЧАВО - Часто задаваемые ВОпросы', duration: '01:41', completed: true, locked: false, type: 'text' as const },
        { id: 3, title: 'Заметка к заданиям', duration: '00:42', completed: true, locked: false, type: 'text' as const }
      ]
    },
    {
      id: 2,
      title: 'Основы JavaScript',
      totalDuration: '9 ч 41 мин',
      completed: 12,
      total: 53,
      lessons: [
        { id: 4, title: 'Переменные и типы данных', duration: '15:30', completed: true, locked: false, type: 'video' as const },
        { id: 5, title: 'Операторы и выражения', duration: '12:45', completed: true, locked: false, type: 'video' as const },
        { id: 6, title: 'Тест: Основы JavaScript', duration: '10:00', completed: false, locked: false, type: 'quiz' as const },
        { id: 7, title: 'Условные конструкции', duration: '18:20', completed: false, locked: false, type: 'video' as const },
        { id: 8, title: 'Циклы', duration: '22:15', completed: false, locked: false, type: 'video' as const },
        { id: 9, title: 'Практическое задание', duration: '00:00', completed: false, locked: false, type: 'practice' as const }
      ]
    },
    {
      id: 3,
      title: 'Необходимые Скиллы Разработчика',
      totalDuration: '3 ч 5 мин',
      completed: 0,
      total: 10,
      lessons: [
        { id: 9, title: 'Git и GitHub', duration: '25:30', completed: false, locked: true, type: 'video' as const },
        { id: 10, title: 'Работа с командной строкой', duration: '15:20', completed: false, locked: true, type: 'video' as const }
      ]
    },
    {
      id: 4,
      title: 'Ускоренный курс HTML & CSS',
      totalDuration: '1 ч 28 мин',
      completed: 0,
      total: 5,
      lessons: [
        { id: 11, title: 'Основы HTML', duration: '20:15', completed: false, locked: true, type: 'video' as const },
        { id: 12, title: 'CSS стили и селекторы', duration: '18:30', completed: false, locked: true, type: 'video' as const }
      ]
    },
    {
      id: 5,
      title: 'Основы DOM',
      totalDuration: '4 ч 23 мин',
      completed: 0,
      total: 18,
      lessons: [
        { id: 13, title: 'Что такое DOM', duration: '12:45', completed: false, locked: true, type: 'video' as const },
        { id: 14, title: 'Селекторы элементов', duration: '16:20', completed: false, locked: true, type: 'video' as const }
      ]
    }
  ]
};

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['1', '2']);
  const [showAllSections, setShowAllSections] = useState(false);
  const [courseData, setCourseData] = useState(mockCourse);

  const toggleLessonCompletion = (sectionId: number, lessonId: number) => {
    setCourseData(prevData => {
      const newData = { ...prevData };
      newData.sections = newData.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map(lesson => {
              if (lesson.id === lessonId && !lesson.locked) {
                return { ...lesson, completed: !lesson.completed };
              }
              return lesson;
            })
          };
        }
        return section;
      });
      
      // Recalculate section completion
      newData.sections = newData.sections.map(section => {
        const completed = section.lessons.filter(l => l.completed).length;
        return { ...section, completed };
      });
      
      // Recalculate overall progress
      const totalCompleted = newData.sections.reduce((acc, section) => acc + section.completed, 0);
      newData.progress = Math.round((totalCompleted / newData.totalLessons) * 100);
      
      return newData;
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
      case 'text': return <FileTextOutlined style={{ color: '#52c41a' }} />;
      case 'quiz': return <BookOutlined style={{ color: '#faad14' }} />;
      case 'practice': return <BookOutlined style={{ color: '#f5222d' }} />;
      default: return <PlayCircleOutlined />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Видео';
      case 'text': return 'Теория';
      case 'quiz': return 'Тест';
      case 'practice': return 'Практика';
      default: return 'Урок';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'blue';
      case 'text': return 'green';
      case 'quiz': return 'orange';
      case 'practice': return 'red';
      default: return 'default';
    }
  };

  const handleExpandAll = () => {
    if (showAllSections) {
      setExpandedSections(['1', '2']);
      setShowAllSections(false);
    } else {
      setExpandedSections(courseData.sections.map(s => s.id.toString()));
      setShowAllSections(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
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

      <Layout>
        <Sider width={350} style={{ backgroundColor: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: 16 }}>
            <SubscriptionCard compact={true} />
          </div>
          <Divider style={{ margin: '16px 0' }} />
          <div style={{ padding: '0 16px 16px' }}>
            <Title level={5} style={{ marginBottom: 16 }}>Прогресс курса</Title>
            <Progress 
              percent={courseData.progress} 
              strokeColor="#52c41a"
              format={(percent) => `${percent}%`}
              style={{ marginBottom: 16 }}
            />
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text type="secondary">
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                Завершено: {Math.round(courseData.totalLessons * courseData.progress / 100)} из {courseData.totalLessons} уроков
              </Text>
              <Text type="secondary">
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                Общая продолжительность: {courseData.totalDuration}
              </Text>
            </Space>
          </div>
        </Sider>

        <Content style={{ padding: 24 }}>
          <div style={{ maxWidth: 1200 }}>
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: 24 }}>
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
              <Breadcrumb.Item>
                <Button 
                  type="link" 
                  onClick={() => navigate('/courses')} 
                  style={{ 
                    padding: 0, 
                    height: 'auto', 
                    lineHeight: 'inherit',
                    fontSize: 'inherit'
                  }}
                >
                  Все курсы
                </Button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Детали курса</Breadcrumb.Item>
            </Breadcrumb>

            {/* Course Header */}
            <Card style={{ marginBottom: 24 }}>
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={8}>
                  <img 
                    src={mockCourse.image} 
                    alt={mockCourse.title}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                </Col>
                <Col xs={24} lg={16}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <Title level={2} style={{ marginBottom: 8 }}>
                        {mockCourse.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 16 }}>
                        Преподаватель: {mockCourse.instructor}
                      </Text>
                    </div>

                    <div>
                      <Space size={24}>
                        <Space>
                          <Rate disabled value={5} style={{ fontSize: 16 }} />
                          <Text strong>{mockCourse.rating}</Text>
                          <Text type="secondary">({mockCourse.students.toLocaleString()} студентов)</Text>
                        </Space>
                        <Space>
                          <ClockCircleOutlined />
                          <Text>{mockCourse.totalDuration}</Text>
                        </Space>
                        <Space>
                          <BookOutlined />
                          <Text>{mockCourse.totalLessons} уроков</Text>
                        </Space>
                      </Space>
                    </div>

                    <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                      {mockCourse.description}
                    </Paragraph>

                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<PlayCircleOutlined />}
                      style={{ borderRadius: 8 }}
                    >
                      Продолжить обучение
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Course Materials */}
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={3} style={{ margin: 0 }}>Материалы курса</Title>
                  <Button 
                    type="link" 
                    icon={showAllSections ? <CompressOutlined /> : <ExpandAltOutlined />}
                    onClick={handleExpandAll}
                    style={{ color: '#722ed1' }}
                  >
                    {showAllSections ? 'Свернуть все разделы' : 'Развернуть все разделы'}
                  </Button>
                </div>
              }
              style={{ marginBottom: 24 }}
            >
              <div style={{ marginBottom: 16 }}>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {mockCourse.totalSections} разделов • {mockCourse.totalLessons} лекций • Общая продолжительность {mockCourse.totalDuration}
                </Text>
              </div>

              <Collapse 
                activeKey={expandedSections}
                onChange={(keys) => setExpandedSections(keys as string[])}
                style={{ backgroundColor: '#fff' }}
              >
                {courseData.sections.map((section) => (
                  <Panel
                    key={section.id.toString()}
                    header={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Title level={5} style={{ margin: 0 }}>
                            {section.title}
                          </Title>
                          <Progress
                            type="circle"
                            size={24}
                            percent={Math.round((section.completed / section.total) * 100)}
                            format={() => ''}
                            strokeWidth={8}
                          />
                        </div>
                        <Text type="secondary">
                          {section.total} лекций • {section.totalDuration}
                        </Text>
                      </div>
                    }
                  >
                    <List
                      dataSource={section.lessons}
                      renderItem={(lesson, index) => (
                        <List.Item
                          style={{
                            padding: '12px 0',
                            borderBottom: index === section.lessons.length - 1 ? 'none' : '1px solid #f0f0f0',
                            cursor: lesson.locked ? 'default' : 'pointer'
                          }}
                          onClick={() => {
                            if (!lesson.locked) {
                              if (lesson.type === 'video' || lesson.type === 'text' || lesson.type === 'quiz') {
                                navigate(`/lesson/${lesson.id}`);
                              } else if (lesson.type === 'practice') {
                                toggleLessonCompletion(section.id, lesson.id);
                              }
                            }
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {lesson.completed ? (
                                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                              ) : lesson.locked ? (
                                <LockOutlined style={{ color: '#d9d9d9' }} />
                              ) : (
                                getTypeIcon(lesson.type)
                              )}
                              <Text 
                                style={{ 
                                  color: lesson.locked ? '#d9d9d9' : lesson.completed ? '#52c41a' : 'inherit'
                                }}
                              >
                                {lesson.title}
                              </Text>
                              <Tag 
                                color={getTypeColor(lesson.type)} 
                                style={{ 
                                  fontSize: '10px', 
                                  padding: '2px 6px',
                                  opacity: lesson.locked ? 0.5 : 1
                                }}
                              >
                                {getTypeLabel(lesson.type)}
                              </Tag>
                            </div>
                            <Text type="secondary">{lesson.duration}</Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CourseDetailPage;