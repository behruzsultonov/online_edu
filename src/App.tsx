import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n/config'; // Initialize i18n
import { useTranslation } from 'react-i18next';
import PhoneLoginPage from './pages/PhoneLoginPage';
import OnboardingPage from './pages/OnboardingPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import CertificatesPage from './pages/CertificatesPage';
import SubscriptionCard from './components/SubscriptionCard';
import { Typography, Button, Layout, Menu, Avatar, Row, Col, App as AntApp, ConfigProvider, Card, Progress, Rate, Tag, Space } from 'antd';
import { BookOutlined, UserOutlined, LogoutOutlined, TrophyOutlined, PlayCircleOutlined, ClockCircleOutlined, StarOutlined, CalendarOutlined } from '@ant-design/icons';
import './App.css';
import './styles/accessibility.css';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Title level={3}>Загрузка...</Title>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user needs onboarding
  if (user && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// Onboarding Route Component
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Title level={3}>Загрузка...</Title>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user already completed onboarding, redirect to home
  if (user && user.onboardingCompleted) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route Component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Title level={3}>Загрузка...</Title>
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

// Simple Home Page
const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Mock data for dashboard - in real app this would come from API
  const dashboardData = {
    continuelearning: [
      {
        id: 1,
        title: 'JavaScript - Мастер-класс по Веб Разработке',
        progress: 65,
        nextLesson: 'Урок 12: Асинхронное программирование',
        timeLeft: '2 часа 15 минут',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
      },
      {
        id: 2,
        title: 'Python-разработчик + ИИ',
        progress: 30,
        nextLesson: 'Урок 8: Машинное обучение',
        timeLeft: '4 часа 30 минут',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop'
      }
    ],
    recommendations: [
      {
        id: 3,
        title: 'React + Redux Toolkit',
        instructor: 'Владимир Иванов',
        rating: 4.9,
        duration: '8 часов',
        reason: 'Основано на ваших навыках JavaScript',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
      },
      {
        id: 4,
        title: 'Node.js Backend Development',
        instructor: 'Анна Смирнова',
        rating: 4.7,
        duration: '12 часов',
        reason: 'Популярно среди JavaScript разработчиков',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop'
      },
      {
        id: 5,
        title: 'TypeScript для профессионалов',
        instructor: 'Дмитрий Петров',
        rating: 4.8,
        duration: '6 часов',
        reason: 'Следующий шаг после JavaScript',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
      }
    ],
    stats: {
      totalCourses: 12,
      completedCourses: 5,
      hoursLearned: 87,
      certificates: 3,
      currentStreak: 7,
      weeklyGoal: 10,
      weeklyProgress: 6
    },
    upcomingEvents: [
      {
        title: 'Вебинар: Карьера в IT',
        date: '2024-09-05',
        time: '19:00',
        type: 'webinar'
      },
      {
        title: 'Дедлайн курса Python',
        date: '2024-09-08',
        time: '23:59',
        type: 'deadline'
      }
    ],
    achievements: [
      { title: 'Первый курс', icon: '🎓', unlocked: true },
      { title: '7 дней подряд', icon: '🔥', unlocked: true },
      { title: 'JavaScript мастер', icon: '⭐', unlocked: true },
      { title: '50 часов обучения', icon: '⏰', unlocked: false }
    ]
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <Menu mode="horizontal" style={{ border: 'none', flex: 1, justifyContent: 'center' }} onClick={({ key }) => {
          if (key === 'courses') navigate('/courses');
          if (key === 'profile') navigate('/profile');
          if (key === 'certificates') navigate('/certificates');
          if (key === 'home') navigate('/');
        }}>
          <Menu.Item key="home" icon={<UserOutlined />}>
            {t('navigation.home')}
          </Menu.Item>
          <Menu.Item key="courses" icon={<BookOutlined />}>
            {t('navigation.courses')}
          </Menu.Item>
          <Menu.Item key="certificates" icon={<TrophyOutlined />}>
            {t('navigation.certificates')}
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            {t('navigation.profile')}
          </Menu.Item>
        </Menu>
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
      
      <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Welcome Section */}
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', color: 'white' }}>
                <Row align="middle">
                  <Col flex="auto">
                    <Title level={2} style={{ color: 'white', margin: 0 }}>Добро пожаловать, {user?.name || 'Пользователь'}!</Title>
                    <Text style={{ color: 'white', fontSize: '16px' }}>Продолжайте обучение и достигайте новых высот</Text>
                  </Col>
                  <Col>
                    <div style={{ textAlign: 'center' }}>
                      <Title level={1} style={{ color: 'white', margin: 0 }}>{dashboardData.stats.currentStreak}</Title>
                      <Text style={{ color: 'white' }}>дней подряд</Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Statistics Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <BookOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>{dashboardData.stats.totalCourses}</Title>
                <Text type="secondary">Всего курсов</Text>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>{dashboardData.stats.completedCourses}</Title>
                <Text type="secondary">Завершено</Text>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>{dashboardData.stats.hoursLearned}</Title>
                <Text type="secondary">Часов изучено</Text>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: 'center' }}>
                <StarOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: 8 }} />
                <Title level={3} style={{ margin: 0 }}>{dashboardData.stats.certificates}</Title>
                <Text type="secondary">Сертификатов</Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {/* Continue Learning */}
            <Col xs={24} lg={16}>
              <Card title={<><PlayCircleOutlined style={{ marginRight: 8 }} />Продолжить обучение</>} style={{ height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {dashboardData.continuelearning.map(course => (
                    <Card key={course.id} hoverable onClick={() => navigate(`/course/${course.id}`)} style={{ border: '1px solid #f0f0f0' }}>
                      <Row gutter={16} align="middle">
                        <Col flex="none">
                          <img src={course.image} alt={course.title} style={{ width: 80, height: 60, borderRadius: 6, objectFit: 'cover' }} />
                        </Col>
                        <Col flex="auto">
                          <Title level={5} style={{ margin: 0, marginBottom: 4 }}>{course.title}</Title>
                          <Text type="secondary">{course.nextLesson}</Text>
                          <div style={{ marginTop: 8 }}>
                            <Progress percent={course.progress} size="small" />
                            <Text type="secondary" style={{ fontSize: '12px' }}>Осталось: {course.timeLeft}</Text>
                          </div>
                        </Col>
                        <Col flex="none">
                          <Button type="primary" size="large">Продолжить</Button>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
                
                {dashboardData.continuelearning.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: 16 }} />
                    <Title level={4} type="secondary">Начните своё обучение</Title>
                    <Button type="primary" onClick={() => navigate('/courses')}>Выбрать курс</Button>
                  </div>
                )}
              </Card>
            </Col>

            {/* Sidebar */}
            <Col xs={24} lg={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Weekly Goal */}
                <Card title="Цель недели" size="small">
                  <div style={{ textAlign: 'center' }}>
                    <Progress 
                      type="circle" 
                      percent={Math.round((dashboardData.stats.weeklyProgress / dashboardData.stats.weeklyGoal) * 100)}
                      format={() => `${dashboardData.stats.weeklyProgress}/${dashboardData.stats.weeklyGoal}`}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary">часов обучения</Text>
                    </div>
                  </div>
                </Card>

                {/* Subscription Status */}
                <SubscriptionCard 
                  isActive={true}
                  planName="Премиум"
                  expiryDate="31 декабря 2024"
                  daysRemaining={120}
                  totalCourses={150}
                  completedCourses={12}
                  compact={true}
                />

                {/* Achievements */}
                <Card title="Достижения" size="small">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {dashboardData.achievements.map((achievement, index) => (
                      <div key={index} style={{ 
                        textAlign: 'center', 
                        padding: '12px', 
                        backgroundColor: achievement.unlocked ? '#f6ffed' : '#fafafa',
                        borderRadius: '8px',
                        border: achievement.unlocked ? '1px solid #b7eb8f' : '1px solid #d9d9d9'
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: 4 }}>{achievement.icon}</div>
                        <Text style={{ fontSize: '12px', color: achievement.unlocked ? '#389e0d' : '#666' }}>
                          {achievement.title}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Upcoming Events */}
                <Card title="Предстоящие события" size="small">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {dashboardData.upcomingEvents.map((event, index) => (
                      <div key={index} style={{ 
                        padding: '12px', 
                        backgroundColor: event.type === 'deadline' ? '#fff2e8' : '#f6ffed',
                        borderRadius: '6px',
                        borderLeft: `4px solid ${event.type === 'deadline' ? '#fa8c16' : '#52c41a'}`
                      }}>
                        <Text strong style={{ fontSize: '13px' }}>{event.title}</Text><br/>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(event.date).toLocaleDateString('ru-RU')} в {event.time}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Recommendations */}
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Card title={<><StarOutlined style={{ marginRight: 8 }} />Рекомендации для вас</>}>
                <Row gutter={[16, 16]}>
                  {dashboardData.recommendations.map(course => (
                    <Col xs={24} sm={12} lg={8} key={course.id}>
                      <Card
                        hoverable
                        cover={
                          <img alt={course.title} src={course.image} style={{ height: 160, objectFit: 'cover' }} />
                        }
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        <Card.Meta
                          title={<Title level={5} style={{ margin: 0, fontSize: '14px' }}>{course.title}</Title>}
                          description={
                            <div>
                              <Text type="secondary" style={{ fontSize: '12px' }}>{course.instructor}</Text><br/>
                              <Space style={{ marginTop: 4 }}>
                                <Rate disabled defaultValue={course.rating} style={{ fontSize: '12px' }} />
                                <Text style={{ fontSize: '12px' }}>({course.rating})</Text>
                              </Space><br/>
                              <Text type="secondary" style={{ fontSize: '11px' }}>{course.reason}</Text><br/>
                              <Tag color="blue" style={{ marginTop: 4, fontSize: '11px' }}>{course.duration}</Tag>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <Button onClick={() => navigate('/courses')}>Смотреть все курсы</Button>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Card title="Быстрые действия">
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={6}>
                    <Card hoverable onClick={() => navigate('/courses')} style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <BookOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: 8 }} />
                      <div>Каталог курсов</div>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card hoverable onClick={() => navigate('/certificates')} style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <TrophyOutlined style={{ fontSize: '32px', color: '#faad14', marginBottom: 8 }} />
                      <div>Мои сертификаты</div>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card hoverable onClick={() => navigate('/profile')} style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <UserOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: 8 }} />
                      <div>Профиль</div>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <CalendarOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: 8 }} />
                      <div>Расписание</div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

function App() {
  return (
    <ConfigProvider>
      <AntApp>
        <AccessibilityProvider>
          <AuthProvider>
            <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <PhoneLoginPage />
                  </PublicRoute>
                }
              />
              
              <Route
                path="/onboarding"
                element={
                  <OnboardingRoute>
                    <OnboardingPage />
                  </OnboardingRoute>
                }
              />
              
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <CoursesPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetailPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/lesson/:lessonId"
                element={
                  <ProtectedRoute>
                    <LessonPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/certificates"
                element={
                  <ProtectedRoute>
                    <CertificatesPage />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </Router>
          </AuthProvider>
        </AccessibilityProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
