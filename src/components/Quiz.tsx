import React, { useState } from 'react';
import { Card, Typography, Radio, Checkbox, Button, Space, Alert, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

interface QuizProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number[]}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, answerIndex: number, isChecked: boolean = true) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    setAnswers(prev => {
      const newAnswers = { ...prev };
      
      if (question.type === 'single') {
        newAnswers[questionId] = [answerIndex];
      } else {
        if (!newAnswers[questionId]) {
          newAnswers[questionId] = [];
        }
        
        if (isChecked) {
          if (!newAnswers[questionId].includes(answerIndex)) {
            newAnswers[questionId] = [...newAnswers[questionId], answerIndex];
          }
        } else {
          newAnswers[questionId] = newAnswers[questionId].filter(i => i !== answerIndex);
        }
      }
      
      return newAnswers;
    });
  };

  const checkAnswer = (question: Question): boolean => {
    const userAnswers = answers[question.id] || [];
    return JSON.stringify(userAnswers.sort()) === JSON.stringify(question.correctAnswers.sort());
  };

  const submitQuiz = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (checkAnswer(question)) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete(finalScore);
    }
    
    message.success(`Тест завершен! Ваш результат: ${finalScore}%`);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (questions.length === 0) {
    return (
      <Card>
        <Text type="secondary">Нет доступных вопросов для этого теста.</Text>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answers[question.id] && answers[question.id].length > 0;
  const isCorrect = showResults ? checkAnswer(question) : false;

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <QuestionCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Тест: Вопрос {currentQuestion + 1} из {questions.length}
          </span>
          {showResults && (
            <span style={{ color: isCorrect ? '#52c41a' : '#f5222d' }}>
              {isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              {isCorrect ? ' Правильно' : ' Неправильно'}
            </span>
          )}
        </div>
      }
      style={{ marginBottom: 24 }}
    >
      {showResults && (
        <Alert
          message={`Ваш результат: ${score}% (${questions.filter(q => checkAnswer(q)).length} из ${questions.length} правильных ответов)`}
          type={score >= 70 ? "success" : "warning"}
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}

      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          {question.text}
        </Title>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {question.type === 'single' ? (
            <Radio.Group
              value={answers[question.id]?.[0]}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              disabled={showResults}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {question.options.map((option, index) => (
                  <Radio 
                    key={index} 
                    value={index}
                    style={{ 
                      padding: '12px',
                      border: showResults ? (
                        question.correctAnswers.includes(index) ? '2px solid #52c41a' :
                        answers[question.id]?.includes(index) ? '2px solid #f5222d' : '1px solid #d9d9d9'
                      ) : '1px solid #d9d9d9',
                      borderRadius: 8,
                      width: '100%',
                      backgroundColor: showResults ? (
                        question.correctAnswers.includes(index) ? '#f6ffed' :
                        answers[question.id]?.includes(index) ? '#fff2f0' : 'transparent'
                      ) : 'transparent'
                    }}
                  >
                    {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          ) : (
            <Checkbox.Group
              value={answers[question.id] || []}
              onChange={(checkedValues) => {
                setAnswers(prev => ({
                  ...prev,
                  [question.id]: checkedValues as number[]
                }));
              }}
              disabled={showResults}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {question.options.map((option, index) => (
                  <Checkbox 
                    key={index} 
                    value={index}
                    style={{ 
                      padding: '12px',
                      border: showResults ? (
                        question.correctAnswers.includes(index) ? '2px solid #52c41a' :
                        answers[question.id]?.includes(index) ? '2px solid #f5222d' : '1px solid #d9d9d9'
                      ) : '1px solid #d9d9d9',
                      borderRadius: 8,
                      width: '100%',
                      backgroundColor: showResults ? (
                        question.correctAnswers.includes(index) ? '#f6ffed' :
                        answers[question.id]?.includes(index) ? '#fff2f0' : 'transparent'
                      ) : 'transparent'
                    }}
                  >
                    {option}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          )}
        </Space>

        {showResults && question.explanation && (
          <Alert
            message="Объяснение"
            description={question.explanation}
            type="info"
            style={{ marginTop: 16 }}
            showIcon
          />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          Предыдущий
        </Button>

        <Space>
          {!showResults ? (
            <>
              {currentQuestion < questions.length - 1 ? (
                <Button 
                  type="primary"
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                >
                  Следующий
                </Button>
              ) : (
                <Button 
                  type="primary"
                  onClick={submitQuiz}
                  disabled={!isAnswered}
                >
                  Завершить тест
                </Button>
              )}
            </>
          ) : (
            <Button onClick={resetQuiz}>
              Пройти еще раз
            </Button>
          )}
        </Space>

        <Button 
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          Следующий
        </Button>
      </div>
    </Card>
  );
};

export default Quiz;