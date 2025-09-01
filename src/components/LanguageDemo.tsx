import React from 'react';
import { Card, Row, Col, Typography, Space, Divider, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const { Title, Text, Paragraph } = Typography;

const LanguageDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>
            {t('common.language', { defaultValue: 'Language Switcher' })} Demo
          </Title>
          <LanguageSwitcher variant="compact" size="small" />
        </div>
      }
      style={{ margin: '24px 0' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Language Switcher Variants"
          description="Try different variants of the language switcher below. Each offers a unique user experience."
          type="info"
          showIcon
        />

        <div>
          <Text strong>Current Language: </Text>
          <Text code>{i18n.language}</Text>
          <Text type="secondary" style={{ marginLeft: 16 }}>
            ({[
              { code: 'ru', name: 'Русский' },
              { code: 'en', name: 'English' },
              { code: 'tj', name: 'Тоҷикӣ' }
            ].find(lang => lang.code === i18n.language)?.name})
          </Text>
        </div>

        <Divider>Language Switcher Variants</Divider>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={6}>
            <Card size="small" title="Dropdown (Modern)">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <LanguageSwitcher variant="dropdown" size="middle" showLabel={true} />
                <Text type="secondary" style={{ textAlign: 'center', fontSize: '12px' }}>
                  Rich dropdown with flags and native names
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Card size="small" title="Compact Button">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <LanguageSwitcher variant="compact" size="middle" />
                <Text type="secondary" style={{ textAlign: 'center', fontSize: '12px' }}>
                  Circular button with hover effects
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Card size="small" title="Enhanced Button">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <LanguageSwitcher variant="button" size="middle" showLabel={true} />
                <Text type="secondary" style={{ textAlign: 'center', fontSize: '12px' }}>
                  Gradient button with smooth transitions
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Card size="small" title="Select Dropdown">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <LanguageSwitcher variant="select" size="middle" showLabel={true} />
                <Text type="secondary" style={{ textAlign: 'center', fontSize: '12px' }}>
                  Traditional select with enhanced styling
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider>Size Variants</Divider>

        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Space direction="vertical" align="center">
              <LanguageSwitcher variant="dropdown" size="small" />
              <Text type="secondary">Small</Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="center">
              <LanguageSwitcher variant="dropdown" size="middle" />
              <Text type="secondary">Medium</Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="center">
              <LanguageSwitcher variant="dropdown" size="large" />
              <Text type="secondary">Large</Text>
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card size="small" title="Navigation">
              <Space direction="vertical">
                <Text>{t('navigation.home')}</Text>
                <Text>{t('navigation.courses')}</Text>
                <Text>{t('navigation.profile')}</Text>
                <Text>{t('navigation.certificates')}</Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card size="small" title="Dashboard">
              <Space direction="vertical">
                <Text>{t('dashboard.stats.totalCourses')}</Text>
                <Text>{t('dashboard.stats.completed')}</Text>
                <Text>{t('dashboard.stats.hoursLearned')}</Text>
                <Text>{t('dashboard.stats.certificates')}</Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card size="small" title="Comments">
              <Space direction="vertical">
                <Text>{t('comments.title')}</Text>
                <Text>{t('comments.send')}</Text>
                <Text>{t('comments.reply')}</Text>
                <Text>{t('comments.like')}</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />

        <div>
          <Title level={4}>Supported Languages:</Title>
          <Row gutter={[16, 16]} justify="center">
            <Col>
              <Card size="small" style={{ textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🇷🇺</div>
                <Text strong>Русский</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>Russian</Text>
              </Card>
            </Col>
            <Col>
              <Card size="small" style={{ textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🇺🇸</div>
                <Text strong>English</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>English</Text>
              </Card>
            </Col>
            <Col>
              <Card size="small" style={{ textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: '32px', marginBottom: 8 }}>🇹🇯</div>
                <Text strong>Тоҷикӣ</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>Tajik</Text>
              </Card>
            </Col>
          </Row>
        </div>

        <Alert
          message="Interactive Language Switching"
          description="Switch between languages using any variant above. All interface text will automatically update to reflect the selected language. The platform supports Russian, English, and Tajik with full internationalization."
          type="success"
          showIcon
        />
      </Space>
    </Card>
  );
};

export default LanguageDemo;