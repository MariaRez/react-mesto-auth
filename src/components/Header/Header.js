import './Header.css';
import logo from "../../images/Vector.svg";

function Header () {
    return (
        <header className="header">
        <img
          className="logo"
          src={logo}
          alt="Логотоп Место Россия"
        />
      </header>
    );
}

export default Header;