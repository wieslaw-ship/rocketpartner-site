import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { getSingleIncome, updateUserIncome } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const Home = () => {
  let { przychod_id } = useParams();
  const { token } = useContext(UserContext);
  let initialIncome = {
    netto: "",
    gross: "",
    provider: "",
    date_from: dayjs().format("YYYY-MM-DD HH:mm"),
    date_to: dayjs().format("YYYY-MM-DD HH:mm"),
    przejazdy: null,
    km: null,
  };
  const [income, setIncome] = useState(initialIncome);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!income.netto) {
      return NotificationError("Brak kwoty netto");
    }
    if (!income.gross) {
      return NotificationError("Brak kwoty brutto");
    }

    let _income = {
      ...income,
      date_from: moment(dayjs(income.date_from).format()).format(
        "YYYY-MM-DD HH:mm"
      ),
      date_to: moment(dayjs(income.date_to).format()).format(
        "YYYY-MM-DD HH:mm"
      ),
    };

    let result = await updateUserIncome(token, przychod_id, _income);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zedytowano przychód");
    } else {
      NotificationError(result.message);
    }
  };

  const getPrzychod = async () => {
    let result = await getSingleIncome(token, przychod_id);
    if (result.isOk) {
      setIncome(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    getPrzychod();
  }, []);

  return (
    <Layout active={7}>
      <div className="topWithAdd">
        <h1>Przychody</h1>
      </div>

      <div className="col-sm-12 col-md-12 col-lg-8 col-xl-6">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <div className="row gy-3">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Kwota netto</span>
              <TextField
                fullWidth
                value={income.netto}
                type="number"
                onChange={(e) =>
                  setIncome({ ...income, netto: e.target.value })
                }
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Kwota brutto</span>
              <TextField
                fullWidth
                value={income.gross}
                type="number"
                onChange={(e) =>
                  setIncome({ ...income, gross: e.target.value })
                }
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <FormControl fullWidth>
                <span>Źródło</span>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={income.provider}
                  onChange={(e) =>
                    setIncome({ ...income, provider: e.target.value })
                  }
                >
                  <MenuItem value={"Uber"}>Uber</MenuItem>
                  <MenuItem value={"Glovo"}>Glovo</MenuItem>
                  <MenuItem value={"Wolt"}>Wolt</MenuItem>
                  <MenuItem value={"Bolt"}>Bolt</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Data od</span>
              <LocalizationProvider
                locale="pl"
                fullWidth
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  fullWidth
                  value={dayjs(income.date_from)}
                  onChange={(e) =>
                    setIncome({
                      ...income,
                      date_from: dayjs(e).format("YYYY-MM-DD"),
                    })
                  }
                  format="YYYY-MM-DD HH:mm"
                />
              </LocalizationProvider>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Data do</span>
              <LocalizationProvider
                locale="pl"
                fullWidth
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  fullWidth
                  value={dayjs(income.date_to)}
                  onChange={(e) =>
                    setIncome({
                      ...income,
                      date_to: dayjs(e).format("YYYY-MM-DD"),
                    })
                  }
                  format="YYYY-MM-DD HH:mm"
                />
              </LocalizationProvider>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Przejazdy</span>
              <TextField
                fullWidth
                value={income.przejazdy}
                type="number"
                onChange={(e) =>
                  setIncome({ ...income, przejazdy: e.target.value })
                }
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <span>Km</span>
              <TextField
                type="number"
                fullWidth
                value={income.km}
                onChange={(e) => setIncome({ ...income, km: e.target.value })}
              />
            </div>
          </div>
          <button className="mainButton mt-4">Edytuj</button>
        </form>
      </div>
    </Layout>
  );
};
export default Home;
