
import { Candidate } from "../interfaces/Candidate.interface";
import {useState} from "react";

const SavedCandidates: React.FC = () => {
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(JSON.parse(localStorage.getItem("savedCandidates") || "[]"));
 
const removeCandidate = (login: string) => {
  const updatedCandidates = savedCandidates.filter((candidate: Candidate) => candidate.login !== login);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
};

//write a state hook that stores savedCandidates
//will have a set property that will set saved candidates.
//set the initial value to JSON.parse(localStorage.getItem("savedCandidates") || "[]");

if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }
  console.log(localStorage.getItem("savedCandidates"));
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
          <button onClick={() => removeCandidate(candidate.login)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;
