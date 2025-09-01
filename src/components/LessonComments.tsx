import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from './AccessibilityProvider';
import {
  Card,
  List,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  message,
  Dropdown
} from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  SendOutlined,
  LikeOutlined,
  DislikeOutlined,
  MoreOutlined,
  FlagOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  replies: Comment[];
  isEditing?: boolean;
}

interface LessonCommentsProps {
  lessonId: number;
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Алексей Петров',
    userAvatar: '',
    content: 'Отличный урок! Очень понятно объяснено про Python. Особенно понравилась часть про установку IDE.',
    timestamp: '2 часа назад',
    likes: 12,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: 2,
        userId: 2,
        userName: 'Мария Иванова',
        userAvatar: '',
        content: 'Согласна! Я тоже раньше не понимала разницу между Python 2 и 3, теперь все ясно.',
        timestamp: '1 час назад',
        likes: 5,
        dislikes: 0,
        isLiked: true,
        isDisliked: false,
        replies: []
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    userName: 'Дмитрий Сидоров',
    userAvatar: '',
    content: 'Есть ли дополнительные материалы по установке Python на MacOS? В уроке больше про Windows рассказано.',
    timestamp: '3 часа назад',
    likes: 8,
    dislikes: 1,
    isLiked: false,
    isDisliked: false,
    replies: []
  },
  {
    id: 4,
    userId: 4,
    userName: 'Анна Козлова',
    userAvatar: '',
    content: 'Спасибо за урок! Уже установила Python и VS Code, готова к следующему уроку 🐍',
    timestamp: '5 часов назад',
    likes: 15,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: []
  }
];

const LessonComments: React.FC<LessonCommentsProps> = ({ lessonId }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { announceToScreenReader } = useAccessibility();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      message.warning(t('comments.emptyComment'));
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      userId: typeof user?.id === 'number' ? user.id : 999,
      userName: user?.name || t('auth.user', { defaultValue: 'Текущий пользователь' }),
      userAvatar: '',
      content: newComment,
      timestamp: t('comments.justNow'),
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    message.success(t('comments.commentAdded'));
    announceToScreenReader(t('comments.commentAdded'));
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyText.trim()) {
      message.warning('Пожалуйста, введите текст ответа');
      return;
    }

    const reply: Comment = {
      id: Date.now(),
      userId: typeof user?.id === 'number' ? user.id : 999,
      userName: user?.name || 'Текущий пользователь',
      userAvatar: '',
      content: replyText,
      timestamp: 'Только что',
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      replies: []
    };

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
    message.success('Ответ добавлен');
  };

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes,
                      isLiked: !reply.isLiked,
                      isDisliked: false
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes,
              isLiked: !comment.isLiked,
              isDisliked: false
            }
          : comment
      ));
    }
  };

  const handleDislike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes,
                      isDisliked: !reply.isDisliked,
                      isLiked: false
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId
          ? {
              ...comment,
              dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes,
              isDisliked: !comment.isDisliked,
              isLiked: false
            }
          : comment
      ));
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingComment(commentId);
      setEditText(comment.content);
    }
  };

  const handleSaveEdit = (commentId: number) => {
    if (!editText.trim()) {
      message.warning('Комментарий не может быть пустым');
      return;
    }

    setComments(comments.map(comment => 
      comment.id === commentId
        ? { ...comment, content: editText, timestamp: 'Изменено только что' }
        : comment
    ));

    setEditingComment(null);
    setEditText('');
    message.success('Комментарий обновлен');
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    message.success('Комментарий удален');
  };

  const getCommentMenuItems = (comment: Comment, isOwnComment: boolean): MenuProps['items'] => [
    ...(isOwnComment ? [
      {
        key: 'edit',
        label: 'Редактировать',
        icon: <EditOutlined />,
        onClick: () => handleEditComment(comment.id)
      },
      {
        key: 'delete',
        label: 'Удалить',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteComment(comment.id)
      }
    ] : []),
    {
      key: 'report',
      label: 'Пожаловаться',
      icon: <FlagOutlined />,
      onClick: () => message.info('Жалоба отправлена')
    }
  ];

  const renderComment = (comment: Comment, isReply = false, parentId?: number) => {
    const isOwnComment = comment.userId === (typeof user?.id === 'number' ? user.id : 999);

    return (
      <div key={comment.id} style={{ marginBottom: isReply ? 12 : 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Avatar icon={<UserOutlined />} src={comment.userAvatar} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Text strong>{comment.userName}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {comment.timestamp}
              </Text>
              <Dropdown 
                menu={{ items: getCommentMenuItems(comment, isOwnComment) }}
                trigger={['click']}
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </div>

            {editingComment === comment.id ? (
              <div style={{ marginBottom: 8 }}>
                <TextArea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  style={{ marginBottom: 8 }}
                />
                <Space>
                  <Button 
                    type="primary" 
                    size="small"
                    onClick={() => handleSaveEdit(comment.id)}
                  >
                    Сохранить
                  </Button>
                  <Button 
                    size="small"
                    onClick={() => {
                      setEditingComment(null);
                      setEditText('');
                    }}
                  >
                    Отмена
                  </Button>
                </Space>
              </div>
            ) : (
              <Paragraph style={{ marginBottom: 8, fontSize: 14 }}>
                {comment.content}
              </Paragraph>
            )}

            <Space size="large">
              <Button
                type="text"
                size="small"
                icon={<LikeOutlined />}
                onClick={() => handleLike(comment.id, isReply, parentId)}
                style={{ 
                  color: comment.isLiked ? '#1890ff' : undefined,
                  padding: '0 4px'
                }}
              >
                {comment.likes > 0 && comment.likes}
              </Button>

              <Button
                type="text"
                size="small"
                icon={<DislikeOutlined />}
                onClick={() => handleDislike(comment.id, isReply, parentId)}
                style={{ 
                  color: comment.isDisliked ? '#ff4d4f' : undefined,
                  padding: '0 4px'
                }}
              >
                {comment.dislikes > 0 && comment.dislikes}
              </Button>

              {!isReply && (
                <Button
                  type="text"
                  size="small"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  Ответить
                </Button>
              )}
            </Space>

            {!isReply && replyingTo === comment.id && (
              <div style={{ marginTop: 12, paddingLeft: 12, borderLeft: '2px solid #f0f0f0' }}>
                <TextArea
                  placeholder={`Ответить ${comment.userName}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={2}
                  style={{ marginBottom: 8 }}
                />
                <Space>
                  <Button 
                    type="primary" 
                    size="small"
                    icon={<SendOutlined />}
                    onClick={() => handleSubmitReply(comment.id)}
                  >
                    Ответить
                  </Button>
                  <Button 
                    size="small"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                  >
                    Отмена
                  </Button>
                </Space>
              </div>
            )}

            {!isReply && comment.replies.length > 0 && (
              <div style={{ marginTop: 16, paddingLeft: 12, borderLeft: '2px solid #f0f0f0' }}>
                {comment.replies.map(reply => renderComment(reply, true, comment.id))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text strong style={{ fontSize: 16 }}>{t('comments.title')}</Text>
          <Text type="secondary">({comments.length})</Text>
        </div>
      }
      style={{ marginBottom: 24 }}
    >
      {/* Add Comment Section */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <Avatar icon={<UserOutlined />} />
          <div style={{ flex: 1 }}>
            <TextArea
              placeholder={t('comments.addComment')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              style={{ marginBottom: 8 }}
            />
            <Row justify="end">
              <Button 
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                {t('comments.send')}
              </Button>
            </Row>
          </div>
        </div>
      </div>

      <Divider />

      {/* Comments List */}
      {comments.length > 0 ? (
        <div>
          {comments.map(comment => renderComment(comment))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type="secondary">
            Пока нет комментариев. Будьте первым, кто поделится мнением!
          </Text>
        </div>
      )}
    </Card>
  );
};

export default LessonComments;