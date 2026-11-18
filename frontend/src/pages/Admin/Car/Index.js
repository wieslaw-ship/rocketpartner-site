import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { Link, useParams } from "react-router-dom";
import { getSingleCar, updateCar } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import Loader from "../../../components/Loader";

const Home = () => {
  let { car_id } = useParams();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
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

  const submitForm = async (e) => {
    e.preventDefault();
    if (newCar.type === "Samochód") {
      if (!newCar.brand) {
        return NotificationError("Brak marki pojazdu.");
      }
      if (!newCar.model) {
        return NotificationError("Brak modelu pojazdu.");
      }
      if (!newCar.registration_number) {
        return NotificationError("Brak rejestracji pojazdu");
      }
      if (!newCar.vin) {
        return NotificationError("Brak numeru VIN");
      }
      if (!newCar.year) {
        return NotificationError("Brak rocznika pojazdu");
      }
    } else if (newCar.type === "Skuter") {
      if (!newCar.brand) {
        return NotificationError("Brak marki pojazdu.");
      }
      if (!newCar.model) {
        return NotificationError("Brak modelu pojazdu.");
      }
      if (!newCar.registration_number) {
        return NotificationError("Brak rejestracji pojazdu");
      }
    } else if (newCar.type === "Inny") {
      if (!newCar.brand) {
        return NotificationError("Brak marki pojazdu.");
      }
    }
    if (!newCar.type || newCar.type === "Wybierz") {
      return NotificationError("Brak typu pojazdu.");
    }
    let result;

    result = await updateCar(token, newCar.id, newCar);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zedytowano pojazd.");
      setNewCar(initialCar);
      fetchCar();
    } else {
      NotificationError(result.message);
    }
  };

  const fetchCar = async () => {
    let result = await getSingleCar(token, car_id);
    if (result.isOk) {
      setNewCar(result.data);
    } else {
      NotificationError(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCar();
  }, [car_id]);

  return (
    <Layout active={3}>
      <h1>Pojazdy</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-6">
          <form className="formEdit" onSubmit={submitForm}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Rodzaj pojazdu
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={newCar.type ? newCar.type : "Wybierz"}
                onChange={(e) =>
                  setNewCar({
                    ...newCar,
                    type: e.target.value,
                  })
                }
                label="Rodzaj pojazdu"
              >
                <MenuItem value="Wybierz">Wybierz</MenuItem>
                <MenuItem value="Samochód">Samochód</MenuItem>{" "}
                <MenuItem value="Skuter">Skuter</MenuItem>{" "}
                <MenuItem value="Inny">Inny</MenuItem>{" "}
              </Select>
            </FormControl>
            <TextField
              placeholder="Marka"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            />
            {newCar.type !== "Inny" && (
              <>
                <TextField
                  placeholder="Model"
                  value={newCar.model}
                  onChange={(e) =>
                    setNewCar({ ...newCar, model: e.target.value })
                  }
                />
                <TextField
                  placeholder="Rejestracja"
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
                      placeholder="VIN"
                      value={newCar.vin}
                      onChange={(e) =>
                        setNewCar({ ...newCar, vin: e.target.value })
                      }
                    />
                    <TextField
                      type="number"
                      placeholder="Rocznik"
                      value={newCar.year}
                      onChange={(e) =>
                        setNewCar({ ...newCar, year: e.target.value })
                      }
                    />
                  </>
                )}
              </>
            )}
            <button className="mainButton">Edytuj</button>
          </form>
        </div>
      )}
    </Layout>
  );
};
export default Home;
