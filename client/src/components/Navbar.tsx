import React, { useState } from 'react';

// Matches the old site's hardcoded section list (templates/navbar.html) - always all 9,
// even for years missing some of these folders, so a link can 404 just like the old site did.
const SECTIONS: { slug: string; label: string }[] = [
  { slug: 'bike', label: 'Bike' },
  { slug: 'disco', label: 'Disco' },
  { slug: 'dramska', label: 'Dramska' },
  { slug: 'foto', label: 'Fotoooooooo' },
  { slug: 'glazbena', label: 'Glazbena' },
  { slug: 'pijandure', label: 'Pijandure' },
  { slug: 'racunarska', label: 'Računarska' },
  { slug: 'tehnicka', label: 'Tehnička' },
  { slug: 'video', label: 'Video' },
];

// The old site used slightly different labels here ("Foto" not "Fotoooooooo") for the
// flat per-year list that appears once a generation is selected.
const SELECTED_YEAR_SECTIONS: { slug: string; label: string }[] = [
  { slug: 'bike', label: 'Bike' },
  { slug: 'disco', label: 'Disco' },
  { slug: 'dramska', label: 'Dramska' },
  { slug: 'foto', label: 'Foto' },
  { slug: 'glazbena', label: 'Glazbena' },
  { slug: 'pijandure', label: 'Pijandure' },
  { slug: 'racunarska', label: 'Računarska' },
  { slug: 'tehnicka', label: 'Tehnička' },
  { slug: 'video', label: 'Video' },
];

interface NavbarProps {
  years: string[];
  onSelect: (year: string, section: string) => void;
  onHome: () => void;
  selectedYear?: string;
}

const Navbar: React.FC<NavbarProps> = ({ years, onSelect, onHome, selectedYear }) => {
  const [generacijeOpen, setGeneracijeOpen] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
      <span className="navbar-brand py-0" onClick={onHome} style={{ cursor: 'pointer' }}>
        KSET Yearbook
      </span>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <span className="nav-link" onClick={onHome} style={{ cursor: 'pointer' }}>
              Početna stranica
            </span>
          </li>

          <li
            className="nav-item dropdown"
            onMouseEnter={() => setGeneracijeOpen(true)}
            onMouseLeave={() => { setGeneracijeOpen(false); setHoveredYear(null); }}
          >
            <button className="nav-link bg-transparent border-0 dropdown-toggle" style={{ cursor: 'pointer' }}>
              Generacije
            </button>

            {generacijeOpen && years.length > 0 && (
              <ul className="dropdown-menu show" style={{ display: 'block' }}>
                {years.map((year) => (
                  <li
                    className="dropend"
                    key={year}
                    onMouseEnter={() => setHoveredYear(year)}
                  >
                    <button className="dropdown-item dropdown-toggle" style={{ cursor: 'pointer' }}>
                      {year}
                    </button>
                    {hoveredYear === year && (
                      <ul className="dropdown-menu submenu">
                        {SECTIONS.map((section) => (
                          <li key={section.slug}>
                            <button
                              className="dropdown-item"
                              onClick={() => onSelect(year, section.slug)}
                              style={{ cursor: 'pointer' }}
                            >
                              {section.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {selectedYear && (
            <>
              <li className="nav-item">
                <span className="nav-link disabled" style={{ cursor: 'default' }}>
                  Generacija {selectedYear}
                </span>
              </li>
              {SELECTED_YEAR_SECTIONS.map((section) => (
                <li className="nav-item" key={section.slug}>
                  <span
                    className="nav-link"
                    onClick={() => onSelect(selectedYear, section.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    {section.label}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="navbar-nav">
          <span className="navbar-text">&copy; Fotosekcija KSET</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
