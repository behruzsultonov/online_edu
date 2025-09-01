import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLessonData } from '../data/lessons.js';
import Quiz from '../components/Quiz';
import LessonComments from '../components/LessonComments';
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
  List,
  Tag,
  Avatar,
  Breadcrumb,
  Divider,
  Radio,
  Checkbox,
  message,
  Badge,
  Affix
} from 'antd';
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  BookOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  LogoutOutlined,
  BulbOutlined,
  QuestionCircleOutlined,
  LikeOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Sider } = Layout;

interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

interface LessonData {
  id: number;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: string;
  courseTitle: string;
  sectionTitle: string;
  content?: {
    videoUrl?: string;
    textContent?: string;
    annotations?: string[];
    keyPoints?: string[];
    questions?: Question[];
  };
  progress: number;
  completed: boolean;
  nextLessonId?: number;
  prevLessonId?: number;
}

// Mock lesson data
const mockLesson: LessonData = {
  id: 1,
  title: 'Введение: знакомство с Python',
  type: 'text',
  duration: '15:30',
  courseTitle: 'Полный курс по Python для начинающих',
  sectionTitle: 'Введение',
  content: {
    textContent: `
# Тема урока: введение в программирование

## 1. История языка Python
Python был создан Гвидо ван Россумом в конце 1980-х годов и впервые выпущен в 1991 году.

## 2. Сильные и слабые стороны Python
- **Сильные стороны:** простота синтаксиса, читаемость кода, большое сообщество
- **Слабые стороны:** скорость выполнения, потребление памяти

## 3. Python 2 VS Python 3
Python 3 является текущей версией языка и рекомендуется для всех новых проектов.

## 4. Установка Python на компьютер
Скачайте Python с официального сайта python.org и следуйте инструкциям установки.

## 5. Установка VS Code и (или) Wing IDE на компьютер
Рекомендуется использовать современную IDE для удобной разработки.

## Введение

**Компьютерная программа** – список команд (инструкций) для компьютера. Команды могут быть любыми, например:

- считать информацию с клавиатуры;
- произвести арифметические вычисления (+, -, *, /);
- вывести информацию на экран.

В каждом компьютере установлено много разнообразных программ. Например, **Google Chrome**, через которую вы, скорее всего, проходите этот курс, — это программа-браузер. Она позволяет просматривать страницы сайтов в интернете. Программа **Skype** позволяет совершать звонки и обмениваться мгновенными сообщениями. В конце концов, сама операционная система, будь то **Windows**, **OS X** или **Linux**, тоже программа.

Для создания программ используются **языки программирования**. Выбор языка программирования, как правило, продиктован особенностями самой программы.

## Язык программирования

**Язык программирования** — набор определённых правил, по которым компьютер может понимать команды (инструкции) и выполнять их. Текст программы на любом языке программирования называется **программным кодом**.
    `,
    annotations: [
      'Что такое программа и какие существуют языки программирования? Чем хорош язык Python? Как установить на компьютер интерпретатор Python и среды разработки VS Code и (или) Wing IDE?'
    ],
    keyPoints: [
      'Компания Google использует Python в своей поисковой системе',
      'Компании Intel, Cisco, Hewlett-Packard, Seagate, Qualcomm и IBM используют Python для тестирования аппаратного обеспечения',
      'Сервис YouTube в значительной степени реализован на Python',
      'Агентство национальной безопасности (NSA) использует Python для шифрования и анализа данных',
      'Компании JPMorgan Chase, UBS, Getco и Citadel применяют Python для прогнозирования финансового рынка',
      'Программа BitTorrent для обмена файлами в одноранговых сетях написана на языке Python',
      'NASA, Los Alamos, JPL и Fermilab используют Python для научных вычислений'
    ]
  },
  progress: 60,
  completed: false,
  nextLessonId: 2,
  prevLessonId: undefined
};

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [lesson, setLesson] = useState(() => getLessonData(parseInt(lessonId || '1')));
  const [currentProgress, setCurrentProgress] = useState(lesson.progress);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number[]}>({});
  const [showResults, setShowResults] = useState(false);
  const [likes, setLikes] = useState(20245);
  const [comments, setComments] = useState(5170);
  const [isLiked, setIsLiked] = useState(false);

  // Update lesson data when URL parameter changes
  useEffect(() => {
    const newLesson = getLessonData(parseInt(lessonId || '1'));
    setLesson(newLesson);
    setCurrentProgress(newLesson.progress);
    setQuizAnswers({});
    setShowResults(false);
  }, [lessonId]);

  useEffect(() => {
    // Track reading progress based on scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Update progress based on scroll, but cap at 90% (save 10% for completion button)
      const readingProgress = Math.min(Math.round(scrollPercent * 0.9), 90);
      if (readingProgress > currentProgress) {
        setCurrentProgress(readingProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentProgress]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const updateProgress = (increment: number) => {
    setCurrentProgress((prev: number) => {
      const newProgress = Math.min(prev + increment, 100);
      return newProgress;
    });
  };

  const handleQuizComplete = (score: number) => {
    // Award progress based on quiz performance
    const progressBonus = Math.round(score / 4); // 25% quiz = 25% progress bonus
    updateProgress(progressBonus);
    message.success(`Тест завершен! Результат: ${score}%. Прогресс увеличен на ${progressBonus}%`);
  };

  const handleComplete = () => {
    setCurrentProgress(100);
    message.success('Урок завершен!');
    // Update lesson completion status
    navigate('/courses');
  };

  const renderContent = () => {
    if (lesson.type === 'video') {
      return (
        <Card style={{ marginBottom: 24 }}>
          <div style={{ 
            background: '#000', 
            height: 400, 
            borderRadius: 8, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <PlayCircleOutlined style={{ fontSize: 64, color: '#fff' }} />
          </div>
          <Text type="secondary">Видеоурок: {lesson.title}</Text>
        </Card>
      );
    }

    if (lesson.type === 'text' || lesson.type === 'quiz') {
      return (
        <Card title="Материал урока" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, lineHeight: 1.8 }}>
            {lesson.content?.textContent?.split('\n').map((line: string, index: number) => {
              if (line.startsWith('# ')) {
                return <Title key={index} level={2}>{line.substring(2)}</Title>;
              }
              if (line.startsWith('## ')) {
                return <Title key={index} level={3}>{line.substring(3)}</Title>;
              }
              if (line.startsWith('- ')) {
                return <li key={index} style={{ marginBottom: 8 }}>{line.substring(2)}</li>;
              }
              if (line.includes('**') && line.includes('**')) {
                const parts = line.split('**');
                return (
                  <Paragraph key={index}>
                    {parts.map((part: string, i: number) => 
                      i % 2 === 1 ? <Text strong key={i}>{part}</Text> : part
                    )}
                  </Paragraph>
                );
              }
              if (line.trim()) {
                return <Paragraph key={index}>{line}</Paragraph>;
              }
              return <br key={index} />;
            })}
          </div>
        </Card>
      );
    }

    return null;
  };

  const renderKeyPoints = () => {
    if (!lesson.content || !('keyPoints' in lesson.content) || !lesson.content.keyPoints) return null;

    return (
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BulbOutlined style={{ color: '#faad14' }} />
            <span>Ключевые факты</span>
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <List
          dataSource={('keyPoints' in lesson.content) ? lesson.content.keyPoints : []}
          renderItem={(item: string, index: number) => (
            <List.Item style={{ padding: '8px 0' }}>
              <Text>
                <span style={{ color: '#1890ff', fontWeight: 'bold', marginRight: 8 }}>
                  {index + 1}.
                </span>
                {item}
              </Text>
            </List.Item>
          )}
        />
      </Card>
    );
  };

  const renderLessonStats = () => (
    <Card style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Space>
            <Button 
              type={isLiked ? "primary" : "default"}
              icon={<LikeOutlined />}
              onClick={handleLike}
            >
              {likes.toLocaleString()}
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
          <Text type="secondary">{comments} Комментариев</Text>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
          <Button type="primary" ghost>
            Следующий шаг
          </Button>
        </Col>
      </Row>
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
        <Sider width={300} style={{ backgroundColor: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: 16 }}>
            <Title level={5} style={{ marginBottom: 16 }}>
              {lesson.courseTitle}
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              Прогресс по курсу: 0/257
            </Text>
            
            {/* Course outline */}
            <div style={{ marginBottom: 16 }}>
              <Text strong>Общая информация о курсе</Text>
              <List size="small" style={{ marginTop: 8 }}>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/1')}>
                  <Text type="secondary" style={{ color: lesson.id === 1 ? '#1890ff' : undefined }}>
                    1.1 О курсе
                  </Text>
                </List.Item>
                <List.Item 
                  style={{ 
                    backgroundColor: lesson.id === 1 ? '#e6f7ff' : 'transparent', 
                    borderRadius: 4, 
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/lesson/1')}
                >
                  <Text style={{ color: lesson.id === 1 ? '#1890ff' : undefined }}>
                    1.2 Как проходить курс
                  </Text>
                </List.Item>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/2')}>
                  <Text type="secondary" style={{ color: lesson.id === 2 ? '#1890ff' : undefined }}>
                    1.3 Для преподавателей и...
                  </Text>
                </List.Item>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/3')}>
                  <Text type="secondary" style={{ color: lesson.id === 3 ? '#1890ff' : undefined }}>
                    1.4 Достижения курса
                  </Text>
                </List.Item>
              </List>
            </div>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Text strong>Ввод-вывод данных</Text>
              <List size="small" style={{ marginTop: 8 }}>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/4')}>
                  <Text type="secondary" style={{ color: lesson.id === 4 ? '#1890ff' : undefined }}>
                    2.1 Введение. Знакомство...
                  </Text>
                </List.Item>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/5')}>
                  <Text type="secondary" style={{ color: lesson.id === 5 ? '#1890ff' : undefined }}>
                    2.2 Команда print() и прод...
                  </Text>
                </List.Item>
              </List>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Условный оператор</Text>
              <List size="small" style={{ marginTop: 8 }}>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/6')}>
                  <Text type="secondary" style={{ color: lesson.id === 6 ? '#1890ff' : undefined }}>
                    4.1 Выбор из двух
                  </Text>
                </List.Item>
                <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/lesson/7')}>
                  <Text type="secondary" style={{ color: lesson.id === 7 ? '#1890ff' : undefined }}>
                    4.2 Логические операции
                  </Text>
                </List.Item>
              </List>
            </div>
          </div>
        </Sider>

        <Content style={{ padding: 24 }}>
          <div style={{ maxWidth: 800 }}>
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: 24 }}>
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
              <Breadcrumb.Item>{lesson.courseTitle}</Breadcrumb.Item>
              <Breadcrumb.Item>{lesson.title}</Breadcrumb.Item>
            </Breadcrumb>

            {/* Lesson Header */}
            <Card style={{ marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <Tag color="blue">{lesson.sectionTitle}</Tag>
                <Title level={2} style={{ marginTop: 8, marginBottom: 8 }}>
                  {lesson.title}
                </Title>
                <Text type="secondary">
                  1 из 10 шагов пройден • 0 из 8 баллов получено
                </Text>
              </div>
              
              <Progress 
                percent={currentProgress} 
                strokeColor="#52c41a"
                style={{ marginBottom: 16 }}
              />
              
              <Row gutter={[16, 16]}>
                <Col>
                  <Space>
                    <ClockCircleOutlined />
                    <Text>{lesson.duration}</Text>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <FileTextOutlined />
                    <Text>{lesson.type === 'quiz' ? 'Тест' : lesson.type === 'video' ? 'Видеоурок' : 'Текстовый урок'}</Text>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Annotations */}
            {lesson.content && 'annotations' in lesson.content && lesson.content.annotations && (
              <Card 
                title="Аннотация"
                style={{ marginBottom: 24 }}
              >
                <Paragraph style={{ fontSize: 16 }}>
                  {('annotations' in lesson.content) ? lesson.content.annotations[0] : ''}
                </Paragraph>
              </Card>
            )}

            {/* Lesson Content */}
            {renderContent()}

            {/* Quiz Section */}
            {lesson.content && 'questions' in lesson.content && lesson.content.questions && lesson.content.questions.length > 0 && (
              <Quiz 
                questions={('questions' in lesson.content) ? lesson.content.questions : []}
                onComplete={handleQuizComplete}
              />
            )}

            {/* Key Points */}
            {renderKeyPoints()}

            {/* Lesson Stats */}
            {renderLessonStats()}

            {/* Comments Section */}
            <LessonComments lessonId={lesson.id} />

            {/* Navigation */}
            <Card>
              <Row justify="space-between" align="middle">
                <Col>
                  {lesson.prevLessonId && (
                    <Button icon={<ArrowLeftOutlined />}>
                      Предыдущий урок
                    </Button>
                  )}
                </Col>
                <Col>
                  <Button type="primary" onClick={handleComplete}>
                    Завершить урок
                  </Button>
                </Col>
                <Col>
                  {lesson.nextLessonId && (
                    <Button type="primary" icon={<ArrowRightOutlined />}>
                      Следующий урок
                    </Button>
                  )}
                </Col>
              </Row>
            </Card>
          </div>
        </Content>

        {/* Right sidebar with progress */}
        <Affix offsetTop={80} style={{ position: 'absolute', right: 24, top: 100 }}>
          <Card size="small" style={{ width: 200 }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text strong>Прогресс урока</Text>
              <Progress 
                type="circle" 
                percent={currentProgress} 
                size={60}
                strokeColor="#52c41a"
              />
              <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
                {currentProgress}% завершено
              </Text>
            </Space>
          </Card>
        </Affix>
      </Layout>
    </Layout>
  );
};

export default LessonPage;