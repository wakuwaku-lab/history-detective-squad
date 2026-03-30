import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { Check, XCircle, Trophy } from 'lucide-react';

interface QuizProps {
  caseId: string;
  onComplete: () => void;
}

export function Quiz({ caseId, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const addExp = useAppStore((state) => state.addExp);
  const completeCase = useAppStore((state) => state.completeCase);

  const [, caseItem] = (() => {
    const allEras = [
      { id: 'xianqin', cases: [
        { id: 'xianqin-1', title: '青铜器的秘密', description: '商朝工匠铸造青铜器', difficulty: 'easy' as const, questions: [
          { id: 'q1', question: '商朝青铜器最常见的纹饰是什么？', options: ['龙纹', '凤纹', '饕餮纹', '云纹'], correctIndex: 2, explanation: '饕餮纹是商周青铜器上最典型的装饰纹样。' },
          { id: 'q2', question: '「问鼎中原」中的「鼎」是什么时期的器物？', options: ['夏朝', '商朝', '春秋', '战国'], correctIndex: 2, explanation: '「问鼎中原」出自《左传》，是春秋时期楚庄王的事。' },
          { id: 'q3', question: '老子是哪家学派的创始人？', options: ['儒家', '道家', '法家', '墨家'], correctIndex: 1, explanation: '老子是道家学派的创始人，著有《道德经》。' },
        ], reward: 30 },
        { id: 'xianqin-2', title: '诸子百家', description: '孔子学生们遇到难题', difficulty: 'medium' as const, questions: [
          { id: 'q1', question: '「己所不欲，勿施于人」出自哪位思想家之口？', options: ['老子', '孔子', '孟子', '荀子'], correctIndex: 1, explanation: '这句话出自《论语》，是孔子提出的儒家思想。' },
          { id: 'q2', question: '「兼爱」「非攻」是哪家学派的主张？', options: ['儒家', '道家', '墨家', '法家'], correctIndex: 2, explanation: '「兼爱」「非攻」是墨家学派的核心思想。' },
          { id: 'q3', question: '「孙子兵法」的作者是谁？', options: ['孙武', '孙膑', '吴起', '白起'], correctIndex: 0, explanation: '《孙子兵法》由春秋时期的军事家孙武所著。' },
          { id: 'q4', question: '战国时期实行「商鞅变法」的是哪个国家？', options: ['楚国', '齐国', '秦国', '燕国'], correctIndex: 2, explanation: '商鞅在秦国实行变法，使秦国成为强国。' },
        ], reward: 50 },
      ]},
      { id: 'qinhan', cases: [
        { id: 'qinhan-1', title: '秦统一六国', description: '秦始皇完成了统一大业', difficulty: 'easy' as const, questions: [
          { id: 'q1', question: '秦始皇统一六国是在哪一年？', options: ['公元前230年', '公元前221年', '公元前213年', '公元前206年'], correctIndex: 1, explanation: '公元前221年，秦始皇灭齐国，完成统一。' },
          { id: 'q2', question: '秦始皇统一后推行了什么统一度量衡？', options: ['长度', '重量', '货币', '以上都是'], correctIndex: 3, explanation: '秦始皇统一了度量衡、货币和文字。' },
          { id: 'q3', question: '「图穷匕见」说的是谁的故事？', options: ['荆轲', '张良', '韩信', '刘邦'], correctIndex: 0, explanation: '图穷匕见讲的是荆轲刺秦王的故事。' },
        ], reward: 30 },
      ]},
      { id: 'sanguo', cases: [
        { id: 'sanguo-1', title: '赤壁之战', description: '曹操率军南下', difficulty: 'medium' as const, questions: [
          { id: 'q1', question: '赤壁之战发生在哪一年？', options: ['公元200年', '公元208年', '公元220年', '公元260年'], correctIndex: 1, explanation: '赤壁之战发生在公元208年。' },
          { id: 'q2', question: '赤壁之战中，孙刘联军用了什么计策火攻曹军？', options: ['空城计', '苦肉计', '连环计', '以上都不是'], correctIndex: 2, explanation: '周瑜用黄盖的苦肉计和庞统的连环计。' },
          { id: 'q3', question: '「既生瑜，何生亮」说的是谁？', options: ['刘备', '周瑜', '诸葛亮', '曹操'], correctIndex: 1, explanation: '这是周瑜临死前说的话。' },
        ], reward: 40 },
      ]},
      { id: 'suitang', cases: [
        { id: 'suitang-1', title: '贞观之治', description: '唐太宗李世民的盛世', difficulty: 'medium' as const, questions: [
          { id: 'q1', question: '「贞观之治」指的是哪位皇帝在位时期？', options: ['唐高祖', '唐太宗', '唐高宗', '武则天'], correctIndex: 1, explanation: '贞观之治指唐太宗李世民在位期间。' },
          { id: 'q2', question: '「水能载舟，亦能覆舟」是谁说的？', options: ['孔子', '秦始皇', '唐太宗', '康熙'], correctIndex: 2, explanation: '这句话出自唐太宗李世民。' },
          { id: 'q3', question: '唐朝实行什么制度来选拔人才？', options: ['九品中正制', '科举制', '察举制', '世袭制'], correctIndex: 1, explanation: '科举制度在唐朝得到完善。' },
        ], reward: 40 },
      ]},
      { id: 'songyuan', cases: [
        { id: 'songyuan-1', title: '四大发明的传播', description: '四大发明如何传播', difficulty: 'hard' as const, questions: [
          { id: 'q1', question: '活字印刷术是谁发明的？', options: ['蔡伦', '毕昇', '沈括', '张衡'], correctIndex: 1, explanation: '北宋人毕昇发明了活字印刷术。' },
          { id: 'q2', question: '指南针在宋元时期主要用于什么？', options: ['祭祀', '航海', '农业', '建筑'], correctIndex: 1, explanation: '宋代开始，指南针广泛应用于航海。' },
          { id: 'q3', question: '「岳飞」是哪个朝代的抗金名将？', options: ['唐朝', '宋朝', '元朝', '明朝'], correctIndex: 1, explanation: '岳飞是南宋著名的抗金将领。' },
        ], reward: 50 },
      ]},
      { id: 'mingqing', cases: [
        { id: 'mingqing-1', title: '郑和下西洋', description: '明代航海家郑和', difficulty: 'medium' as const, questions: [
          { id: 'q1', question: '郑和下西洋第一次出发是在哪一年？', options: ['1403年', '1405年', '1410年', '1420年'], correctIndex: 1, explanation: '1405年，郑和第一次下西洋。' },
          { id: 'q2', question: '郑和是哪个朝代的航海家？', options: ['元朝', '明朝', '清朝', '宋朝'], correctIndex: 1, explanation: '郑和是明朝初年的航海家。' },
          { id: 'q3', question: '明朝哪位皇帝下令建造了紫禁城？', options: ['朱元璋', '朱棣', '朱允炆', '朱厚照'], correctIndex: 1, explanation: '明成祖朱棣下令建造紫禁城。' },
        ], reward: 40 },
      ]},
    ];
    
    for (const eraData of allEras) {
      const foundCase = eraData.cases.find(c => c.id === caseId);
      if (foundCase) {
        return [eraData, foundCase] as const;
      }
    }
    return [null, null] as const;
  })();

  const questions = caseItem?.questions || [];
  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctIndex;

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === question.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      const earnedExp = correctCount * 10;
      addExp(earnedExp);
      completeCase(caseId, correctCount);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  if (showResult) {
    const stars = Math.ceil((correctCount / questions.length) * 3);
    return (
      <motion.div
        className="quiz-result"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="result-card">
          <Trophy size={64} className="trophy" />
          <h2>任务完成！</h2>
          <p className="result-title">{caseItem?.title}</p>
          
          <div className="stars-display">
            {[1, 2, 3].map((star) => (
              <motion.span
                key={star}
                className={`star ${star <= stars ? 'earned' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: star <= stars ? 1 : 0.5 }}
                transition={{ delay: star * 0.2 }}
              >
                ★
              </motion.span>
            ))}
          </div>
          
          <div className="result-stats">
            <p>答对: <strong>{correctCount}/{questions.length}</strong></p>
            <p>获得经验: <strong>+{correctCount * 10}</strong></p>
          </div>
          
          <button className="finish-btn" onClick={handleFinish}>
            返回
          </button>
        </div>

        <style>{`
          .quiz-result {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
            padding: 2rem;
          }

          .result-card {
            background: white;
            padding: 3rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            text-align: center;
            max-width: 400px;
          }

          .trophy {
            color: #ffd700;
            margin-bottom: 1rem;
          }

          .result-card h2 {
            color: var(--color-primary);
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .result-title {
            color: var(--color-text);
            opacity: 0.8;
            margin-bottom: 1.5rem;
          }

          .stars-display {
            font-size: 3rem;
            margin-bottom: 1.5rem;
          }

          .star {
            color: #e0e0e0;
            margin: 0 0.25rem;
          }

          .star.earned {
            color: #ffd700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }

          .result-stats {
            margin-bottom: 1.5rem;
          }

          .result-stats p {
            margin: 0.5rem 0;
          }

          .result-stats strong {
            color: var(--color-primary);
          }

          .finish-btn {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-bg-dark) 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: var(--radius-full);
            font-size: 1.1rem;
            transition: all var(--transition-normal);
          }

          .finish-btn:hover {
            transform: scale(1.05);
            box-shadow: var(--shadow-lg);
          }
        `}</style>
      </motion.div>
    );
  }

  if (!question) {
    return <div>加载中...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>{caseItem?.title}</h3>
        <span className="progress">第 {currentQuestion + 1}/{questions.length} 题</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <motion.div
        className="question-card"
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="question-text">{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              className={`option ${selectedAnswer === index ? (isCorrect ? 'correct' : 'wrong') : ''} ${isAnswered && index === question.correctIndex ? 'correct' : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              whileHover={{ scale: isAnswered ? 1 : 1.02 }}
              whileTap={{ scale: isAnswered ? 1 : 0.98 }}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {isAnswered && index === question.correctIndex && <Check size={20} className="icon correct-icon" />}
              {isAnswered && selectedAnswer === index && !isCorrect && <XCircle size={20} className="icon wrong-icon" />}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              className={`explanation ${isCorrect ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p>{question.explanation}</p>
              <button className="next-btn" onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? '下一题 →' : '查看结果'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .quiz-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 1rem;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .quiz-header h3 {
          color: var(--color-primary);
        }

        .progress {
          background: var(--color-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
        }

        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: var(--radius-full);
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-accent), #ffec8b);
          transition: width var(--transition-normal);
        }

        .question-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .question-text {
          font-size: 1.25rem;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: var(--color-bg);
          border: 2px solid var(--color-secondary);
          border-radius: var(--radius-md);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .option:hover:not(:disabled) {
          border-color: var(--color-primary);
          background: white;
        }

        .option:disabled {
          cursor: default;
        }

        .option.correct {
          background: rgba(34, 139, 34, 0.1);
          border-color: var(--color-success);
        }

        .option.wrong {
          background: rgba(178, 34, 34, 0.1);
          border-color: var(--color-danger);
        }

        .option-letter {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-full);
          font-weight: bold;
        }

        .option.correct .option-letter {
          background: var(--color-success);
        }

        .option.wrong .option-letter {
          background: var(--color-danger);
        }

        .option-text {
          flex: 1;
        }

        .icon {
          flex-shrink: 0;
        }

        .correct-icon {
          color: var(--color-success);
        }

        .wrong-icon {
          color: var(--color-danger);
        }

        .explanation {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: var(--radius-md);
        }

        .explanation.correct {
          background: rgba(34, 139, 34, 0.1);
          border: 1px solid var(--color-success);
        }

        .explanation.wrong {
          background: rgba(178, 34, 34, 0.1);
          border: 1px solid var(--color-danger);
        }

        .explanation p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .next-btn {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-size: 1rem;
          transition: all var(--transition-fast);
        }

        .next-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
