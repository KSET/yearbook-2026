import React, { useState } from 'react';

interface Member {
  firstName: string;
  lastName: string;
  quote: string;
  photo: string;
  mostLikely?: string;
}

interface GalleryProps {
  members: Member[];
  year: string;
}

const Gallery: React.FC<GalleryProps> = ({ members, year }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());



  // FUNKCIONALNOST ZA 2025. GODINU - FLIP
  if (year === "2025") {
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

    return (
      <div className="flip-card-container">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flip-card"
            onClick={() => toggleFlip(idx)}
          >
            <div
              className={`flip-card-inner ${flippedCards.has(idx) ? 'flipped' : ''}`}
            >
              {/* Prednja akd bude */}
              <div className="flip-front">
                <img
                  src={`http://localhost:5000${member.photo}`}
                  alt={`${member.firstName} ${member.lastName}`}
                />
              </div>

              {/* Forma ona */}
              <div className="flip-back">
                <h3>{member.firstName} {member.lastName}</h3>
                {member.quote && (
                  <h4>"{member.quote}"</h4>
                )}
                {member.mostLikely && (
                  <h5>{member.mostLikely}</h5>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // CAROUSEL
  const currentMember = members[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? members.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === members.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-slide bg-dark">
      {/* Indikator */}
      <ol className="carousel-indicators">
        {members.map((_, index) => (
          <li
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </ol>

      {/* Carousel traka */}
      <div className="carousel-inner">
        {members.map((member, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              className="member"
              src={`http://localhost:5000${member.photo}`}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <div className="carousel-caption d-none d-md-block member-caption">
              <h2>{member.firstName} {member.lastName}</h2>
              {member.quote && (
                <h4>"{member.quote}"</h4>
              )}
              {member.mostLikely && (
                <h5>{member.mostLikely}</h5>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Kontrola mjenjanje lijevo desno */}
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