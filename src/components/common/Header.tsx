import type { Detective } from '@/types';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  detective: Detective;
  onBack?: () => void;
  onProfileClick?: () => void;
  onCollectionClick?: () => void;
}

export function Header({ detective, onBack, onProfileClick, onCollectionClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        {onBack ? (
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="logo">
            <span className="logo-icon">🏛️</span>
            <h1 className="logo-text">历史奇探团</h1>
          </div>
        )}

        <div className="header-actions">
          <button className="action-btn" onClick={onCollectionClick} title="人物图鉴">
            <BookOpen size={20} />
          </button>
          <button className="detective-badge" onClick={onProfileClick}>
            <span className="badge-icon">{detective.badge}</span>
            <span className="badge-level">{detective.level}</span>
          </button>
        </div>
      </div>

      <div className="exp-bar">
        <div
          className="exp-fill"
          style={{ width: `${(detective.exp / detective.expToNext) * 100}%` }}
        />
        <span className="exp-text">{detective.exp}/{detective.expToNext} 经验</span>
      </div>

      <style>{`
        .header {
          background: linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-primary) 100%);
          color: var(--color-text-light);
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-md);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #ffd700 0%, #ffec8b 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: var(--color-text-light);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          transition: background var(--transition-fast);
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: var(--color-text-light);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .detective-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 100%);
          border: 2px solid rgba(255, 215, 0, 0.5);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          color: var(--color-text-light);
          transition: all var(--transition-fast);
        }

        .detective-badge:hover {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0.2) 100%);
          transform: scale(1.05);
        }

        .badge-icon {
          font-size: 1.2rem;
        }

        .badge-level {
          font-size: 0.875rem;
          text-transform: capitalize;
        }

        .exp-bar {
          max-width: 1200px;
          margin: 0.75rem auto 0;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          position: relative;
          overflow: hidden;
        }

        .exp-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-accent) 0%, #ffec8b 100%);
          border-radius: var(--radius-full);
          transition: width var(--transition-normal);
        }

        .exp-text {
          position: absolute;
          right: 0;
          top: -1.5rem;
          font-size: 0.75rem;
          opacity: 0.8;
        }
      `}</style>
    </header>
  );
}
