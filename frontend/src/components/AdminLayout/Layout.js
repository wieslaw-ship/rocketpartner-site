import React from "react";
import Footer from "./Footer";
import Header from "./Header";
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

const Layout = (props) => {
  return (
    <div className="layout">
      <Header />
      <div className="app">
        <div className="sidebar no_mobile">
          <div
            className="sidebarItem"
            id={props.active === 1 ? "active" : "not"}
          >
            <Link to="/admin">
              <FaHome />
              <p>Home</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 2 ? "active" : "not"}
          >
            <Link to="/admin/uzytkownicy">
              <FaUser />
              <p>Użytkownicy</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 3 ? "active" : "not"}
          >
            <Link to="/admin/pojazdy">
              <FaCar />
              <p>Pojazdy</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 4 ? "active" : "not"}
          >
            <Link to="/admin/wyplaty">
              <TbMoneybag />
              <p>Wypłaty</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 7 ? "active" : "not"}
          >
            <Link to="/admin/przychody">
              <TbMoneybag />
              <p>Przychody</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 5 ? "active" : "not"}
          >
            <Link to="/admin/faktury">
              <FaFileInvoiceDollar />
              <p>Lista faktur</p>
            </Link>
          </div>
          <div
            className="sidebarItem"
            id={props.active === 6 ? "active" : "not"}
          >
            <Link to="/admin/dokumenty">
              <FaFile />
              <p>Lista dokumentów</p>
            </Link>
          </div>

          <div
            className="sidebarItem"
            id={props.active === 10 ? "active" : "not"}
          >
            <Link to="/admin/informacje">
              <FaRegNewspaper />
              <p>Informacje</p>
            </Link>
          </div>
        </div>
        <div className="content admin">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
