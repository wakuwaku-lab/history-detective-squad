import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { ArrowLeft, Award, Target, TrendingUp } from 'lucide-react';

const levelInfo = {
  apprentice: { name: '见习侦探', icon: '🔍', color: '#9e9e9e' },
  junior: { name: '初级侦探', icon: '🗺️', color: '#4caf50' },
  senior: { name: '高级侦探', icon: '📜', color: '#2196f3' },
  master: { name: '侦探大师', icon: '👑', color: '#9c27b0' },
  legend: { name: '传奇侦探', icon: '⭐', color: '#ffd700' },
};

interface DetectiveProfileProps {
  onBack: () => void;
}

export function DetectiveProfile({ onBack }: DetectiveProfileProps) {
  const detective = useAppStore((state) => state.detective);

  const level = levelInfo[detective.level];
  const completedCases = detective.cases.length;

  return (
    <div className="profile-container">
      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h2>我的档案</h2>
      </motion.div>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="avatar-section">
          <div className="avatar">
            {level.icon}
          </div>
          <h3 className="detective-name">{detective.name}</h3>
          <span className="level-badge" style={{ backgroundColor: level.color }}>
            {level.icon} {level.name}
          </span>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <Target size={24} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{completedCases}</span>
              <span className="stat-label">完成案件</span>
            </div>
          </div>

          <div className="stat-item">
            <Award size={24} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{detective.exp}/{detective.expToNext}</span>
              <span className="stat-label">经验值</span>
            </div>
          </div>

          <div className="stat-item">
            <TrendingUp size={24} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{detective.score}</span>
              <span className="stat-label">积分</span>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>升级进度</span>
            <span>{Math.round((detective.exp / detective.expToNext) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(detective.exp / detective.expToNext) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="achievements-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>📜 侦探档案</h3>
        <div className="achievements-list">
          <div className="achievement">
            <span className="achievement-icon">🏛️</span>
            <span>先秦探索者</span>
          </div>
          <div className={`achievement ${detective.cases.length >= 3 ? 'earned' : 'locked'}`}>
            <span className="achievement-icon">⚔️</span>
            <span>秦汉征服者</span>
          </div>
          <div className={`achievement ${detective.cases.length >= 6 ? 'earned' : 'locked'}`}>
            <span className="achievement-icon">🛡️</span>
            <span>三国英雄</span>
          </div>
          <div className={`achievement ${detective.cases.length >= 10 ? 'earned' : 'locked'}`}>
            <span className="achievement-icon">⭐</span>
            <span>历史大师</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .profile-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .profile-header h2 {
          color: var(--color-primary);
          font-size: 1.75rem;
        }

        .back-btn {
          background: var(--color-bg);
          border: 2px solid var(--color-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .profile-card {
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .avatar-section {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-bg-dark) 100%);
          padding: 2rem;
          text-align: center;
          color: white;
        }

        .avatar {
          font-size: 5rem;
          margin-bottom: 0.5rem;
          animation: pulse 2s ease-in-out infinite;
        }

        .detective-name {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .level-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          color: white;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-icon {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-text);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--color-text);
          opacity: 0.7;
        }

        .progress-section {
          padding: 0 1.5rem 1.5rem;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .progress-bar {
          height: 12px;
          background: #e0e0e0;
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-accent), #ffec8b);
          border-radius: var(--radius-full);
        }

        .achievements-section {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .achievements-section h3 {
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .achievements-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .achievement {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--color-bg);
          border-radius: var(--radius-md);
          border: 2px solid #e0e0e0;
        }

        .achievement.earned {
          border-color: var(--color-accent);
          background: rgba(255, 215, 0, 0.1);
        }

        .achievement.locked {
          opacity: 0.5;
        }

        .achievement-icon {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}
