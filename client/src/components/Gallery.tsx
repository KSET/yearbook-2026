import React, { useState, useEffect } from 'react';

interface Member {
  firstName?: string;
  lastName?: string;
  quote?: string;
  mostLikely?: string;
  photo?: string;   // carousel item (single photo per member)
  photo1?: string;  // flip-enabled carousel item - front
  photo2?: string;  // flip-enabled carousel item - back
}

interface GalleryProps {
  members: Member[];
  year: string;
}

const Gallery: React.FC<GalleryProps> = ({ members, year }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const isFlipMode = year === "2025";

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? members.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === members.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  // TIPKOVNICA LOOP CAROUSEL WOOO
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrentIndex(prev => (prev === 0 ? members.length - 1 : prev - 1));
      } else if (event.key === "ArrowRight") {
        setCurrentIndex(prev => (prev === members.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [members.length]);

  return (
    <div className="carousel-slide bg-dark">
      {/* Indicators */}
      <ol className="carousel-indicators">
        {members.map((_, index) => (
          <li
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </ol>

      {/* Carousel items */}
      <div className="carousel-inner">
        {members.map((member, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            {isFlipMode ? (
              <div
                className="flip-carousel-item"
                onClick={() => toggleFlip(index)}
              >
                <div className={`flip-card-inner ${flippedCards.has(index) ? 'flipped' : ''}`}>
                  <div className="flip-front">
                    <img
                      src={member.photo1}
                      alt={member.firstName ? `${member.firstName} ${member.lastName}` : 'Flip photo front'}
                    />
                  </div>
                  <div className="flip-back">
                    <img
                      src={member.photo2}
                      alt={member.firstName ? `${member.firstName} ${member.lastName}` : 'Flip photo back'}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img
                  className="member"
                  src={member.photo}
                  alt={`${member.firstName} ${member.lastName}`}
                />
                <div className="carousel-caption d-none d-md-block member-caption">
                  <h2>{member.firstName} {member.lastName}</h2>
                  {member.quote && <h4>"{member.quote}"</h4>}
                  {member.mostLikely && <h5>{member.mostLikely}</h5>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        onClick={handlePrevious}
        aria-label="Previous"
      >
        ❮
      </button>
      <button
        className="carousel-control-next"
        onClick={handleNext}
        aria-label="Next"
      >
        ❯
      </button>
    </div>
  );
};

export default Gallery;
