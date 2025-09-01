import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, App } from 'antd';
import { PhoneOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const PhoneLoginPage: React.FC = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { logout, setUser } = useAuth(); // Get auth context

  // Clear any existing auth state when component mounts
  React.useEffect(() => {
    logout();
  }, []);

  const handlePhoneSubmit = async (values: { phone: string }) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhoneNumber(values.phone);
    setStep('verification');
    
    // Show success message
    message.success('✅ Код отправлен на ' + values.phone);
    
    // State-based visual feedback
    setSuccessMessage('Код отправлен на ' + values.phone);
    setTimeout(() => setSuccessMessage(''), 4000);
    
    setLoading(false);
  };

  const handleVerificationSubmit = async (values: { code: string }) => {
    // Check for wrong code first
    if (values.code !== '1234') {
      // Show error message
      message.error('❌ Неверный код! Корректный код: 1234');
      return;
    }
    
    // Success case - code is correct
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success message
    setSuccessMessage('Код правильный! Вход в систему...');
    
    // Create user object
    const user = { 
      id: '1', 
      name: 'Пользователь', 
      email: 'user@example.com', 
      phone: phoneNumber,
      role: 'student' as const, 
      enrolledCourses: [], 
      completedLessons: [], 
      testScores: {},
      onboardingCompleted: false
    };
    
    // Set user in context
    setUser(user);
    
    // Navigate to home page (ProtectedRoute will redirect to onboarding if needed)
    setTimeout(() => {
      navigate('/');
    }, 2000);
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Card className="login-card" bodyStyle={{ padding: 32 }}>
        {step === 'phone' ? (
          <Form onFinish={handlePhoneSubmit} layout="vertical">
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
              Авторизация
            </Title>
            
            <Form.Item
              label="Номер телефона"
              name="phone"
              rules={[{ required: true, message: 'Введите номер телефона' }]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="+992"
                style={{ height: 48, fontSize: 16 }}
              />
            </Form.Item>

            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
              Просим Вас указывать корректные данные, с целью<br />
              избежания ошибок при возможном оформлении сертификата.
            </Text>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              style={{
                height: 48,
                borderRadius: 24,
                background: '#52c41a',
                borderColor: '#52c41a'
              }}
            >
              Получить код
            </Button>
          </Form>
        ) : (
          <Form 
            onFinish={handleVerificationSubmit} 
            layout="vertical"
          >
            {/* Success Alert - Visual feedback */}
            {successMessage && (
              <div style={{
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f',
                borderRadius: '6px',
                padding: '12px 16px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                <Text style={{ color: '#52c41a', fontSize: '14px', margin: 0 }}>
                  {successMessage}
                </Text>
              </div>
            )}
            
            <Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>
              Подтверждение
            </Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
              Код отправлен на {phoneNumber}
            </Text>
            
            <Form.Item
              label="Код подтверждения"
              name="code"
              rules={[
                { required: true, message: 'Введите код' }
              ]}
            >
              <Input
                placeholder="1234"
                maxLength={4}
                style={{ 
                  height: 48, 
                  fontSize: 18, 
                  textAlign: 'center'
                }}
              />
            </Form.Item>

            <div style={{ 
              display: 'block', 
              textAlign: 'center', 
              marginBottom: 16, 
              padding: '8px 12px',
              backgroundColor: '#f6ffed',
              border: '1px solid #b7eb8f',
              borderRadius: '6px',
              color: '#389e0d'
            }}>
              <Text style={{ fontSize: '13px', fontWeight: 500 }}>
                📝 Для тестирования используйте код: <strong>1234</strong>
              </Text>
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              style={{
                height: 48,
                borderRadius: 24,
                background: '#52c41a',
                borderColor: '#52c41a',
                marginBottom: 12
              }}
            >
              {loading ? 'Подтверждение...' : 'Подтвердить и войти'}
            </Button>
            
            <Button 
              type="text" 
              onClick={() => setStep('phone')}
              block
            >
              Изменить номер
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default PhoneLoginPage;