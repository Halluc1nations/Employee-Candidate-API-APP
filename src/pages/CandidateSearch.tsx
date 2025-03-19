import { searchGithub } from '../api/API';
import React, { useEffect, useState } from "react";
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateReview from '../components/CandidateReview';

const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
      return JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    });
  
    useEffect(() => {
      searchGithub();
      // set candidates state variable to return value of searchGithub function
    }, []);
  
    useEffect(() => {
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }, [savedCandidates]);
  
  
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
      <div>
        <h1>Candidate Search</h1>
        <CandidateReview
          currentCandidate={currentCandidate}
          onAccept={acceptCandidate}
          onReject={nextCandidate}
        />
  
      </div>
    );
};
  
  

export default CandidateSearch;