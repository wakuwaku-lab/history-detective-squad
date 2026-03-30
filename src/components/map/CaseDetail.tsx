import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface CaseDetailProps {
  caseId: string;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function CaseDetail({ caseId, onStartQuiz, onBack }: CaseDetailProps) {
  const [era, caseItem] = (() => {
    const allEras = [
      { id: 'xianqin', cases: [
        { id: 'xianqin-1', title: '青铜器的秘密', description: '商朝工匠铸造青铜器时遇到了神秘的问题，帮助他们找出答案！', difficulty: 'easy' as const, reward: 30, questions: [] },
        { id: 'xianqin-2', title: '诸子百家', description: '孔子的学生们遇到了难题', difficulty: 'medium' as const, reward: 50, questions: [] },
      ]},
      { id: 'qinhan', cases: [
        { id: 'qinhan-1', title: '秦统一六国', description: '秦始皇完成了统一大业', difficulty: 'easy' as const, reward: 30, questions: [] },
      ]},
      { id: 'sanguo', cases: [
        { id: 'sanguo-1', title: '赤壁之战', description: '曹操率军南下', difficulty: 'medium' as const, reward: 40, questions: [] },
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

  if (!era || !caseItem) {
    return <div>案件不存在</div>;
  }

  return (
    <div className="case-detail">
      <motion.div
        className="case-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button className="back-btn" onClick={onBack}>← 返回</button>
        <div className="case-badge">
          <MapPin size={20} />
          <span>{era.id}</span>
        </div>
      </motion.div>

      <motion.div
        className="case-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>{caseItem.title}</h2>
        <p className="description">{caseItem.description}</p>
        
        <div className="meta">
          <span className={`difficulty ${caseItem.difficulty}`}>
            {caseItem.difficulty === 'easy' ? '简单' : caseItem.difficulty === 'medium' ? '中等' : '困难'}
          </span>
          <span className="reward">奖励: +{caseItem.reward} 经验</span>
        </div>

        <motion.button
          className="start-btn"
          onClick={onStartQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          开始探案 🔍
        </motion.button>
      </motion.div>

      <style>{`
        .case-detail {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }

        .case-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: var(--color-primary);
          font-size: 1rem;
          cursor: pointer;
        }

        .case-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-bg);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
        }

        .case-content {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          text-align: center;
        }

        .case-content h2 {
          color: var(--color-primary);
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .description {
          color: var(--color-text);
          opacity: 0.8;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .meta {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: white;
        }

        .difficulty.easy { background: #228b22; }
        .difficulty.medium { background: #daa520; }
        .difficulty.hard { background: #b22222; }

        .reward {
          background: rgba(255, 215, 0, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          color: var(--color-primary);
        }

        .start-btn {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-bg-dark) 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: var(--radius-full);
          font-size: 1.25rem;
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
