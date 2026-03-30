import { motion } from 'framer-motion';
import { getEraById, getCharactersByEra } from '@/data/gameData';
import { ArrowLeft } from 'lucide-react';
import type { Case } from '@/types';

interface EraDetailProps {
  eraId: string;
  onCaseSelect: (caseId: string) => void;
  onBack: () => void;
}

const difficultyLabels = {
  easy: { label: '简单', color: '#228b22', stars: 1 },
  medium: { label: '中等', color: '#daa520', stars: 2 },
  hard: { label: '困难', color: '#b22222', stars: 3 },
};

export function EraDetail({ eraId, onCaseSelect, onBack }: EraDetailProps) {
  const era = getEraById(eraId);
  const characters = getCharactersByEra(eraId);

  if (!era) {
    return <div>时代不存在</div>;
  }

  return (
    <div className="era-detail">
      <motion.div
        className="era-header"
        style={{ backgroundColor: era.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <span className="era-icon">{era.icon}</span>
        <h2 className="era-name">{era.name}</h2>
        <p className="era-period">{era.period}</p>
      </motion.div>

      <motion.div
        className="era-description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p>{era.description}</p>
      </motion.div>

      <motion.div
        className="cases-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="section-title">📜 探案任务</h3>
        <div className="cases-list">
          {era.cases.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              index={index}
              onClick={() => onCaseSelect(caseItem.id)}
            />
          ))}
        </div>
      </motion.div>

      {characters.length > 0 && (
        <motion.div
          className="characters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="section-title">👥 历史人物</h3>
          <div className="characters-grid">
            {characters.map((char) => (
              <div key={char.id} className="character-card">
                <span className="character-avatar">{char.image}</span>
                <div className="character-info">
                  <h4>{char.name}</h4>
                  <p className="character-title">{char.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <style>{`
        .era-detail {
          padding: 0;
        }

        .era-header {
          padding: 2rem;
          text-align: center;
          color: white;
          position: relative;
        }

        .back-btn {
          position: absolute;
          left: 1rem;
          top: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .era-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .era-name {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }

        .era-period {
          opacity: 0.9;
        }

        .era-description {
          background: white;
          margin: 1rem;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .era-description p {
          line-height: 1.8;
        }

        .cases-section,
        .characters-section {
          margin: 1.5rem 1rem;
        }

        .section-title {
          font-size: 1.25rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .cases-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .case-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border-left: 4px solid var(--color-primary);
          transition: all var(--transition-normal);
          cursor: pointer;
        }

        .case-card:hover {
          transform: translateX(8px);
          box-shadow: var(--shadow-lg);
        }

        .case-title {
          font-size: 1.25rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .case-description {
          color: var(--color-text);
          opacity: 0.8;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .case-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .difficulty-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: bold;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          color: #ffd700;
        }

        .star.empty {
          color: #e0e0e0;
        }

        .characters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .character-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--color-secondary);
        }

        .character-avatar {
          font-size: 3rem;
        }

        .character-info h4 {
          font-size: 1.1rem;
          color: var(--color-text);
        }

        .character-title {
          font-size: 0.875rem;
          color: var(--color-text);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}

function CaseCard({ caseItem, index, onClick }: { caseItem: Case; index: number; onClick: () => void }) {
  const difficulty = difficultyLabels[caseItem.difficulty];

  return (
    <motion.div
      className="case-card"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="case-title">{caseItem.title}</h4>
      <p className="case-description">{caseItem.description}</p>
      <div className="case-meta">
        <span
          className="difficulty-badge"
          style={{ backgroundColor: difficulty.color, color: 'white' }}
        >
          {difficulty.label}
        </span>
        <div className="stars">
          {[1, 2, 3].map((star) => (
            <span key={star} className={`star ${star > difficulty.stars ? 'empty' : ''}`}>
              ★
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
