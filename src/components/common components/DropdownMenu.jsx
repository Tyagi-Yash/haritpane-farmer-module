import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DropdownMenu({ icon, label, translateKey, items }) {
  const { t } = useTranslation();
  return (
    <li>
      <Dropdown>
        <Dropdown.Toggle as="a">
          <span className="Icon">
            <img src={icon} alt="" />
          </span>
          <span className="Text">{translateKey ? t(translateKey) : label}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu as="ol">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.to ? (
                <NavLink to={item.to}>
                  <span className="Icon">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="DText">{item.translateKey ? t(item.translateKey) : item.label}</span>
                </NavLink>
              ) : (
                <Link>
                  <span className="Icon">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="DText">{item.translateKey ? t(item.translateKey) : item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
export default DropdownMenu;
