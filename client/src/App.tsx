import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import './App.css';

interface Member {
  firstName: string;
  lastName: string;
  quote: string;
  photo: string;
  mostLikely?: string;
}

const SECTIONS_BASE_URL = 'http://localhost:5000/api/yearbook';
const YEARS_URL = 'http://localhost:5000/api/years';

interface GalleryPageProps {
  selectedYear: string | null;
  onYearSelect: (year: string | null) => void;
}

function GalleryPage({ selectedYear, onYearSelect }: GalleryPageProps) {
  const { year, section } = useParams<{ year: string; section: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  
  useEffect(() => {
    if (year) {
      onYearSelect(year);
    }
  }, [year, onYearSelect]);

  useEffect(() => {
    if (year && section) {
      fetch(`http://localhost:5000/api/yearbook/${year}/${section}`)
        .then(res => res.json())
        .then(data => {
          setMembers(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [year, section]);


  return (
    <div className="pt-5 mt-3">
      {/* Section and Year Header 
        {section} {year}
      </h2>*/}
      <Gallery members={members} year={year || ""} />
    </div>
  );
}

function HomePage() {
  return (
    <div className="home-screen">
      <img 
        src="http://localhost:5000/static/photos/yearbook-logo.jpg" 
        alt="KSET Yearbook" 
        className="main-logo"
      />
    </div>
  );
}

function App() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [sections, setSections] = useState<{ [key: string]: string[] }>({});

  // Fetch godine iz foldera
  useEffect(() => {
    fetch(YEARS_URL)
      .then(res => res.json())
      .then(data => {
        setYears(data);
        // Sekcije za godinu jer medija sada postoji i ne mogu hardkodirati :D 
        data.forEach((year: string) => {
          fetch(`${SECTIONS_BASE_URL}/${year}/sections`)
            .then(res => res.json())
            .then(sectionData => {
              setSections(prev => ({
                ...prev,
                [year]: sectionData
              }));
            })
            .catch(err => console.error(`Error fetching sections for ${year}:`, err));
        });
      })
      .catch(err => {
        console.error('Error fetching years:', err);
      });
  }, []);

  const handleHome = () => {
    setSelectedYear(null);
    window.location.href = '/';
  };

  const handleSelect = (y: string, s: string) => {
    setSelectedYear(y);
    window.location.href = `/${y}/${s}`;
  };



  return (
    <Router>
      <div className="app-container bg-dark min-vh-100">
        <Navbar 
          years={years}
          sectionsMap={sections}
          onSelect={handleSelect}
          onHome={handleHome}
          selectedYear={selectedYear || undefined}
        />
        
        <main className="container-fluid p-0">
          <Routes>
            <Route path="/:year/:section" element={<GalleryPage selectedYear={selectedYear} onYearSelect={setSelectedYear} />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;