import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import UserWyplaty from "../../../components/Admin/User/UserWyplaty";
import UserFaktury from "../../../components/Admin/User/UserFaktury";
import UserDokumenty from "../../../components/Admin/User/UserDokumenty";
import UserPojazdy from "../../../components/Admin/User/UserPojazdy";
import UserDane from "../../../components/Admin/User/UserDane";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { getSingleUser } from "../../../api/admin";
import { NotificationError } from "../../../components/Notification";
import Loader from "../../../components/Loader";
import UserPrzychody from "../../../components/Admin/User/UserPrzychody";
import UserAddWyplata from "../../../components/Admin/User/UserAddWyplata";
import UserAddPrzychod from "../../../components/Admin/User/UserAddPrzychod";

const Home = () => {
  let { user_id } = useParams();
  const { token } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(1);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  const getUserData = async () => {
    let result = await getSingleUser(token, user_id);
    if (result.isOk) {
      setUser(result.data);
    } else {
      NotificationError(result.message);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout active={2}>
      <h1>Użytkownik: wiktor@wiktor.pl</h1>
      <div className="row adminUser">
        <div className="userTabs">
          <div
            className="tab"
            id={activeTab === 1 ? "active" : "notActive"}
            onClick={() => setActiveTab(1)}
          >
            Dane
          </div>
          <div
            className="tab"
            id={activeTab === 2 ? "active" : "notActive"}
            onClick={() => setActiveTab(2)}
          >
            Pojazdy
          </div>
          <div
            className="tab"
            id={activeTab === 3 ? "active" : "notActive"}
            onClick={() => setActiveTab(3)}
          >
            Dokumenty
          </div>
          <div
            className="tab"
            id={activeTab === 4 ? "active" : "notActive"}
            onClick={() => setActiveTab(4)}
          >
            Faktury
          </div>
          <div
            className="tab"
            id={activeTab === 5 ? "active" : "notActive"}
            onClick={() => setActiveTab(5)}
          >
            Wypłaty
          </div>
          <div
            className="tab"
            id={activeTab === 7 ? "active" : "notActive"}
            onClick={() => setActiveTab(7)}
          >
            Dodaj wypłatę
          </div>
          <div
            className="tab"
            id={activeTab === 6 ? "active" : "notActive"}
            onClick={() => setActiveTab(6)}
          >
            Przychody
          </div>
          <div
            className="tab"
            id={activeTab === 8 ? "active" : "notActive"}
            onClick={() => setActiveTab(8)}
          >
            Dodaj przychód
          </div>
        </div>
        {!loaded ? (
          <Loader />
        ) : (
          <>
            {activeTab === 1 && <UserDane data={user} />}
            {activeTab === 2 && <UserPojazdy />}
            {activeTab === 3 && <UserDokumenty />}
            {activeTab === 4 && <UserFaktury />}
            {activeTab === 5 && <UserWyplaty />}
            {activeTab === 6 && <UserPrzychody />}
            {activeTab === 7 && <UserAddWyplata />}
            {activeTab === 8 && <UserAddPrzychod />}
          </>
        )}
      </div>
    </Layout>
  );
};
export default Home;
