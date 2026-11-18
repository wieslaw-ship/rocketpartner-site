import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import moment from "moment";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import {
  getSingleInvoice,
  getUserCars,
  updateInvoice,
  uploadInvoiceFile,
} from "../../../api/admin";
import Loader from "../../../components/Loader";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  let { invoice_id } = useParams();
  const { token } = useContext(UserContext);
  const [cars, setCars] = useState([]);
  let initialInvoiceVAT = {
    gross: undefined,
    netto: undefined,
    vat: undefined,
    vat_type: "",
  };

  let initialInvoice = {
    seller_nip: "",
    seller_name: "",
    seller_address: "",
    type: "car",
    file: "",
    car_id: undefined,
    number: "",
    date: null,
    invoiceVAT: [initialInvoiceVAT],
  };

  const handleCar = (e) => {
    let val = e.target.value;
    if (val === "Wybierz") {
      return;
    } else {
      if (val.isInteger()) {
        setInvoice({ ...invoice, car_id: e.target.value });
      }
    }
  };

  const [invoice, setInvoice] = useState(initialInvoice);

  const nipRegex = /^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/;

  const fetchCars = async () => {
    let result_invoice = await getSingleInvoice(token, invoice_id);
    if (result_invoice.isOk) {
      setInvoice({
        ...result_invoice.data,
        date: dayjs(result_invoice.date).format(),
      });
      let result = await getUserCars(token, result_invoice.data.user_id);
      if (result.isOk) {
        setCars(result.data);
      } else {
        NotificationError(result.message);
      }
    }
    setLoaded(true);
  };

  const handleDeleteItem = (index) => {
    let new_current = invoice.invoiceVAT.filter((item, i) => i !== index);
    setInvoice({ ...invoice, invoiceVAT: new_current });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const [file, setFile] = useState(null);

  const handleAdd = () => {
    let current = [...invoice.invoiceVAT];
    current.push(initialInvoiceVAT);
    setInvoice({ ...invoice, invoiceVAT: current });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!invoice.seller_nip) {
      return NotificationError("Brak nipu sprzedawcy");
    }
    if (!nipRegex.test(invoice.seller_nip)) {
      return NotificationError("Nie prawidłowy numer nip");
    }

    if (!invoice.seller_name) {
      return NotificationError("Brak nazwy sprzedawcy");
    }
    if (!invoice.seller_address) {
      return NotificationError("Brak adresu sprzedawcy");
    }
    if (!invoice.type) {
      return NotificationError("Brak typu faktury");
    }
    if (invoice.type === "car") {
      if (!invoice.car_id) {
        return NotificationError("Brak wskazania pojazdu");
      }
    }
    if (!invoice.number) {
      return NotificationError("Brak numeru faktury");
    }
    if (!invoice.date) {
      return NotificationError("Brak daty faktury");
    }
    let error = false;
    invoice.invoiceVAT.map((i) => {
      if (i.vat_type !== "Zwolniony" || i.vat_type === "0") {
        if (!i.gross || !i.netto || !i.vat) {
          error = true;
          return NotificationError(
            "Uzupełnij wartości brutto, netto i vat w pozycjach faktury."
          );
        }
      } else {
        if (!i.gross || !i.netto) {
          error = true;
          return NotificationError(
            "Uzupełnij wartości brutto, netto  w pozycjach faktury."
          );
        }
      }
    });
    if (error) {
      return;
    }
    let _invoice_data = {
      ...invoice,
      date: moment(dayjs(invoice.date).format()).format("YYYY-MM-DD"),
    };

    let result = await updateInvoice(token, invoice_id, _invoice_data);
    if (result.isOk) {
      if (file) {
        let invoice_id = result.data.id;
        let formData = new FormData();
        formData.append("file", file, file.name);
        let file_result = await uploadInvoiceFile(token, invoice_id, formData);
        if (!file_result.isOk) {
          NotificationError(file_result.message);
        }
      }
      NotificationSuccess("Pomyślnie zedytowano fakture.");
    } else {
      NotificationError(result.message);
    }
  };

  const handleBrutto = (data, index) => {
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice };
      const updatedInvoiceVAT = [...updatedInvoice.invoiceVAT];

      // Update the gross property of the Nth invoiceVAT object
      updatedInvoiceVAT[index] = {
        ...updatedInvoiceVAT[index],
        gross: data,
      };

      updatedInvoice.invoiceVAT = updatedInvoiceVAT;
      return updatedInvoice;
    });
  };

  const handleNetto = (data, index) => {
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice };
      const updatedInvoiceVAT = [...updatedInvoice.invoiceVAT];

      // Update the gross property of the Nth invoiceVAT object
      updatedInvoiceVAT[index] = {
        ...updatedInvoiceVAT[index],
        netto: data,
      };

      updatedInvoice.invoiceVAT = updatedInvoiceVAT;
      return updatedInvoice;
    });
  };
  const handleVat = (data, index) => {
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice };
      const updatedInvoiceVAT = [...updatedInvoice.invoiceVAT];

      // Update the gross property of the Nth invoiceVAT object
      updatedInvoiceVAT[index] = {
        ...updatedInvoiceVAT[index],
        vat: data,
      };

      updatedInvoice.invoiceVAT = updatedInvoiceVAT;
      return updatedInvoice;
    });
  };

  const handleTypeVat = (data, index) => {
    setInvoice((prevInvoice) => {
      const updatedInvoice = { ...prevInvoice };
      const updatedInvoiceVAT = [...updatedInvoice.invoiceVAT];

      // Update the gross property of the Nth invoiceVAT object
      updatedInvoiceVAT[index] = {
        ...updatedInvoiceVAT[index],
        vat_type: data,
      };

      updatedInvoice.invoiceVAT = updatedInvoiceVAT;
      return updatedInvoice;
    });
  };
  return (
    <Layout active={5}>
      <div className="topWithAdd">
        <h1>Faktury</h1>
      </div>

      {!loaded ? (
        <Loader />
      ) : (
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-6">
          <form onSubmit={handleSubmit} className="addInvoice">
            <div className="inputFile">
              <small>Załącz dokument</small>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="form-control"
              />
            </div>
            <hr />
            <TextField
              fullWidth
              value={invoice.seller_nip}
              onChange={(e) =>
                setInvoice({ ...invoice, seller_nip: e.target.value })
              }
              id="outlined-basic"
              label="Sprzedawca NIP"
              variant="outlined"
            />
            <TextField
              fullWidth
              value={invoice.seller_name}
              onChange={(e) =>
                setInvoice({ ...invoice, seller_name: e.target.value })
              }
              id="outlined-basic"
              label="Sprzedawca Nazwa"
              variant="outlined"
            />
            <TextField
              fullWidth
              value={invoice.seller_address}
              onChange={(e) =>
                setInvoice({ ...invoice, seller_address: e.target.value })
              }
              id="outlined-basic"
              label="Sprzedawca Adres"
              variant="outlined"
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Typ faktury
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="forCar"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="forCar"
                  onChange={(e) => setInvoice({ ...invoice, type: "car" })}
                  control={<Radio />}
                  label="Związane z eksploatacją pojazdu ( Paliwo, serwis, opony )"
                />
                <FormControlLabel
                  value="notForCar"
                  control={<Radio />}
                  onChange={(e) =>
                    setInvoice({ ...invoice, type: "notForCar" })
                  }
                  label="Nie związane z samochodem (telefon i akcesoria itp)"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Dotyczy pojazdu
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={invoice.car_id}
                label="Dotyczy pojazdu"
                onChange={handleCar}
              >
                <MenuItem value="Wybierz">Wybierz</MenuItem>
                {cars.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.model} {c.brand} - {c.registration_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Numer faktury"
              variant="outlined"
              value={invoice.number}
              onChange={(e) =>
                setInvoice({ ...invoice, number: e.target.value })
              }
            />
            <LocalizationProvider
              locale="pl"
              fullWidth
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
                value={dayjs(invoice.date)}
                onChange={(e) =>
                  setInvoice({
                    ...invoice,
                    date: dayjs(e).format("YYYY-MM-DD"),
                  })
                }
                fullWidth
                format="YYYY-MM-DD"
                label="Data faktury"
              />
            </LocalizationProvider>

            {invoice.invoiceVAT.map((object, i) => {
              return (
                <div key={i} className="row gy-3 gx-3 mt-4" id="pozycjeFaktury">
                  {i > 0 && (
                    <div className="close" onClick={() => handleDeleteItem(i)}>
                      ×
                    </div>
                  )}

                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <TextField
                      fullWidth
                      type="number"
                      id="outlined-basic"
                      value={object.gross}
                      onChange={(e) => handleBrutto(e.target.value, i)}
                      label="Wartość brutto (z VAT)"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Stawka podatku VAT
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={object.vat_type}
                        label="Stawka podatku VAT"
                        onChange={(e) => handleTypeVat(e.target.value, i)}
                      >
                        <MenuItem value={"23"}>23%</MenuItem>
                        <MenuItem value={"8"}>8%</MenuItem>
                        <MenuItem value={"5"}>5%</MenuItem>
                        <MenuItem value={"0"}>0%</MenuItem>
                        <MenuItem value={"Zwolniony"}>Zwolniony</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <TextField
                      fullWidth
                      type="number"
                      id="outlined-basic"
                      label="Wartość netto"
                      onChange={(e) => handleNetto(e.target.value, i)}
                      variant="outlined"
                      value={object.netto}
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <TextField
                      fullWidth
                      type="number"
                      id="outlined-basic"
                      label="Wartość podatku VAT"
                      onChange={(e) => handleVat(e.target.value, i)}
                      variant="outlined"
                      value={object.vat}
                    />
                  </div>
                </div>
              );
            })}

            <div>
              <button
                type="button"
                onClick={handleAdd}
                className="mainButton mt-4 py-2 mb-4"
              >
                {" "}
                Dodaj kolejną pozycję faktury
              </button>
            </div>

            <div className="text-center py-4 mb-5">
              <button className="sendButton">Edytuj</button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};
export default Home;
