const Nav: React.FC = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", padding: "10px" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/saved">Saved Candidates</Link></li>
      </ul>
    </nav>
  );
};


export default Nav;
