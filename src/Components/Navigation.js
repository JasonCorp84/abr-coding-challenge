import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ regions }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {regions.map(region => (
          <li key={region}>
            <NavLink 
              to={`/${region}`} 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {region}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
