import { Candidate } from "../interfaces/Candidate.interface";


const SavedCandidates: React.FC = () => {
const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
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

export default SavedCandidates;
