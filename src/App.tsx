import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Header } from '@/components/common/Header';
import { TimelineMap } from '@/components/map/TimelineMap';
import { EraDetail } from '@/components/map/EraDetail';
import { Quiz } from '@/components/quiz/Quiz';
import { DetectiveProfile } from '@/components/detective/DetectiveProfile';
import { CharacterCollection } from '@/components/detective/CharacterCollection';
import type { View } from '@/types/navigation';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('map');
  const [selectedEraId, setSelectedEraId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  
  const detective = useAppStore((state) => state.detective);

  const handleEraSelect = (eraId: string) => {
    setSelectedEraId(eraId);
    setCurrentView('era-detail');
  };

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
    setIsQuizMode(true);
  };

  const handleBack = () => {
    if (isQuizMode) {
      setIsQuizMode(false);
      setSelectedCaseId(null);
    } else if (currentView === 'era-detail') {
      setCurrentView('map');
      setSelectedEraId(null);
    } else if (currentView === 'character-detail') {
      setCurrentView('era-detail');
    } else if (currentView === 'profile') {
      setCurrentView('map');
    } else if (currentView === 'collection') {
      setCurrentView('map');
    }
  };

  const handleEndQuiz = () => {
    setIsQuizMode(false);
    setSelectedCaseId(null);
    setCurrentView('era-detail');
  };

  return (
    <div className="app-container">
      <Header
        detective={detective}
        onBack={currentView !== 'map' ? handleBack : undefined}
        onProfileClick={() => setCurrentView('profile')}
        onCollectionClick={() => setCurrentView('collection')}
      />

      <main className="main-content">
        {currentView === 'map' && (
          <TimelineMap
            onEraSelect={handleEraSelect}
          />
        )}

        {currentView === 'era-detail' && selectedEraId && !isQuizMode && (
          <EraDetail
            eraId={selectedEraId}
            onCaseSelect={handleCaseSelect}
            onBack={handleBack}
          />
        )}

        {currentView === 'character-detail' && (
          <CharacterCollection
            eraId={selectedEraId}
            onCharacterClick={(id) => console.log(id)}
          />
        )}

        {currentView === 'profile' && (
          <DetectiveProfile onBack={handleBack} />
        )}

        {currentView === 'collection' && (
          <CharacterCollection onBack={handleBack} />
        )}

        {isQuizMode && selectedCaseId && (
          <Quiz
            caseId={selectedCaseId}
            onComplete={handleEndQuiz}
          />
        )}
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
