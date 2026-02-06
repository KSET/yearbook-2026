import React, { useState } from 'react';

interface NavbarProps {
  years: string[];
  sectionsMap: { [key: string]: string[] };
  onSelect: (year: string, section: string) => void;
  onHome: () => void;
  selectedYear?: string;
}

const Navbar: React.FC<NavbarProps> = ({ years, sectionsMap, onSelect, onHome, selectedYear }) => {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
      <span className="navbar-brand py-0" onClick={onHome} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        KSET Yearbook
      </span>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {years.map((year) => (
            <li 
              className="nav-item dropdown" 
              key={year}
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              <button 
                className="nav-link bg-transparent border-0 dropdown-toggle" 
                style={{ cursor: 'pointer' }}
              >
                {year}
              </button>
              
              {hoveredYear === year && (sectionsMap[year]?.length ?? 0) > 0 && (
                <ul className="dropdown-menu show" style={{ display: 'block' }}>
                  {(sectionsMap[year] || []).map((section) => (
                    <li key={section}>
                      <button
                        className="dropdown-item bg-dark text-light"
                        onClick={() => onSelect(year, section)}
                        style={{ cursor: 'pointer' }}
                      >
                        {section.toUpperCase()}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          
          {selectedYear && (
            <>
              <li className="nav-item" style={{ marginLeft: '40px' }}>
                <span className="nav-link" style={{ color: 'darkorange', cursor: 'default', fontWeight: 'bold' }}>
                  Generacija {selectedYear}
                </span>
              </li>
              <li className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '20px' }}>
                {(sectionsMap[selectedYear!] || []).map((section) => (
                  <button
                    key={section}
                    className="section-btn"
                    onClick={() => onSelect(selectedYear, section)}
                  >
                    {section.toUpperCase()}
                  </button>
                ))}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;