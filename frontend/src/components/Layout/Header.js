import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaDownload, FaRegNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdDocument } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LANGUAGES } from "../../constants";
import { useTranslation } from "react-i18next";
import { getMyData } from "../../api/auth";
const Header = () => {
  const authCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const [user, setUser] = useState({});

  const getMeUser = async () => {
    let result = await getMyData(authCtx.token);
    if (result.isOk) {
      setUser(result.data);
    } else {
      navigate("/");
    }
  };

  const handleSignOut = () => {
    authCtx.logout();
    navigate("/zaloguj-sie");
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "pl"
  );

  useEffect(() => {
    getMeUser();
  }, []);
  const [lang, setLang] = useState({});

  const handleLanguageChange = (event) => {
    LANGUAGES.map((l) => {
      if (l.code === event) {
        setLang(l);
      }
    });
    const newLanguage = event;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    LANGUAGES.map((l) => {
      if (l.code === selectedLanguage) {
        setLang(l);
      }
    });
  }, []);

  return (
    <>
      <div className="container-fluid" id="header">
        <img src="/logo.png" className="logo" />
        <div className="onlymobile menuMobile">
          <GiHamburgerMenu onClick={toggleMenu} />
        </div>
        <div className="menuTopRight ">
          {user && user.is_admin && (
            <Link to="/admin" className="no_mobile">
              <button>Admin</button>
            </Link>
          )}

          <div class="dropdown languages">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={lang.image} />
              {lang.label}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {LANGUAGES.map((l) => (
                <li onClick={() => handleLanguageChange(l.code)}>{l.label}</li>
              ))}
            </ul>
          </div>

          <button onClick={handleSignOut} className="no_mobile">
            {t("Wyloguj")}
          </button>
        </div>
      </div>
      {showMobileMenu && (
        <div className="mobileMenu">
          <div className="container-fluid" id="header">
            <img src="/logo.png" className="logo" />

            <div className="onlymobile menuMobile">
              <IoMdClose onClick={toggleMenu} />
            </div>

            <button onClick={handleSignOut} className="no_mobile">
              {t("Wyloguj")}
            </button>
          </div>
          <div className="sidebar">
            <div className="sidebarItem">
              <Link to="/moje-konto">
                <FaUser />
                <p>{t("Profil")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/dokumenty">
                <IoMdDocument />
                <p>{t("Dokumenty")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/przychody">
                <MdHistory />
                <p>{t("Przychody")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/wyplaty">
                <TbMoneybag />
                <p>{t("Wypłaty")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/pojazdy">
                <FaCar />
                <p>{t("Pojazdy")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/faktury">
                <FaFileInvoiceDollar />
                <p>{t("Lista faktur")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/dodaj-fakture">
                <IoIosAddCircleOutline />
                <p>{t("Dodaj fakturę")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/partner">
                <FaHandshake />
                <p>{t("Program partnerski")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/do-pobrania">
                <FaDownload />
                <p>{t("Do pobrania")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <Link to="/moje-konto/informacje">
                <FaRegNewspaper />
                <p>{t("Informacje")}</p>
              </Link>
            </div>
            <div className="sidebarItem">
              <button onClick={handleSignOut} className="mt-4 mainButton">
                {t("Wyloguj się")}
              </button>
            </div>
            <div className="sidebarItem">
              {user && user.is_admin && (
                <Link to="/admin">
                  <button className="mainButton">Admin</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
