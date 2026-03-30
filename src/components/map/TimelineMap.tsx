import { motion } from 'framer-motion';
import clsx from 'clsx';

interface TimelineMapProps {
  onEraSelect: (eraId: string) => void;
}

export function TimelineMap({ onEraSelect }: TimelineMapProps) {
  const eras = [
    { id: 'xianqin', name: '先秦', period: '公元前2070-公元前221年', icon: '🏛️', color: '#8b4513', unlocked: true },
    { id: 'qinhan', name: '秦汉', period: '公元前221-公元220年', icon: '⚔️', color: '#2c3e50', unlocked: true },
    { id: 'sanguo', name: '三国', period: '公元220-420年', icon: '🛡️', color: '#c0392b', unlocked: false },
    { id: 'suitang', name: '隋唐', period: '公元581-907年', icon: '🏯', color: '#e74c3c', unlocked: false },
    { id: 'songyuan', name: '宋元', period: '公元960-1368年', icon: '📚', color: '#9b59b6', unlocked: false },
    { id: 'mingqing', name: '明清', period: '公元1368-1912年', icon: '🐉', color: '#1abc9c', unlocked: false },
  ];

  return (
    <div className="timeline-container">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="hero-title">🕵️ 穿越时空，探索历史</h2>
        <p className="hero-subtitle">选择一段历史时期，开始你的侦探冒险！</p>
      </motion.div>

      <div className="timeline">
        <div className="timeline-line" />
        
        {eras.map((era, index) => (
          <motion.div
            key={era.id}
            className={clsx('era-node', { locked: !era.unlocked })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <button
              className={clsx('era-btn', { locked: !era.unlocked })}
              onClick={() => era.unlocked && onEraSelect(era.id)}
              disabled={!era.unlocked}
            >
              <span className="era-icon">{era.unlocked ? era.icon : '🔒'}</span>
              <span className="era-name">{era.name}</span>
              <span className="era-period">{era.period}</span>
            </button>
            
            {index < eras.length - 1 && (
              <div className="connector">
                <div className={clsx('connector-line', { locked: !era.unlocked })} />
                <span className="connector-arrow">→</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="detective-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="intro-card">
          <div className="intro-avatar">🔍</div>
          <div className="intro-content">
            <h3>欢迎，小侦探！</h3>
            <p>
              我是历史奇探团的主角——<strong>小探</strong>。我将带你穿越时空，
              探索中华五千年文明的精彩故事！通过解谜、答题、收集人物卡牌，
              成为一个真正的历史小侦探！
            </p>
          </div>
        </div>
      </motion.div>

      <style>{`
        .timeline-container {
          padding: 1rem;
        }

        .hero-section {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-title {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .hero-subtitle {
          color: var(--color-text);
          opacity: 0.8;
        }

        .timeline {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          padding: 2rem 0;
          margin: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%);
          transform: translateY(-50%);
          z-index: 0;
          display: none;
        }

        .era-node {
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .era-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border: 3px solid var(--color-secondary);
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
          min-width: 140px;
          box-shadow: var(--shadow-md);
        }

        .era-btn:hover:not(.locked) {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
          border-color: var(--color-accent);
        }

        .era-btn.locked {
          background: #e0e0e0;
          border-color: #bdbdbd;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .era-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          animation: float 3s ease-in-out infinite;
        }

        .era-btn.locked .era-icon {
          animation: none;
        }

        .era-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--color-text);
        }

        .era-period {
          font-size: 0.75rem;
          color: var(--color-text);
          opacity: 0.7;
          margin-top: 0.25rem;
        }

        .connector {
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
        }

        .connector-line {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
        }

        .connector-line.locked {
          background: #bdbdbd;
        }

        .connector-arrow {
          color: var(--color-primary);
          font-size: 1.5rem;
        }

        .detective-intro {
          margin-top: 2rem;
        }

        .intro-card {
          display: flex;
          gap: 1.5rem;
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 2px solid var(--color-secondary);
        }

        .intro-avatar {
          font-size: 4rem;
          animation: pulse 2s ease-in-out infinite;
        }

        .intro-content h3 {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .intro-content p {
          line-height: 1.8;
          color: var(--color-text);
        }

        .intro-content strong {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .era-btn {
            min-width: 120px;
            padding: 1rem;
          }

          .era-icon {
            font-size: 2.5rem;
          }

          .connector {
            display: none;
          }

          .intro-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
