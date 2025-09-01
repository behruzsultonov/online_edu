import React, { useState } from 'react';
import { Select, Button, Dropdown, Space, Typography } from 'antd';
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

const { Text } = Typography;
const { Option } = Select;

interface LanguageSwitcherProps {
  style?: React.CSSProperties;
  variant?: 'select' | 'button' | 'dropdown' | 'compact';
  size?: 'small' | 'middle' | 'large';
  showLabel?: boolean;
  theme?: 'light' | 'dark';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  style, 
  variant = 'dropdown',
  size = 'middle',
  showLabel = false,
  theme = 'light'
}) => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'tj', name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setDropdownOpen(false);
  };

  const getThemeStyles = () => {
    return theme === 'dark' ? {
      background: '#1f1f1f',
      borderColor: '#434343',
      color: '#ffffff'
    } : {
      background: '#ffffff',
      borderColor: '#d9d9d9',
      color: '#000000'
    };
  };

  // Modern Dropdown Variant
  if (variant === 'dropdown') {
    const menuItems: MenuProps['items'] = languages.map(lang => ({
      key: lang.code,
      label: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          padding: '4px 0',
          minWidth: 140
        }}>
          <span style={{ fontSize: '16px' }}>{lang.flag}</span>
          <div>
            <div style={{ fontWeight: 500 }}>{lang.nativeName}</div>
            <div style={{ fontSize: '12px', color: '#666', opacity: 0.8 }}>{lang.name}</div>
          </div>
        </div>
      ),
      onClick: () => handleLanguageChange(lang.code)
    }));

    return (
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        placement="bottomRight"
        overlayStyle={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}
      >
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: size === 'small' ? 28 : size === 'large' ? 40 : 32,
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            padding: '0 12px',
            ...getThemeStyles(),
            ...style
          }}
          size={size}
        >
          <GlobalOutlined style={{ fontSize: '14px' }} />
          {showLabel ? (
            <Text style={{ 
              fontSize: size === 'small' ? '12px' : '14px',
              fontWeight: 500,
              color: 'inherit'
            }}>
              {currentLanguage.nativeName}
            </Text>
          ) : (
            <Text style={{ 
              fontSize: size === 'small' ? '12px' : '14px',
              fontWeight: 500,
              color: 'inherit'
            }}>
              {currentLanguage.code.toUpperCase()}
            </Text>
          )}
          <DownOutlined style={{ 
            fontSize: '10px', 
            transition: 'transform 0.2s',
            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }} />
        </Button>
      </Dropdown>
    );
  }

  // Compact Modern Button Variant
  if (variant === 'compact') {
    return (
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size === 'small' ? 32 : size === 'large' ? 48 : 40,
          height: size === 'small' ? 32 : size === 'large' ? 48 : 40,
          borderRadius: '50%',
          border: '2px solid #1890ff',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          color: '#ffffff',
          boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)',
          transition: 'all 0.3s ease',
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(24, 144, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 144, 255, 0.2)';
        }}
        onClick={() => {
          const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
          const nextIndex = (currentIndex + 1) % languages.length;
          handleLanguageChange(languages[nextIndex].code);
        }}
        title={`Current: ${currentLanguage.nativeName} - Click to switch`}
        aria-label={`Current language: ${currentLanguage.nativeName}. Click to switch language`}
      >
        <span style={{ fontSize: size === 'small' ? '14px' : size === 'large' ? '24px' : '18px' }}>
          {currentLanguage.flag}
        </span>
      </Button>
    );
  }

  // Enhanced Button Variant (cycles through languages)
  if (variant === 'button') {
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    return (
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: size === 'small' ? 28 : size === 'large' ? 40 : 32,
          borderRadius: '8px',
          border: '1px solid #1890ff',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
          color: '#1890ff',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(24, 144, 255, 0.1)',
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)';
          e.currentTarget.style.color = '#1890ff';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(24, 144, 255, 0.1)';
        }}
        onClick={() => handleLanguageChange(nextLanguage.code)}
        size={size}
        title={`Switch to ${nextLanguage.nativeName}`}
        aria-label={`Current language: ${currentLanguage.nativeName}. Click to switch to ${nextLanguage.nativeName}`}
      >
        <GlobalOutlined style={{ fontSize: size === 'small' ? '12px' : '14px' }} />
        <span style={{ fontSize: size === 'small' ? '14px' : '16px' }}>
          {currentLanguage.flag}
        </span>
        {showLabel && (
          <Text style={{ 
            fontSize: size === 'small' ? '12px' : '14px',
            fontWeight: 500,
            color: 'inherit'
          }}>
            {currentLanguage.code.toUpperCase()}
          </Text>
        )}
      </Button>
    );
  }

  // Enhanced Select Variant
  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ 
        minWidth: showLabel ? 160 : 120, 
        borderRadius: '8px',
        ...style 
      }}
      size={size}
      suffixIcon={<GlobalOutlined style={{ color: '#1890ff' }} />}
      aria-label="Select language"
      dropdownStyle={{
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0'
      }}
    >
      {languages.map(lang => (
        <Option key={lang.code} value={lang.code}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '16px' }}>{lang.flag}</span>
            <div>
              <span style={{ fontWeight: 500 }}>{lang.nativeName}</span>
              {showLabel && (
                <span style={{ fontSize: '12px', color: '#666', marginLeft: 4 }}>
                  ({lang.name})
                </span>
              )}
            </div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;