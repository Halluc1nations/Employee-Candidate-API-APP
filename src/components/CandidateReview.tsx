import { Candidate } from "../interfaces/Candidate.interface";

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
  
  export default CandidateReview;