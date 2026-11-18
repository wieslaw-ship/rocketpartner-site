import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaDownload, FaFile, FaRegNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdDocument } from "react-icons/io";
import { FaHome, FaUser } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const authCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const handleSignOut = () => {
    authCtx.logout();
    navigate("/zaloguj-sie");
  };
  return (
    <>
      <div className="container-fluid" id="header">
        <img src="/logo.png" className="logo" />
        <div className="onlymobile menuMobile">
          <GiHamburgerMenu onClick={toggleMenu} />
        </div>
        <button onClick={handleSignOut} className="no_mobile">
          Wyloguj się
        </button>
      </div>
      {showMobileMenu && (
        <div className="mobileMenu">
          <div className="container-fluid" id="header">
            <img src="/logo.png" className="logo" />
            <div className="onlymobile menuMobile">
              <IoMdClose onClick={toggleMenu} />
            </div>
            <button onClick={handleSignOut} className="no_mobile">
              Wyloguj się
            </button>
          </div>
          <div className="sidebar">
            <div className="sidebarItem">
              <Link to="/admin">
                <FaHome />
                <p>Home</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/uzytkownicy">
                <FaUser />
                <p>Użytkownicy</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/pojazdy">
                <FaCar />
                <p>Pojazdy</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/wyplaty">
                <TbMoneybag />
                <p>Wypłaty</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/przychody">
                <TbMoneybag />
                <p>Przychody</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/faktury">
                <FaFileInvoiceDollar />
                <p>Lista faktur</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/admin/dokumenty">
                <FaFile />
                <p>Lista dokumentów</p>
              </Link>
            </div>

            <div className="sidebarItem">
              <Link to="/admin/informacje">
                <FaRegNewspaper />
                <p>Informacje</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <button onClick={handleSignOut} className="mt-4 mainButton">
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
