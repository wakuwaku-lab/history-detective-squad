import { motion } from 'framer-motion';
import { characters } from '@/data/gameData';
import { ArrowLeft } from 'lucide-react';

interface CharacterCollectionProps {
  eraId?: string | null;
  onCharacterClick?: (id: string) => void;
  onBack?: () => void;
}

export function CharacterCollection({ eraId, onCharacterClick, onBack }: CharacterCollectionProps) {
  const filteredCharacters = eraId
    ? characters.filter(c => c.era === eraId)
    : characters;

  const eraNames: Record<string, string> = {
    xianqin: '先秦',
    qinhan: '秦汉',
    sanguo: '三国',
    suitang: '隋唐',
    songyuan: '宋元',
    mingqing: '明清',
  };

  return (
    <div className="collection-container">
      <motion.div
        className="collection-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {onBack ? (
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div />
        )}
        <h2>📖 历史人物图鉴</h2>
        <span className="count">{filteredCharacters.length}人</span>
      </motion.div>

      <div className="characters-grid">
        {filteredCharacters.map((char, index) => (
          <motion.div
            key={char.id}
            className="character-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => onCharacterClick?.(char.id)}
          >
            <div className="card-inner">
              <div className="avatar">{char.image}</div>
              <div className="info">
                <h4>{char.name}</h4>
                <p className="title">{char.title}</p>
                <span className="era-badge">{eraNames[char.era]}</span>
              </div>
            </div>
            <div className="skills">
              {char.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .collection-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem;
        }

        .collection-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .collection-header h2 {
          color: var(--color-primary);
          font-size: 1.5rem;
        }

        .count {
          background: var(--color-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
        }

        .back-btn {
          background: var(--color-bg);
          border: 2px solid var(--color-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .characters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .character-card {
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
        }

        .character-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-lg);
        }

        .card-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: linear-gradient(135deg, var(--color-bg) 0%, white 100%);
        }

        .avatar {
          font-size: 3.5rem;
          flex-shrink: 0;
        }

        .info {
          flex: 1;
        }

        .info h4 {
          font-size: 1.25rem;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .title {
          font-size: 0.875rem;
          color: var(--color-text);
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .era-badge {
          display: inline-block;
          background: var(--color-primary);
          color: white;
          padding: 0.125rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--color-bg);
        }

        .skill-tag {
          background: white;
          border: 1px solid var(--color-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: var(--color-primary);
        }

        @media (max-width: 600px) {
          .characters-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
