import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Card,
  Typography,
  Button,
  Steps,
  Row,
  Col,
  Radio,
  Space,
  Tag,
  message
} from 'antd';
import {
  TrophyOutlined,
  CodeOutlined,
  DatabaseOutlined,
  MobileOutlined,
  BarChartOutlined,
  DesktopOutlined,
  CheckOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

interface OnboardingData {
  goal: string;
  level: string;
  track: string;
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    goal: '',
    level: '',
    track: ''
  });

  const goals = [
    { key: 'career', label: 'Сменить карьеру', description: 'Хочу освоить новую профессию', icon: <TrophyOutlined /> },
    { key: 'skills', label: 'Улучшить навыки', description: 'Развиваю существующие знания', icon: <CodeOutlined /> },
    { key: 'hobby', label: 'Для себя', description: 'Изучаю из интереса', icon: <DesktopOutlined /> },
    { key: 'business', label: 'Для работы', description: 'Нужно для текущей деятельности', icon: <BarChartOutlined /> }
  ];

  const levels = [
    { key: 'beginner', label: 'Начинающий', description: 'Только начинаю изучать эту область' },
    { key: 'intermediate', label: 'Средний', description: 'Есть базовые знания, хочу углубиться' },
    { key: 'advanced', label: 'Продвинутый', description: 'Имею опыт, хочу изучить новые темы' }
  ];

  const tracks = [
    { key: 'programming', label: 'Программирование', description: 'JavaScript, Python, веб-разработка', icon: <CodeOutlined />, color: 'blue' },
    { key: 'design', label: 'Дизайн', description: 'UI/UX, графический дизайн, Figma', icon: <DesktopOutlined />, color: 'purple' },
    { key: 'management', label: 'Управление', description: 'Менеджмент, лидерство, планирование', icon: <TrophyOutlined />, color: 'orange' },
    { key: 'marketing', label: 'Маркетинг', description: 'SMM, реклама, аналитика', icon: <BarChartOutlined />, color: 'red' },
    { key: 'languages', label: 'Английский язык', description: 'Изучение иностранных языков', icon: <MobileOutlined />, color: 'green' },
    { key: 'personal', label: 'Личное развитие', description: 'Психология, здоровье, саморазвитие', icon: <DatabaseOutlined />, color: 'cyan' }
  ];

  const handleNext = () => {
    if (currentStep === 0 && !onboardingData.goal) {
      message.warning('Пожалуйста, выберите свою цель');
      return;
    }
    if (currentStep === 1 && !onboardingData.level) {
      message.warning('Пожалуйста, выберите свой уровень');
      return;
    }
    if (currentStep === 2 && !onboardingData.track) {
      message.warning('Пожалуйста, выберите направление');
      return;
    }
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save onboarding data to user profile
    if (updateUserProfile) {
      updateUserProfile({
        ...user,
        goal: onboardingData.goal,
        level: onboardingData.level,
        track: onboardingData.track,
        onboardingCompleted: true
      });
    }
    
    message.success('Добро пожаловать в EduPlatform!');
    navigate('/');
  };

  const renderGoalStep = () => (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 8 }}>Какая ваша главная цель?</Title>
      <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 32 }}>
        Это поможет нам персонализировать ваш опыт обучения
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        {goals.map(goal => (
          <Col xs={24} md={12} key={goal.key}>
            <Card
              hoverable
              style={{
                border: onboardingData.goal === goal.key ? '2px solid #1890ff' : '1px solid #f0f0f0',
                cursor: 'pointer'
              }}
              onClick={() => setOnboardingData({ ...onboardingData, goal: goal.key })}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }}>
                  {goal.icon}
                </div>
                <Title level={4} style={{ marginBottom: 8 }}>{goal.label}</Title>
                <Text type="secondary">{goal.description}</Text>
                {onboardingData.goal === goal.key && (
                  <CheckOutlined style={{ position: 'absolute', top: 16, right: 16, color: '#52c41a' }} />
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const renderLevelStep = () => (
    <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 8 }}>Какой у вас уровень?</Title>
      <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 32 }}>
        Мы подберем курсы подходящей сложности
      </Paragraph>
      
      <Radio.Group
        value={onboardingData.level}
        onChange={(e) => setOnboardingData({ ...onboardingData, level: e.target.value })}
        style={{ width: '100%' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {levels.map(level => (
            <Radio.Button
              key={level.key}
              value={level.key}
              style={{
                width: '100%',
                height: 'auto',
                padding: '16px 20px',
                textAlign: 'left',
                border: onboardingData.level === level.key ? '2px solid #1890ff' : '1px solid #f0f0f0'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                  {level.label}
                </div>
                <div style={{ color: '#666', fontSize: 14 }}>
                  {level.description}
                </div>
              </div>
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );

  const renderTrackStep = () => (
    <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 8 }}>Выберите направление</Title>
      <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 32 }}>
        Мы создадим персональный план обучения
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        {tracks.map(track => (
          <Col xs={24} md={12} key={track.key}>
            <Card
              hoverable
              style={{
                border: onboardingData.track === track.key ? '2px solid #1890ff' : '1px solid #f0f0f0',
                cursor: 'pointer',
                height: 120
              }}
              onClick={() => setOnboardingData({ ...onboardingData, track: track.key })}
            >
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <div style={{ fontSize: 24, color: '#1890ff', marginRight: 16 }}>
                  {track.icon}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <Title level={5} style={{ marginBottom: 4 }}>{track.label}</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>{track.description}</Text>
                  <div style={{ marginTop: 8 }}>
                    <Tag color={track.color}>{track.label}</Tag>
                  </div>
                </div>
                {onboardingData.track === track.key && (
                  <CheckOutlined style={{ color: '#52c41a', fontSize: 18 }} />
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const steps = [
    { title: 'Цель', content: renderGoalStep() },
    { title: 'Уровень', content: renderLevelStep() },
    { title: 'Направление', content: renderTrackStep() }
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={1} style={{ color: '#1890ff', marginBottom: 8 }}>
              Добро пожаловать в EduPlatform!
            </Title>
            <Text type="secondary" style={{ fontSize: 18 }}>
              Давайте настроим ваш профиль для лучшего опыта обучения
            </Text>
          </div>

          <Card style={{ marginBottom: 32 }}>
            <Steps current={currentStep} style={{ marginBottom: 48 }}>
              {steps.map(step => (
                <Steps.Step key={step.title} title={step.title} />
              ))}
            </Steps>

            {steps[currentStep].content}
          </Card>

          <div style={{ textAlign: 'center' }}>
            <Space size="large">
              {currentStep > 0 && (
                <Button size="large" onClick={() => setCurrentStep(currentStep - 1)}>
                  Назад
                </Button>
              )}
              <Button 
                type="primary" 
                size="large" 
                onClick={handleNext}
                style={{ minWidth: 120 }}
              >
                {currentStep === 2 ? 'Завершить' : 'Далее'}
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default OnboardingPage;