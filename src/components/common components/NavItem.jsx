import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavItem({ to, icon, label, translateKey }) {
  const { t } = useTranslation();
  return (
    <li>
      <NavLink to={to}>
        <span className="Icon">
          <img src={icon} alt="" />
        </span>
        <span className="Text">{translateKey ? t(translateKey) : label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
