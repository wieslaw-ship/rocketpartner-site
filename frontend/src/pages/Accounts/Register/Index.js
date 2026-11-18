import { FormControl } from "@mui/base";
import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { validateEmail } from "../../../components/validators";
import { signUp } from "../../../api/auth";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    nationality: "",
    male: true,
    workarea: "",
    mode_of_transport: "",
    password: "",
    ref_link: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let code = searchParams.get("unique_code");
    if (code) {
      setUser({ ...user, ref_link: code });
    }
  }, []);

  const [re_password, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.first_name) {
      return NotificationError("Brak imienia.");
    }
    if (!user.surname) {
      return NotificationError("Brak nazwiska.");
    }
    if (!validateEmail(user.email)) {
      return NotificationError("Nieprawidłowy adres e-mail");
    }
    if (!user.phone) {
      return NotificationError("Brak numeru telefonu");
    }
    if (user.phone.length < 9) {
      return NotificationError("Nie prawidłowy numer telefonu");
    }
    if (!user.nationality || user.nationality === "Wybierz") {
      return NotificationError("Brak wskazania narodowości");
    }
    if (!user.workarea) {
      return NotificationError("Brak wskazania obszaru pracy");
    }
    if (!user.password || !re_password) {
      return NotificationError("Brak hasła");
    }
    if (user.password !== re_password) {
      return NotificationError("Podane hasła różnią się");
    }
    if (!user.mode_of_transport) {
      return NotificationError("Brak wskazania środku transportu");
    }

    let result = await signUp(user);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie utworzono konto!");
      navigate("/zaloguj-sie");
    } else {
      NotificationError(result.message);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container-fluid" id="register">
      <div className="row">
        <div
          className="col-sm-12 col-md-12 col-lg-6 col-xl-6 no_mobile"
          id="left"
        ></div>
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6" id="right">
          <form onSubmit={handleSubmit}>
            <h1>
              {t(
                "Witamy w Rocket Partner, dołącz do nas i zarabiaj nawet 10 000 zł!"
              )}
            </h1>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("Płeć / Gender")}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  onClick={() => setUser({ ...user, male: false })}
                  value="female"
                  control={<Radio />}
                  label={t("Kobieta")}
                />
                <FormControlLabel
                  onClick={() => setUser({ ...user, male: true })}
                  value="male"
                  control={<Radio />}
                  label={t("Mężczyzna")}
                />
              </RadioGroup>
            </FormControl>
            <div className="row">
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  placeholder="Imię / Name / имя"
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  fullWidth
                />
              </div>
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  value={user.surname}
                  onChange={(e) =>
                    setUser({ ...user, surname: e.target.value })
                  }
                  placeholder="Nazwisko / Surname / Название"
                  fullWidth
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Email"
                  fullWidth
                />
              </div>
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  placeholder="Numer Telefonu / Phone number / Номер телефона"
                  fullWidth
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
            </div>
            <TextField
              value={user.nationality}
              onChange={(e) =>
                setUser({ ...user, nationality: e.target.value })
              }
              placeholder="Narodowość / Nationality / Национальность"
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Obszar pracy / Work area
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={user.workarea ? user.workarea : "Wybierz"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    workarea: e.target.value,
                  })
                }
                label="Obszar pracy /  Work area / Рабочая зона"
              >
                <MenuItem value="Aleksandrów Łódzki">
                  Aleksandrów Łódzki
                </MenuItem>{" "}
                <MenuItem value="Wybierz">Wybierz</MenuItem>
                <MenuItem value="Andrychów">Andrychów</MenuItem>{" "}
                <MenuItem value="Augustów">Augustów</MenuItem>{" "}
                <MenuItem value="Bełchatów">Bełchatów</MenuItem>{" "}
                <MenuItem value="Będzin">Będzin</MenuItem>{" "}
                <MenuItem value="Biała Podlaska">Biała Podlaska</MenuItem>{" "}
                <MenuItem value="Białołęka">Białołęka</MenuItem>{" "}
                <MenuItem value="Białystok">Białystok</MenuItem>{" "}
                <MenuItem value="Bielsko-Biała">Bielsko-Biała</MenuItem>{" "}
                <MenuItem value="Bielsk Podlaski">Bielsk Podlaski</MenuItem>{" "}
                <MenuItem value="Bolesławiec">Bolesławiec</MenuItem>{" "}
                <MenuItem value="Brodnica">Brodnica</MenuItem>{" "}
                <MenuItem value="Brwinów">Brwinów</MenuItem>{" "}
                <MenuItem value="Bydgoszcz">Bydgoszcz</MenuItem>{" "}
                <MenuItem value="Bytom">Bytom</MenuItem>{" "}
                <MenuItem value="Chełm">Chełm</MenuItem>{" "}
                <MenuItem value="Chojnice">Chojnice</MenuItem>{" "}
                <MenuItem value="Chorzów">Chorzów</MenuItem>{" "}
                <MenuItem value="Chrzanów">Chrzanów</MenuItem>{" "}
                <MenuItem value="Ciechanów">Ciechanów</MenuItem>{" "}
                <MenuItem value="Cieszyn">Cieszyn</MenuItem>{" "}
                <MenuItem value="Czechowice-Dziedzice">
                  Czechowice-Dziedzice
                </MenuItem>{" "}
                <MenuItem value="Częstochowa">Częstochowa</MenuItem>{" "}
                <MenuItem value="Dąbrowa Górnicza">Dąbrowa Górnicza</MenuItem>{" "}
                <MenuItem value="Dębica">Dębica</MenuItem>{" "}
                <MenuItem value="Dopiewo">Dopiewo</MenuItem>{" "}
                <MenuItem value="Dzierżoniów">Dzierżoniów</MenuItem>{" "}
                <MenuItem value="Elbląg">Elbląg</MenuItem>{" "}
                <MenuItem value="Ełk">Ełk</MenuItem>{" "}
                <MenuItem value="Fordon">Fordon</MenuItem>{" "}
                <MenuItem value="Garwolin">Garwolin</MenuItem>{" "}
                <MenuItem value="Gdańsk">Gdańsk</MenuItem>{" "}
                <MenuItem value="Gdynia">Gdynia</MenuItem>{" "}
                <MenuItem value="Gdynia Północ">Gdynia Północ</MenuItem>{" "}
                <MenuItem value="Gliwice">Gliwice</MenuItem>{" "}
                <MenuItem value="Głogów">Głogów</MenuItem>{" "}
                <MenuItem value="Gniezno">Gniezno</MenuItem>{" "}
                <MenuItem value="Gorzów Wielkopolski">
                  Gorzów Wielkopolski
                </MenuItem>{" "}
                <MenuItem value="Grodzisk Mazowiecki + Milanówek">
                  Grodzisk Mazowiecki + Milanówek
                </MenuItem>{" "}
                <MenuItem value="Grodzisk Wielkopolski">
                  Grodzisk Wielkopolski
                </MenuItem>{" "}
                <MenuItem value="Góra Kalwaria">Góra Kalwaria</MenuItem>{" "}
                <MenuItem value="Grudziądz">Grudziądz</MenuItem>{" "}
                <MenuItem value="Iława">Iława</MenuItem>{" "}
                <MenuItem value="Inowrocław">Inowrocław</MenuItem>{" "}
                <MenuItem value="Jabłonna">Jabłonna</MenuItem>{" "}
                <MenuItem value="Janki + Raszyn">Janki + Raszyn</MenuItem>{" "}
                <MenuItem value="Jarocin">Jarocin</MenuItem>{" "}
                <MenuItem value="Jarosław">Jarosław</MenuItem>{" "}
                <MenuItem value="Jastrzębie-Zdrój">Jastrzębie-Zdrój</MenuItem>{" "}
                <MenuItem value="Jaworzno">Jaworzno</MenuItem>{" "}
                <MenuItem value="Jelenia Góra">Jelenia Góra</MenuItem>{" "}
                <MenuItem value="Józefów">Józefów</MenuItem>{" "}
                <MenuItem value="Juchnowiec Kościelny">
                  Juchnowiec Kościelny
                </MenuItem>{" "}
                <MenuItem value="Kalisz">Kalisz</MenuItem>{" "}
                <MenuItem value="Katowice">Katowice</MenuItem>{" "}
                <MenuItem value="Kędzierzyn-Koźle">Kędzierzyn-Koźle</MenuItem>{" "}
                <MenuItem value="Kielce">Kielce</MenuItem>{" "}
                <MenuItem value="Kłodzko">Kłodzko</MenuItem>{" "}
                <MenuItem value="Kobierzyce">Kobierzyce</MenuItem>{" "}
                <MenuItem value="Kobyłka">Kobyłka</MenuItem>{" "}
                <MenuItem value="Knurów">Knurów</MenuItem>{" "}
                <MenuItem value="Kolbudy">Kolbudy</MenuItem>{" "}
                <MenuItem value="Koło">Koło</MenuItem>{" "}
                <MenuItem value="Kołobrzeg">Kołobrzeg</MenuItem>{" "}
                <MenuItem value="Komorniki">Komorniki</MenuItem>{" "}
                <MenuItem value="Konin">Konin</MenuItem>{" "}
                <MenuItem value="Konstancin-Jeziorna + Piaseczno">
                  Konstancin-Jeziorna + Piaseczno
                </MenuItem>{" "}
                <MenuItem value="Kosakowo">Kosakowo</MenuItem>{" "}
                <MenuItem value="Kostrzyn nad Odrą">Kostrzyn nad Odrą</MenuItem>{" "}
                <MenuItem value="Koszalin">Koszalin</MenuItem>{" "}
                <MenuItem value="Kościerzyna">Kościerzyna</MenuItem>{" "}
                <MenuItem value="Kraków">Kraków</MenuItem>{" "}
                <MenuItem value="Krapkowice">Krapkowice</MenuItem>{" "}
                <MenuItem value="Krasnystaw">Krasnystaw</MenuItem>{" "}
                <MenuItem value="Kraśnik">Kraśnik</MenuItem>{" "}
                <MenuItem value="Krosno">Krosno</MenuItem>{" "}
                <MenuItem value="Krotoszyn">Krotoszyn</MenuItem>{" "}
                <MenuItem value="Kutno">Kutno</MenuItem>{" "}
                <MenuItem value="Kwidzyn">Kwidzyn</MenuItem>{" "}
                <MenuItem value="Legionowo + Jabłonna">
                  Legionowo + Jabłonna
                </MenuItem>{" "}
                <MenuItem value="Legnica">Legnica</MenuItem>{" "}
                <MenuItem value="Leszno">Leszno</MenuItem>{" "}
                <MenuItem value="Lesznowola">Lesznowola</MenuItem>{" "}
                <MenuItem value="Lębork">Lębork</MenuItem>{" "}
                <MenuItem value="Lubin">Lubin</MenuItem>{" "}
                <MenuItem value="Lublin">Lublin</MenuItem>{" "}
                <MenuItem value="Lubliniec">Lubliniec</MenuItem>{" "}
                <MenuItem value="Luboń">Luboń</MenuItem>{" "}
                <MenuItem value="Łask">Łask</MenuItem>{" "}
                <MenuItem value="Łomianki">Łomianki</MenuItem>{" "}
                <MenuItem value="Łowicz">Łowicz</MenuItem>{" "}
                <MenuItem value="Łomża">Łomża</MenuItem>{" "}
                <MenuItem value="Łódź">Łódź</MenuItem>{" "}
                <MenuItem value="Łuków">Łuków</MenuItem>{" "}
                <MenuItem value="Malbork">Malbork</MenuItem>{" "}
                <MenuItem value="Marki + Ząbki">Marki + Ząbki</MenuItem>{" "}
                <MenuItem value="Mielec">Mielec</MenuItem>{" "}
                <MenuItem value="Milanówek">Milanówek</MenuItem>{" "}
                <MenuItem value="Mikołów">Mikołów</MenuItem>{" "}
                <MenuItem value="Mińsk Mazowiecki">Mińsk Mazowiecki</MenuItem>{" "}
                <MenuItem value="Mława">Mława</MenuItem>{" "}
                <MenuItem value="Mrągowo">Mrągowo</MenuItem>{" "}
                <MenuItem value="Mysłowice">Mysłowice</MenuItem>{" "}
                <MenuItem value="Nakło nad Notecią">Nakło nad Notecią</MenuItem>{" "}
                <MenuItem value="Nowa Sól">Nowa Sól</MenuItem>{" "}
                <MenuItem value="Nowy Dwór Mazowiecki">
                  Nowy Dwór Mazowiecki
                </MenuItem>{" "}
                <MenuItem value="Nowy Sącz">Nowy Sącz</MenuItem>{" "}
                <MenuItem value="Nowy Targ">Nowy Targ</MenuItem>{" "}
                <MenuItem value="Nysa">Nysa</MenuItem>{" "}
                <MenuItem value="Oleśnica">Oleśnica</MenuItem>{" "}
                <MenuItem value="Olkusz">Olkusz</MenuItem>{" "}
                <MenuItem value="Olsztyn">Olsztyn</MenuItem>{" "}
                <MenuItem value="Oława">Oława</MenuItem>{" "}
                <MenuItem value="Opole">Opole</MenuItem>{" "}
                <MenuItem value="Otwock + Józefów">Otwock + Józefów</MenuItem>{" "}
                <MenuItem value="Ostrołęka">Ostrołęka</MenuItem>{" "}
                <MenuItem value="Ostrowiec Świętokrzyski">
                  Ostrowiec Świętokrzyski
                </MenuItem>{" "}
                <MenuItem value="Ostróda">Ostróda</MenuItem>{" "}
                <MenuItem value="Ostrów Wlkp.">Ostrów Wlkp.</MenuItem>{" "}
                <MenuItem value="Oświęcim">Oświęcim</MenuItem>{" "}
                <MenuItem value="Pabianice">Pabianice</MenuItem>{" "}
                <MenuItem value="Piaseczno">Piaseczno</MenuItem>{" "}
                <MenuItem value="Piastów">Piastów</MenuItem>{" "}
                <MenuItem value="Piła">Piła</MenuItem>{" "}
                <MenuItem value="Piotrków Trybunalski">
                  Piotrków Trybunalski
                </MenuItem>{" "}
                <MenuItem value="Piotrowice/ Kostuchna">
                  Piotrowice/ Kostuchna
                </MenuItem>{" "}
                <MenuItem value="Pisz">Pisz</MenuItem>{" "}
                <MenuItem value="Płock">Płock</MenuItem>{" "}
                <MenuItem value="Płońsk">Płońsk</MenuItem>{" "}
                <MenuItem value="Poznań">Poznań</MenuItem>{" "}
                <MenuItem value="Polkowice">Polkowice</MenuItem>{" "}
                <MenuItem value="Prudnik">Prudnik</MenuItem>{" "}
                <MenuItem value="Pruszcz Gdański">Pruszcz Gdański</MenuItem>{" "}
                <MenuItem value="Pruszków + Piastów">
                  Pruszków + Piastów
                </MenuItem>{" "}
                <MenuItem value="Przemyśl">Przemyśl</MenuItem>{" "}
                <MenuItem value="Pszczyna">Pszczyna</MenuItem>{" "}
                <MenuItem value="Puck">Puck</MenuItem>{" "}
                <MenuItem value="Puławy">Puławy</MenuItem>{" "}
                <MenuItem value="Pułtusk">Pułtusk</MenuItem>{" "}
                <MenuItem value="Racibórz">Racibórz</MenuItem>{" "}
                <MenuItem value="Radom">Radom</MenuItem>{" "}
                <MenuItem value="Raszyn">Raszyn</MenuItem>{" "}
                <MenuItem value="Ruda Śląska">Ruda Śląska</MenuItem>{" "}
                <MenuItem value="Rumia i Reda">Rumia i Reda</MenuItem>{" "}
                <MenuItem value="Rybnik">Rybnik</MenuItem>{" "}
                <MenuItem value="Rzeszów">Rzeszów</MenuItem>{" "}
                <MenuItem value="Sanok">Sanok</MenuItem>{" "}
                <MenuItem value="Siedlce">Siedlce</MenuItem>{" "}
                <MenuItem value="Siemianowice Śląskie">
                  Siemianowice Śląskie
                </MenuItem>{" "}
                <MenuItem value="Sieradz">Sieradz</MenuItem>{" "}
                <MenuItem value="Sierpc">Sierpc</MenuItem>{" "}
                <MenuItem value="Skarżysko-Kamienna">
                  Skarżysko-Kamienna
                </MenuItem>{" "}
                <MenuItem value="Skierniewice">Skierniewice</MenuItem>{" "}
                <MenuItem value="Słubice">Słubice</MenuItem>{" "}
                <MenuItem value="Słupsk">Słupsk</MenuItem>{" "}
                <MenuItem value="Sochaczew">Sochaczew</MenuItem>{" "}
                <MenuItem value="Sokołów Podlaski">Sokołów Podlaski</MenuItem>{" "}
                <MenuItem value="Sopot">Sopot</MenuItem>{" "}
                <MenuItem value="Sosnowiec">Sosnowiec</MenuItem>{" "}
                <MenuItem value="Stalowa Wola">Stalowa Wola</MenuItem>{" "}
                <MenuItem value="Starachowice">Starachowice</MenuItem>{" "}
                <MenuItem value="Stare Babice">Stare Babice</MenuItem>{" "}
                <MenuItem value="Stargard">Stargard</MenuItem>{" "}
                <MenuItem value="Starogard Gdański">Starogard Gdański</MenuItem>{" "}
                <MenuItem value="Stary Sącz">Stary Sącz</MenuItem>{" "}
                <MenuItem value="Suchy Las">Suchy Las</MenuItem>{" "}
                <MenuItem value="Sulechów">Sulechów</MenuItem>{" "}
                <MenuItem value="Sulejówek">Sulejówek</MenuItem>{" "}
                <MenuItem value="Suwałki">Suwałki</MenuItem>{" "}
                <MenuItem value="Swarzędz">Swarzędz</MenuItem>{" "}
                <MenuItem value="Szczecin">Szczecin</MenuItem>{" "}
                <MenuItem value="Szczecin Prawobrzeże">
                  Szczecin Prawobrzeże
                </MenuItem>{" "}
                <MenuItem value="Szczecinek">Szczecinek</MenuItem>{" "}
                <MenuItem value="Śrem">Śrem</MenuItem>{" "}
                <MenuItem value="Świdnica">Świdnica</MenuItem>{" "}
                <MenuItem value="Świdnik">Świdnik</MenuItem>{" "}
                <MenuItem value="Świebodzin">Świebodzin</MenuItem>{" "}
                <MenuItem value="Świecie">Świecie</MenuItem>{" "}
                <MenuItem value="Świętochłowice">Świętochłowice</MenuItem>{" "}
                <MenuItem value="Świnoujście">Świnoujście</MenuItem>{" "}
                <MenuItem value="Tarnobrzeg">Tarnobrzeg</MenuItem>{" "}
                <MenuItem value="Tarnowo Podgórne">Tarnowo Podgórne</MenuItem>{" "}
                <MenuItem value="Tarnowskie Góry">Tarnowskie Góry</MenuItem>{" "}
                <MenuItem value="Tarnów">Tarnów</MenuItem>{" "}
                <MenuItem value="Tczew">Tczew</MenuItem>{" "}
                <MenuItem value="Tomaszów Mazowiecki">
                  Tomaszów Mazowiecki
                </MenuItem>{" "}
                <MenuItem value="Turawa">Turawa</MenuItem>{" "}
                <MenuItem value="Turek">Turek</MenuItem>{" "}
                <MenuItem value="Toruń">Toruń</MenuItem>{" "}
                <MenuItem value="Tychy">Tychy</MenuItem>{" "}
                <MenuItem value="Wadowice">Wadowice</MenuItem>{" "}
                <MenuItem value="Wałbrzych">Wałbrzych</MenuItem>{" "}
                <MenuItem value="Wałcz">Wałcz</MenuItem>{" "}
                <MenuItem value="Warszawa">Warszawa</MenuItem>{" "}
                <MenuItem value="Wawer (Warszawa)">Wawer (Warszawa)</MenuItem>{" "}
                <MenuItem value="Wągrowiec">Wągrowiec</MenuItem>{" "}
                <MenuItem value="Wejherowo">Wejherowo</MenuItem>{" "}
                <MenuItem value="Wiązowna">Wiązowna</MenuItem>{" "}
                <MenuItem value="Wieliczka">Wieliczka</MenuItem>{" "}
                <MenuItem value="Wieliszew">Wieliszew</MenuItem>{" "}
                <MenuItem value="Władysławowo">Władysławowo</MenuItem>{" "}
                <MenuItem value="Włocławek">Włocławek</MenuItem>{" "}
                <MenuItem value="Wodzisław Śląski">Wodzisław Śląski</MenuItem>{" "}
                <MenuItem value="Wołomin + Zielonka">
                  Wołomin + Zielonka
                </MenuItem>{" "}
                <MenuItem value="Wrocław">Wrocław</MenuItem>{" "}
                <MenuItem value="Września">Września</MenuItem>{" "}
                <MenuItem value="Wyszków">Wyszków</MenuItem>{" "}
                <MenuItem value="Zabrze">Zabrze</MenuItem>{" "}
                <MenuItem value="Zakopane">Zakopane</MenuItem>{" "}
                <MenuItem value="Zambrów">Zambrów</MenuItem>{" "}
                <MenuItem value="Zamość">Zamość</MenuItem>{" "}
                <MenuItem value="Zawiercie">Zawiercie</MenuItem>{" "}
                <MenuItem value="Ząbki">Ząbki</MenuItem>{" "}
                <MenuItem value="Zduńska Wola">Zduńska Wola</MenuItem>{" "}
                <MenuItem value="Zgierz">Zgierz</MenuItem>{" "}
                <MenuItem value="Zgorzelec">Zgorzelec</MenuItem>{" "}
                <MenuItem value="Zielona Góra">Zielona Góra</MenuItem>{" "}
                <MenuItem value="Zielonka">Zielonka</MenuItem>{" "}
                <MenuItem value="Zielonki">Zielonki</MenuItem>{" "}
                <MenuItem value="Żary">Żary</MenuItem>{" "}
                <MenuItem value="Żory">Żory</MenuItem>{" "}
                <MenuItem value="Żukowo">Żukowo</MenuItem>{" "}
                <MenuItem value="Żyrardów">Żyrardów</MenuItem>{" "}
                <MenuItem value="Żywiec">Żywiec</MenuItem>
              </Select>
            </FormControl>
            <div className="row">
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Hasło / Password / Пароль"
                  fullWidth
                />
              </div>
              <div className="col-md-12 col-12 col-lg-6">
                <TextField
                  type="password"
                  value={re_password}
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="Powtórz hasło / Repeat password / Повторите пароль"
                  fullWidth
                />
              </div>
            </div>

            <TextField
              placeholder="Kod polecającego / Referral code / Код реферера"
              fullWidth
              value={user.ref_link}
              onChange={(e) => setUser({ ...user, ref_link: e.target.value })}
            />
            <FormControl>
              <FormLabel id="vehicle">
                Środek transportu / Mode of transportation
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Samochód"
                  onClick={() =>
                    setUser({ ...user, mode_of_transport: "Samochód" })
                  }
                  control={<Radio />}
                  label="Samochód / Car / Автомобиль"
                />
                <FormControlLabel
                  value="Skuter"
                  onClick={() =>
                    setUser({ ...user, mode_of_transport: "Skuter" })
                  }
                  control={<Radio />}
                  label="Skuter / Scooter / Скутер"
                />
                <FormControlLabel
                  value="Rower"
                  onClick={() =>
                    setUser({ ...user, mode_of_transport: "Rower" })
                  }
                  control={<Radio />}
                  label="Rower / Bike / Велосипед"
                />
              </RadioGroup>
            </FormControl>
            <div className="text-center py-2">
              <button className="mainButton w-100">
                Utwórz konto / Create an account / Создать аккаунт
              </button>
            </div>
            <Link to="/zaloguj-sie">Masz już konto? Zaloguj się</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
