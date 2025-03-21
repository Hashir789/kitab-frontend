import './FlipCard.css';
import { FC, useState, ReactNode, MouseEvent } from 'react';

interface FlipCardProps {
  children: ReactNode;
  width?: string,
  maxWidth?: string
}

interface FlipCardSideProps {
  children: ReactNode;
  changeSection: boolean;
}

const FlipCard: FC<FlipCardProps> = ({ children, width = '100vw', maxWidth = '400px' }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLElement;
    
    if (clickedElement.getAttribute("data-flip-action") === "true") {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div className="flip-card" style={{ width, maxWidth }}>
      <div className={`flip-card-content ${flipped ? 'flipped' : ''}`}  onClick={handleFlip}>
        {children}
      </div>
    </div>
  );
};

const FlipCardFrontSide: FC<FlipCardSideProps> = ({ children, changeSection }) => {
  return (
    <div className="flip-card-front">
      <div className="flip-card-container">
        <div className={`flip-card-container-content ${changeSection ? 'change-flip-card-section': ''}`}>
          { children }
        </div>
      </div>
    </div>
  );
};

const FlipCardBackSide: FC<FlipCardSideProps> = ({ children, changeSection }) => {
  return (
    <div className="flip-card-back">
      <div className="flip-card-container">
        <div className={`flip-card-container-content ${changeSection ? 'change-flip-card-section': ''}`}>
          { children }
        </div>
      </div>
    </div>
  );
};

const FlipCardSection: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flip-card-section">{children}</div>;
};

export { FlipCard, FlipCardFrontSide, FlipCardBackSide, FlipCardSection };