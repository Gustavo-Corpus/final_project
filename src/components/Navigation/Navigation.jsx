import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/constants';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink 
            to={MAIN_ROUTE} 
            className={({ isActive }) => 
              `navigation__link ${isActive ? 'navigation__link_active' : ''}`
            }
          >
            Inicio
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;