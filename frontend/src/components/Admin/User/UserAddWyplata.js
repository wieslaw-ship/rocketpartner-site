import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { createPaycheckAdmin } from "../../../api/admin";
import { NotificationError, NotificationSuccess } from "../../Notification";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

const UserAddWyplata = () => {
  let { user_id } = useParams();
  const { token } = useContext(UserContext);
  let initialIncome = {
    gross: "",
    netto: "",
    provider: "",
    rental_tax: null,
    comission: null,
    monthly_comission: null,
    umowa_tax: null,
    employment_costs: null,
    insurance_community: null,
    insurance_health: null,
    pit: null,
    withdraw: "",
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
    if (!income.withdraw) {
      return NotificationError("Brak kwoty wypłaty");
    }

    let result = await createPaycheckAdmin(token, user_id, income);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie dodano wypłatę");
      setIncome(initialIncome);
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-6">
          <form
            onSubmit={handleSubmit}
            className="d-flex form flex-column gap-2"
          >
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
                <span>Podatek od wynajmu</span>
                <TextField
                  fullWidth
                  value={income.rental_tax}
                  type="number"
                  onChange={(e) =>
                    setIncome({ ...income, rental_tax: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Prowizja</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.comission}
                  onChange={(e) =>
                    setIncome({ ...income, comission: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Miesięczna prowizja</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.monthly_comission}
                  onChange={(e) =>
                    setIncome({ ...income, monthly_comission: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Podatek od umowy</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.umowa_tax}
                  onChange={(e) =>
                    setIncome({ ...income, umowa_tax: e.target.value })
                  }
                />
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Koszty zatrudnienia</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.employment_costs}
                  onChange={(e) =>
                    setIncome({ ...income, employment_costs: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Ubezpieczenie społeczne</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.insurance_community}
                  onChange={(e) =>
                    setIncome({
                      ...income,
                      insurance_community: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Ubezpieczenie zdrowotne</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.insurance_health}
                  onChange={(e) =>
                    setIncome({ ...income, insurance_health: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>PIT</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.pit}
                  onChange={(e) =>
                    setIncome({ ...income, pit: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <span>Wypłata</span>
                <TextField
                  fullWidth
                  type="number"
                  value={income.withdraw}
                  onChange={(e) =>
                    setIncome({ ...income, withdraw: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="mainButton mt-4">Dodaj</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserAddWyplata;
