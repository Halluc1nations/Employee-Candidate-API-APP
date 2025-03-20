import { searchGithub, searchGithubUser } from '../api/API';
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
      const fetchCandidates = async () => {
        try {
          const data: Candidate [] = await searchGithub();
          const detailedCandidates = await Promise.all(
            data.map(async (candidate: Candidate) => await searchGithubUser(candidate.login))
          );
          setCandidates(detailedCandidates);
          setCurrentCandidate(detailedCandidates.length > 0 ? detailedCandidates[0] : null);
        } catch (error) {
          console.error("Error fetching candidates", error);
        }
      };

      fetchCandidates();
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