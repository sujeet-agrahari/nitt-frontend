import { Link } from 'react-router-dom';

const StyledLink = ({ to, style = {}, children }) => (
  <Link to={to} style={{ ...style, textDecoration: 'none' }}>
    {children}
  </Link>
);

export default StyledLink;
