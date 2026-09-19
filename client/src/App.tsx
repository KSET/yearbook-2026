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

const MANIFEST_URL = '/static/manifest.json';

interface Manifest {
  years: string[];
  sections: { [key: string]: string[] };
}

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
      fetch(`/static/json/${year}/${section}.json`)
        .then(res => {
          if (!res.ok) throw new Error(`Section not found: ${year}/${section}`);
          return res.json();
        })
        .then(data => {
          setMembers(data);
        })
        .catch(err => {
          console.error(err);
          setMembers([]);
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
        src="/static/photos/yearbook-logo.jpg"
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

  // Manifest se generira build/dev skriptom iz public/static/photos, pa ne treba backend
  useEffect(() => {
    fetch(MANIFEST_URL)
      .then(res => res.json())
      .then((manifest: Manifest) => {
        setYears(manifest.years);
        setSections(manifest.sections);
      })
      .catch(err => {
        console.error('Error fetching manifest:', err);
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