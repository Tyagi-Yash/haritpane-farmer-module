import { NavLink } from "react-router-dom";

function NavItem({ to, icon, label }) {
  return (
    <li>
      <NavLink to={to}>
        <span className="Icon">
          <img src={icon} alt="" />
        </span>
        <span className="Text">{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
