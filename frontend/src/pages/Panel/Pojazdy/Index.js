import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserContext } from "../../../context/UserContext";
import { createCar, deleteCar, getMyCars, updateCar } from "../../../api/user";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [przychody, setPrzychody] = useState([]);
  const { token } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  let initialCar = {
    type: "Samochód",
    registration_number: "",
    brand: "",
    model: "",
    vin: "",
    year: null,
    is_taxi: false,
    is_active: true,
  };
  const [newCar, setNewCar] = useState(initialCar);

  const fetchUsers = async () => {
    let result = await getMyCars(token);
    if (result.isOk) {
      setPrzychody(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  const handleEdit = async (data_in) => {
    setNewCar(data_in);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (newCar.type === "Samochód") {
      if (!newCar.brand) {
        return NotificationError(t("Brak marki pojazdu."));
      }
      if (!newCar.model) {
        return NotificationError("Brak modelu pojazdu.");
      }
      if (!newCar.registration_number) {
        return NotificationError(t("Brak rejestracji pojazdu"));
      }
      if (!newCar.vin) {
        return NotificationError(t("Brak numeru VIN"));
      }
      if (!newCar.year) {
        return NotificationError(t("Brak rocznika pojazdu"));
      }
    } else if (newCar.type === "Skuter") {
      if (!newCar.brand) {
        return NotificationError(t("Brak marki pojazdu."));
      }
      if (!newCar.model) {
        return NotificationError(t("Brak modelu pojazdu."));
      }
      if (!newCar.registration_number) {
        return NotificationError(t("Brak rejestracji pojazdu"));
      }
    } else if (newCar.type === "Inny") {
      if (!newCar.brand) {
        return NotificationError(t("Brak marki pojazdu."));
      }
    }
    if (!newCar.type || newCar.type === "Wybierz") {
      return NotificationError(t("Brak typu pojazdu."));
    }
    let result;

    if (newCar.id) {
      result = await updateCar(token, newCar.id, newCar);
      if (result.isOk) {
        NotificationSuccess(t("Pomyślnie zedytowano pojazd."));
        setNewCar(initialCar);
        fetchUsers();
      } else {
        NotificationError(result.message);
      }
    } else {
      result = await createCar(token, newCar);
      if (result.isOk) {
        NotificationSuccess(t("Pomyślnie dodano pojazd."));
        setNewCar(initialCar);
        fetchUsers();
      } else {
        NotificationError(result.message);
      }
    }
  };

  const handleRemove = async (car_id) => {
    let result = await deleteCar(token, car_id);
    if (result.isOk) {
      NotificationSuccess(t("Pomyślnie usunięto samochód"));
      fetchUsers();
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={5}>
      {modalOpen && (
        <div className="modalOverlay">
          <div className="modalInner">
            <div className="closeForm" onClick={() => setModalOpen(!modalOpen)}>
              ×
            </div>
            <form onSubmit={submitForm}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("Rodzaj pojazdu")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={newCar.type ? newCar.type : t("Wybierz")}
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
                      type: e.target.value,
                    })
                  }
                  label={t("Rodzaj pojazdu")}
                >
                  <MenuItem value="Wybierz"> {t("Wybierz")}</MenuItem>
                  <MenuItem value="Samochód">{t("Samochód")}</MenuItem>{" "}
                  <MenuItem value="Skuter">{t("Skuter")}</MenuItem>{" "}
                  <MenuItem value="Inny">{t("Inny")}</MenuItem>{" "}
                </Select>
              </FormControl>
              <TextField
                placeholder={t("Marka")}
                value={newCar.brand}
                onChange={(e) =>
                  setNewCar({ ...newCar, brand: e.target.value })
                }
              />
              {newCar.type !== "Inny" && (
                <>
                  <TextField
                    placeholder={t("Model")}
                    value={newCar.model}
                    onChange={(e) =>
                      setNewCar({ ...newCar, model: e.target.value })
                    }
                  />
                  <TextField
                    placeholder={t("Rejestracja")}
                    value={newCar.registration_number}
                    onChange={(e) =>
                      setNewCar({
                        ...newCar,
                        registration_number: e.target.value,
                      })
                    }
                  />
                  {newCar.type !== "Skuter" && (
                    <>
                      <TextField
                        placeholder={t("VIN")}
                        value={newCar.vin}
                        onChange={(e) =>
                          setNewCar({ ...newCar, vin: e.target.value })
                        }
                      />
                      <TextField
                        type="number"
                        placeholder={t("Rocznik")}
                        value={newCar.year}
                        onChange={(e) =>
                          setNewCar({ ...newCar, year: e.target.value })
                        }
                      />
                    </>
                  )}
                </>
              )}
              <button className="mainButton">{t("Dodaj")}</button>
            </form>
          </div>
        </div>
      )}
      <h1 className="d-flex justify-content-between">
        {t("Pojazdy")}
        <button className="mainButton" onClick={() => setModalOpen(!modalOpen)}>
          {t("Dodaj pojazd")}
        </button>
      </h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <td> {t("Rodzaj")}</td>
              <td> {t("Rejestracja")}</td>
              <td> {t("Marka")}</td>
              <td> {t("Model")}</td>
              <td> {t("VIN")}</td>
              <td> {t("Rocznik")}</td>
              <td> {t("Taxi")}</td>
              <td> {t("Aktywny")}</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {przychody.length > 0 &&
              przychody.map((car, i) => (
                <tr key={car.id}>
                  <td>{car.type}</td>
                  <td>{car.registration_number}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.vin}</td>
                  <td>{car.year ? car.year : ""}</td>
                  <td>
                    {car.is_taxi ? (
                      <span className="green">{t("TAK")}</span>
                    ) : (
                      <span className="red">{t("NIE")}</span>
                    )}
                  </td>
                  <td>
                    {car.is_active ? (
                      <span className="green">{t("TAK")}</span>
                    ) : (
                      <span className="red">{t("NIE")}</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="mainButton"
                      onClick={() => handleEdit(car)}
                    >
                      {t("Edytuj")}
                    </button>
                  </td>
                  <td>
                    <button
                      className="remove"
                      onClick={() => handleRemove(car.id)}
                    >
                      {t("Usuń")}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Index;
