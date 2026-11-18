import React from "react";
import Footer from "./Footer";
import Header from "./Header";
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
import { useTranslation } from "react-i18next";

const Layout = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="layout">
      <Header />
      <div className="app">
        <div className="sidebar no_mobile">
          <div
            className="sidebarItem"
            id={props.active === 1 ? "active" : "not"}
          >
            <Link to="/moje-konto">
              <FaUser />
              <p>{t("Profil")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 2 ? "active" : "not"}
          >
            <Link to="/moje-konto/dokumenty">
              <IoMdDocument />
              <p>{t("Dokumenty")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 3 ? "active" : "not"}
          >
            <Link to="/moje-konto/przychody">
              <MdHistory />
              <p>{t("Przychody")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 4 ? "active" : "not"}
          >
            <Link to="/moje-konto/wyplaty">
              <TbMoneybag />
              <p>{t("Wypłaty")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 5 ? "active" : "not"}
          >
            <Link to="/moje-konto/pojazdy">
              <FaCar />
              <p>{t("Pojazdy")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 6 ? "active" : "not"}
          >
            <Link to="/moje-konto/faktury">
              <FaFileInvoiceDollar />
              <p>{t("Lista faktur")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 7 ? "active" : "not"}
          >
            <Link to="/moje-konto/dodaj-fakture">
              <IoIosAddCircleOutline />
              <p>{t("Dodaj fakturę")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 8 ? "active" : "not"}
          >
            <Link to="/moje-konto/partner">
              <FaHandshake />
              <p>{t("Program partnerski")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 9 ? "active" : "not"}
          >
            <Link to="/moje-konto/do-pobrania">
              <FaDownload />
              <p>{t("Do pobrania")}</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 10 ? "active" : "not"}
          >
            <Link to="/moje-konto/informacje">
              <FaRegNewspaper />
              <p>{t("Informacje")}</p>
            </Link>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
