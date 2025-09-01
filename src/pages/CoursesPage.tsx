import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SubscriptionCard from '../components/SubscriptionCard';
import { useTranslation } from 'react-i18next';

import {
  Row,
  Col,
  Input,
  Button,
  Card,
  Typography,
  Tag,
  Rate,
  Space,
  Divider,
  Select,
  Menu,
  Badge,
  Avatar,
  Breadcrumb,
  Layout,
  Affix
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  LogoutOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: 'Современный JavaScript - с Нуля до Junior Специалиста',
    instructor: 'Yury Aliashkevich',
    price: 14.99,
    oldPrice: 64.99,
    rating: 4.8,
    students: 809,
    duration: '10 часов',
    lessons: 45,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
    category: 'Веб-разработка',
    level: 'Начинающий',
    tag: 'Лидер продаж',
    tagColor: 'gold'
  },
  {
    id: 2,
    title: 'JavaScript - Мастер-класс по Веб Разработке, React и Node.js',
    instructor: 'Bogdan Stashchuk',
    price: 14.99,
    oldPrice: 69.99,
    rating: 4.7,
    students: 3171,
    duration: '15 часов',
    lessons: 60,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
    category: 'Веб-разработка',
    level: 'Средний',
    tag: 'Бестселлер',
    tagColor: 'orange'
  },
  {
    id: 3,
    title: 'Полный курс по JavaScript + React - с нуля до результата',
    instructor: 'Иван Петриченко',
    price: 14.99,
    oldPrice: 74.99,
    rating: 4.8,
    students: 18290,
    duration: '20 часов',
    lessons: 80,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    category: 'Веб-разработка',
    level: 'Продвинутый',
    tag: 'Хит продаж',
    tagColor: 'red'
  },
  {
    id: 4,
    title: 'Python-разработчик + ИИ',
    instructor: 'Skillbox Team',
    price: 'Бесплатно',
    rating: 4.9,
    students: 5432,
    duration: '6 месяцев',
    lessons: 120,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop',
    category: 'Программирование',
    level: 'Средний',
    tag: 'Профессия',
    tagColor: 'purple'
  },
  {
    id: 5,
    title: 'Нейросети. Практический курс',
    instructor: 'AI Academy',
    price: 'Бесплатно',
    rating: 4.6,
    students: 2156,
    duration: '3 месяца',
    lessons: 24,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
    category: 'ИИ и данные',
    level: 'Начинающий',
    tag: 'Новинка',
    tagColor: 'green'
  },
  {
    id: 6,
    title: 'Excel + Google Таблицы с нуля до PRO',
    instructor: 'Data Expert',
    price: 12.99,
    oldPrice: 59.99,
    rating: 4.5,
    students: 9876,
    duration: '8 месяцев',
    lessons: 95,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    category: 'Бизнес-анализ',
    level: 'Начинающий',
    tag: 'Популярный',
    tagColor: 'blue'
  }
];

const categories = [
  'Все программы',
  'Программирование',
  'Дизайн',
  'Управление',
  'Маркетинг',
  'Игры',
  'Кино и Музыка',
  'Психология',
  'Здоровье',
  'Общее развитие',
  'Инженерия',
  'Английский язык'
];

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все программы');
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    let filtered = mockCourses;

    // Filter by category
    if (selectedCategory !== 'Все программы') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort courses
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return (typeof a.price === 'number' ? a.price : 0) - (typeof b.price === 'number' ? b.price : 0);
        case 'price-high':
          return (typeof b.price === 'number' ? b.price : 0) - (typeof a.price === 'number' ? a.price : 0);
        default:
          return b.students - a.students;
      }
    });

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  const toggleFavorite = (courseId: number) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const CourseCard = ({ course }: { course: any }) => (
    <Card
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={course.title}
            src={course.image}
            style={{ height: 200, width: '100%', objectFit: 'cover' }}
          />
          <Button
            type="text"
            shape="circle"
            icon={favorites.includes(course.id) ? <HeartFilled /> : <HeartOutlined />}
            onClick={() => toggleFavorite(course.id)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: favorites.includes(course.id) ? '#ff4d4f' : '#666'
            }}
          />
          {/* Removed tag labels as requested */}
        </div>
      }
      bodyStyle={{ padding: 16 }}
    >
      <Title level={5} style={{ margin: '0 0 8px 0', minHeight: 48 }}>
        {course.title}
      </Title>

      <Text type="secondary" style={{ fontSize: 13 }}>
        {course.instructor}
      </Text>

      <div style={{ margin: '12px 0' }}>
        <Space size={16}>
          <Space size={4}>
            <StarFilled style={{ fontSize: 12, color: '#faad14' }} />
            <Text strong style={{ fontSize: 13 }}>{course.rating}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({course.students.toLocaleString()})
          </Text>
        </Space>
      </div>

      <div style={{ margin: '8px 0' }}>
        <Tag color={course.level === 'Начинающий' ? 'green' : course.level === 'Средний' ? 'blue' : 'orange'} style={{ fontSize: '11px' }}>
          {course.level}
        </Tag>
      </div>

      <div style={{ margin: '8px 0' }}>
        <Space size={12}>
          <Space size={4}>
            <ClockCircleOutlined style={{ fontSize: 12, color: '#666' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{course.duration}</Text>
          </Space>
          <Space size={4}>
            <BookOutlined style={{ fontSize: 12, color: '#666' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{course.lessons} уроков</Text>
          </Space>
        </Space>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16 }}>
        <Button type="primary" size="small" onClick={() => navigate(`/course/${course.id}`)}>
          Начать изучение
        </Button>
      </div>
    </Card>
  );

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
          <Col flex="auto" style={{ maxWidth: 500, margin: '0 24px' }}>
            <Input
              size="large"
              placeholder="Поиск курсов..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col>
            <Space>
              <Tag color="green" style={{ fontSize: '12px', padding: '4px 8px' }}>
                {t('subscription.active')}
              </Tag>
              <Button type="text" icon={<TrophyOutlined />} onClick={() => navigate('/certificates')}>
                Сертификаты
              </Button>
              <Button type="text" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
                Профиль
              </Button>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.name || 'Пользователь'}</span>
              <Button type="text" danger icon={<LogoutOutlined />} onClick={logout}>
                Выйти
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Layout>
        <Sider
          width={320}
          style={{
            backgroundColor: '#fff',
            borderRight: '1px solid #f0f0f0',
            height: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
              <SubscriptionCard
                isActive={true}
                planName="Премиум"
                expiryDate="31.12.2024"
                daysRemaining={120}
                totalCourses={150}
                completedCourses={12}
                compact={true}
              />
            </div>


            <Divider style={{ margin: '24px 0' }} />

            <Title level={4} style={{ marginBottom: 16 }}>
              Все программы
            </Title>
            <Menu
              mode="vertical"
              selectedKeys={[selectedCategory]}
              style={{ border: 'none' }}
              items={categories.map(category => ({
                key: category,
                label: category,
                onClick: () => setSelectedCategory(category)
              }))}
            />
          </div>
        </Sider>

        <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
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
              <Breadcrumb.Item>Все курсы</Breadcrumb.Item>
              {selectedCategory !== 'Все программы' && (
                <Breadcrumb.Item>{selectedCategory}</Breadcrumb.Item>
              )}
            </Breadcrumb>
          </div>

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Card style={{ backgroundColor: '#fff' }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space size={16} wrap>
                      <Select
                        defaultValue="all"
                        style={{ minWidth: 120 }}
                        placeholder="Уровень"
                      >
                        <Option value="all">Все уровни</Option>
                        <Option value="beginner">Начинающий</Option>
                        <Option value="intermediate">Средний</Option>
                        <Option value="advanced">Продвинутый</Option>
                      </Select>
                      <Select
                        defaultValue="all"
                        style={{ minWidth: 130 }}
                        placeholder="Длительность"
                      >
                        <Option value="all">Любая длительность</Option>
                        <Option value="short">До 10 часов</Option>
                        <Option value="medium">10-50 часов</Option>
                        <Option value="long">Более 50 часов</Option>
                      </Select>
                      <Select
                        defaultValue="all"
                        style={{ minWidth: 100 }}
                        placeholder="Цена"
                      >
                        <Option value="all">Все курсы</Option>
                        <Option value="free">Бесплатные</Option>
                        <Option value="paid">Платные</Option>
                      </Select>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <div style={{ marginBottom: 24 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={3} style={{ margin: 0 }}>
                  {selectedCategory === 'Все программы' ? 'Все курсы платформы' : selectedCategory}
                </Title>
              </Col>
            </Row>
          </div>

          <Row gutter={[24, 24]}>
            {filteredCourses.map(course => (
              <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>

          {filteredCourses.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Title level={4} type="secondary">
                Курсы не найдены
              </Title>
              <Text type="secondary">
                Попробуйте изменить параметры поиска или фильтры
              </Text>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Все курсы доступны по подписке
            </Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CoursesPage;