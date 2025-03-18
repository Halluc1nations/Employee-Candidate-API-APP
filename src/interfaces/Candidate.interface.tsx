// TODO: Create an interface for the Candidate objects returned by the API
import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Types
interface Candidate {
    name: string;
    login: string;
    location: string;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
}

const CandidatesContext = createContext<any>(null);

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("https://api.example.com/candidates");
      const data = await response.json();
      setCandidates(data);
      setCurrentCandidate(data[0]);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  const nextCandidate = () => {
    const remaining = candidates.slice(1);
    setCandidates(remaining);
    setCurrentCandidate(remaining.length > 0 ? remaining[0] : null);
  };

  const acceptCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
      nextCandidate();
    }
  };

  return (
    <CandidatesContext.Provider value={{ savedCandidates, setSavedCandidates }}>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/saved">Saved Candidates</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CandidateReview currentCandidate={currentCandidate} onAccept={acceptCandidate} onReject={nextCandidate} />} />
          <Route path="/saved" element={<SavedCandidates />} />
        </Routes>
      </Router>
    </CandidatesContext.Provider>
  );
};

const CandidateReview: React.FC<{ currentCandidate: Candidate | null; onAccept: () => void; onReject: () => void }> = ({ currentCandidate, onAccept, onReject }) => {
  if (!currentCandidate) {
    return <p>No more candidates available.</p>;
  }
  return (
    <div>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.name} width={100} />
      <h2>{currentCandidate.name} (@{currentCandidate.login})</h2>
      <p>Location: {currentCandidate.location || "N/A"}</p>
      <p>Email: {currentCandidate.email || "N/A"}</p>
      <p>Company: {currentCandidate.company || "N/A"}</p>
      <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
      <div>
        <button onClick={onAccept}>+</button>
        <button onClick={onReject}>-</button>
      </div>
    </div>
  );
};

const SavedCandidates: React.FC = () => {
  const { savedCandidates } = useContext(CandidatesContext);

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div>
      <h2>Saved Candidates</h2>
      {savedCandidates.map((candidate: Candidate, index: number) => (
        <div key={index}>
          <img src={candidate.avatar_url} alt={candidate.name} width={50} />
          <h3>{candidate.name} (@{candidate.login})</h3>
          <p>Location: {candidate.location || "N/A"}</p>
          <p>Email: {candidate.email || "N/A"}</p>
          <p>Company: {candidate.company || "N/A"}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
      ))}
    </div>
  );
};

export default App;
