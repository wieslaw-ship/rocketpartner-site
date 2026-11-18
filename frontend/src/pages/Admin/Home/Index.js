import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import AreaChart from "../../../components/Charts/AreaChart";
import { UserContext } from "../../../context/UserContext";
import {
  accpetDocument,
  adminData,
  adminDocuments,
  adminLineChart,
} from "../../../api/admin";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useContext(UserContext);

  const [areaData, setAreaData] = useState([]);
  const [data, setData] = useState({});
  const [documents, setDocuments] = useState([]);

  const getUsersData = async () => {
    let result = await adminData(token);
    if (result.isOk) {
      setData(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  const getUsersDocuments = async () => {
    let result = await adminDocuments(token, 0, "");
    if (result.isOk) {
      setDocuments(result.data.items);
    } else {
      NotificationError(result.message);
    }
  };

  const getLineChartData = async () => {
    let result = await adminLineChart(token);
    if (result.isOk) {
      setAreaData(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    getUsersData();
    getUsersDocuments();
    getLineChartData();
  }, []);

  const handleAccpetFile = async (document_id) => {
    let result = await accpetDocument(token, document_id);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zaakceptowano dokument");
      getUsersDocuments();
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={1}>
      <h1>Panel administratora</h1>
      <div className="row mt-5">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <section>
                <p className="main">Zarejestrowanych użytkowników</p>
                <div className="counter">{data.users}</div>
              </section>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <section>
                <p className="main">Zarejestrowanych pojazdów</p>
                <div className="counter">{data.cars}</div>
              </section>
            </div>
          </div>
          <section className="mt-4">
            <p className="main">Ostatnio przesłane dokumenty:</p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td>Nazwa dokumentu</td>
                    <td>Dokument</td>
                    <td>Status</td>
                    <td>Zaakceptuj</td>
                  </tr>
                </thead>
                <tbody>
                  {documents.length > 0 &&
                    documents.map((d) => (
                      <tr>
                        <td>{d.name}</td>
                        <td>
                          <Link to={d.file} target="_blank">
                            Podgląd
                          </Link>
                        </td>
                        <td>
                          {d.accepted ? (
                            <p className="success green">Zaakceptowano</p>
                          ) : (
                            <p className="success error"> Nie zaakceptowano</p>
                          )}
                        </td>
                        <td>
                          <button
                            className="mainButton py-1"
                            onClick={() => handleAccpetFile(d.id)}
                          >
                            {!d.accepted ? <>Akceptuj</> : <>Anuluj</>}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <p className="main">Rejestracje od początku roku</p>
          <AreaChart data={areaData} />
        </div>
      </div>
    </Layout>
  );
};
export default Home;
