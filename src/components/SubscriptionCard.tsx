import React, { useState } from 'react';
import { Card, Typography, Button, Space, Tag, Progress, Row, Col, Dropdown, Modal, message } from 'antd';
import {
  CrownOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  GiftOutlined,
  ReloadOutlined,
  SettingOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
  BellOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface SubscriptionCardProps {
  isActive?: boolean;
  planName?: string;
  expiryDate?: string;
  daysRemaining?: number;
  totalCourses?: number;
  completedCourses?: number;
  compact?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  isActive = true,
  planName = "Премиум подписка",
  expiryDate = "31 декабря 2024",
  daysRemaining = 120,
  totalCourses = 150,
  completedCourses = 12,
  compact = false
}) => {
  const [isManagementModalVisible, setIsManagementModalVisible] = useState(false);

  // Debug: Log state changes
  React.useEffect(() => {
    console.log('Modal visibility changed:', isManagementModalVisible);
  }, [isManagementModalVisible]);

  const handleManagementAction = (action: string) => {
    switch (action) {
      case 'payment':
        message.info('Переход к управлению платежами');
        break;
      case 'history':
        message.info('Открытие истории платежей');
        break;
      case 'profile':
        message.info('Переход к настройкам профиля');
        break;
      case 'notifications':
        message.info('Настройки уведомлений');
        break;
      case 'documents':
        message.info('Открытие документов и договоров');
        break;
      case 'cancel':
        Modal.confirm({
          title: 'Отменить подписку',
          content: 'Вы уверены, что хотите отменить подписку? Доступ к премиум функциям будет ограничен.',
          okText: 'Да, отменить',
          cancelText: 'Нет',
          onOk: () => {
            message.success('Подписка отменена');
          }
        });
        break;
      default:
        break;
    }
  };

  const managementMenuItems = [
    {
      key: 'payment',
      label: 'Способы оплаты',
      icon: <CreditCardOutlined />,
      onClick: () => handleManagementAction('payment')
    },
    {
      key: 'history',
      label: 'История платежей',
      icon: <HistoryOutlined />,
      onClick: () => handleManagementAction('history')
    },
    {
      key: 'profile',
      label: 'Настройки профиля',
      icon: <UserOutlined />,
      onClick: () => handleManagementAction('profile')
    },
    {
      key: 'notifications',
      label: 'Уведомления',
      icon: <BellOutlined />,
      onClick: () => handleManagementAction('notifications')
    },
    {
      key: 'documents',
      label: 'Документы и договор',
      icon: <FileTextOutlined />,
      onClick: () => handleManagementAction('documents')
    },
    {
      type: 'divider' as const
    },
    {
      key: 'cancel',
      label: 'Отменить подписку',
      icon: <LogoutOutlined />,
      onClick: () => handleManagementAction('cancel'),
      danger: true
    }
  ];
  if (compact) {
    return (
      <Card
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
          border: 'none',
          borderRadius: 12,
          color: 'white',
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
        bodyStyle={{ padding: 16, position: 'relative', zIndex: 10 }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%', pointerEvents: 'auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
              <CrownOutlined style={{ fontSize: 16, color: '#ffd700', flexShrink: 0 }} />
              <Title level={5} style={{ margin: 0, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {planName}
              </Title>
            </div>
            {isActive && (
              <Tag color="success" style={{ flexShrink: 0 }}>
                Активна
              </Tag>
            )}
          </div>

          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            До {expiryDate}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ color: 'white', fontSize: '12px' }}>Прогресс</Text>
              <Text style={{ color: 'white', fontSize: '12px' }}>
                {completedCourses}/{totalCourses}
              </Text>
            </div>
            <Progress
              percent={(completedCourses / totalCourses) * 100}
              strokeColor="#52c41a"
              trailColor="rgba(255,255,255,0.3)"
              strokeWidth={6}
              showInfo={false}
            />
          </div>

          <div
            role="button"
            tabIndex={0}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1000,
              pointerEvents: 'auto',
              padding: '8px 16px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transition: 'all 0.3s ease',
              userSelect: 'none'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Management div clicked!'); // Debug log
              console.log('Current modal state:', isManagementModalVisible); // Debug log
              setIsManagementModalVisible(true);
              console.log('Modal should now be visible'); // Debug log
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsManagementModalVisible(true);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
          >
            <SettingOutlined /> Управление
          </div>
        </Space>
      </Card>
    );
  }

  const progressPercent = (completedCourses / totalCourses) * 100;

  return (
    <Card
      style={{
        background: isActive 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
        border: 'none',
        borderRadius: 16,
        color: 'white'
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CrownOutlined style={{ fontSize: 20, color: '#ffd700' }} />
            <Title level={4} style={{ margin: 0, color: 'white' }}>
              {planName}
            </Title>
            {isActive && (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Активна
              </Tag>
            )}
          </div>
        </div>

        <Paragraph style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
          Безлимитный доступ ко всем курсам платформы
        </Paragraph>

        <Row gutter={[16, 8]}>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CalendarOutlined style={{ marginRight: 8, fontSize: '14px' }} />
              <Text style={{ color: 'white', fontSize: '14px' }}>
                До {expiryDate}
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GiftOutlined style={{ marginRight: 8, fontSize: '14px' }} />
              <Text style={{ color: 'white', fontSize: '14px' }}>
                {daysRemaining} дней осталось
              </Text>
            </div>
          </Col>
        </Row>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: 'white', fontSize: '14px' }}>Прогресс обучения</Text>
            <Text style={{ color: 'white', fontSize: '14px' }}>
              {completedCourses} из {totalCourses} курсов
            </Text>
          </div>
          <Progress
            percent={progressPercent}
            strokeColor="#52c41a"
            trailColor="rgba(255,255,255,0.3)"
            strokeWidth={8}
            showInfo={false}
          />
        </div>

        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            {isActive ? (
              <Button
                type="primary"
                size="middle"
                icon={<ReloadOutlined />}
                block
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                Продлить
              </Button>
            ) : (
              <Button
                type="primary"
                size="middle"
                icon={<CrownOutlined />}
                block
                style={{
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a'
                }}
              >
                Активировать
              </Button>
            )}
          </Col>
          <Col xs={24} sm={12}>
            <Dropdown
              menu={{ items: managementMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                type="text"
                size="middle"
                block
                style={{ color: 'rgba(255,255,255,0.8)' }}
                icon={<SettingOutlined />}
              >
                Управление <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>

        {/* Management Modal for compact view */}
        <Modal
          title={<><SettingOutlined /> Управление подпиской</>}
          open={isManagementModalVisible}
          onCancel={() => {
            console.log('Modal close clicked'); // Debug log
            setIsManagementModalVisible(false);
          }}
          footer={null}
          width={400}
          destroyOnClose={false}
          maskClosable={true}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Title level={5}>Информация о подписке</Title>
              <Text>План: {planName}</Text><br />
              <Text>Активна до: {expiryDate}</Text><br />
              <Text>Осталось дней: {daysRemaining}</Text>
            </div>
            
            <div>
              <Title level={5}>Действия</Title>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Button block icon={<CreditCardOutlined />} onClick={() => handleManagementAction('payment')}>
                  Способы оплаты
                </Button>
                <Button block icon={<HistoryOutlined />} onClick={() => handleManagementAction('history')}>
                  История платежей
                </Button>
                <Button block icon={<UserOutlined />} onClick={() => handleManagementAction('profile')}>
                  Настройки профиля
                </Button>
                <Button block icon={<BellOutlined />} onClick={() => handleManagementAction('notifications')}>
                  Уведомления
                </Button>
                <Button block icon={<FileTextOutlined />} onClick={() => handleManagementAction('documents')}>
                  Документы и договор
                </Button>
                <Button block danger icon={<LogoutOutlined />} onClick={() => handleManagementAction('cancel')}>
                  Отменить подписку
                </Button>
              </Space>
            </div>
          </Space>
        </Modal>
      </Space>
    </Card>
  );
};

export default SubscriptionCard;