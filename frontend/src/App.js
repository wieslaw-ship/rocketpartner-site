import React, { Suspense, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext.js";
import ScrollToTop from "./ScrollToTop";
// CORE
const Home = React.lazy(() => import("./pages/Core/Home/Index"));

// ACCOUNTS
const Login = React.lazy(() => import("./pages/Accounts/Login/Index.js"));
const Register = React.lazy(() => import("./pages/Accounts/Register/Index.js"));
const ResetPassword = React.lazy(() =>
  import("./pages/Accounts/ForgetPassword/Index.js")
);
const VerificateEmail = React.lazy(() =>
  import("./pages/Accounts/EmailVerification/Index.js")
);

// UserPanel
const Panel = React.lazy(() => import("./pages/Panel/Home/Index.js"));
const PanelDokumnty = React.lazy(() =>
  import("./pages/Panel/Dokumenty/Index.js")
);
const PanelPrzychody = React.lazy(() =>
  import("./pages/Panel/Przychody/Index.js")
);
const PanelWyplaty = React.lazy(() => import("./pages/Panel/Wyplaty/Index.js"));
const PanelPojazdy = React.lazy(() => import("./pages/Panel/Pojazdy/Index.js"));
const PanelFaktury = React.lazy(() => import("./pages/Panel/Faktury/Index.js"));
const PanelDodajFakture = React.lazy(() =>
  import("./pages/Panel/DodajFakture/Index.js")
);
const PanelPartner = React.lazy(() => import("./pages/Panel/Partner/Index.js"));
const PanelDoPobrania = React.lazy(() =>
  import("./pages/Panel/DoPobrania/Index.js")
);
const PanelInformacje = React.lazy(() => import("./pages/Panel/News/Index.js"));

// Admin Panel
const Admin = React.lazy(() => import("./pages/Admin/Home/Index.js"));
const AdminUsers = React.lazy(() => import("./pages/Admin/Users/Index.js"));
const AdminUser = React.lazy(() => import("./pages/Admin/User/Index.js"));
const AdminCars = React.lazy(() => import("./pages/Admin/Cars/Index.js"));
const AdminCar = React.lazy(() => import("./pages/Admin/Car/Index.js"));
const AdminWyplaty = React.lazy(() => import("./pages/Admin/Wyplaty/Index.js"));
const AdminDokumenty = React.lazy(() =>
  import("./pages/Admin/Dokumenty/Index.js")
);
const AdminFaktury = React.lazy(() => import("./pages/Admin/Faktury/Index.js"));
const AdminFaktura = React.lazy(() => import("./pages/Admin/Invoice/Index.js"));
const AdminNews = React.lazy(() => import("./pages/Admin/News/Index.js"));
const AdminNewsAdd = React.lazy(() =>
  import("./pages/Admin/NewsDodaj/Index.js")
);
const AdminNewsSingle = React.lazy(() =>
  import("./pages/Admin/SingleNews/Index.js")
);
const AdminPrzychody = React.lazy(() =>
  import("./pages/Admin/Przychody/Index.js")
);
const AdminPrzychod = React.lazy(() =>
  import("./pages/Admin/Przychod/Index.js")
);
const AdminWyplata = React.lazy(() => import("./pages/Admin/Wyplata/Index.js"));

function App() {
  const authCtx = useContext(UserContext);
  return (
    <Suspense fallback={""}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* CORE */}
          <Route index element={<Login />} />

          {/* Accounts */}
          <Route path="/zaloguj-sie" element={<Login />} />
          <Route path="/zarejestruj-sie" element={<Register />} />
          <Route path="/przypomnij-haslo" element={<ResetPassword />} />
          <Route path="/veryfikacja" element={<VerificateEmail />} />

          {authCtx.isLoggedIn && (
            <>
              <Route path="/moje-konto" element={<Panel />} />
              <Route path="/moje-konto/dokumenty" element={<PanelDokumnty />} />
              <Route
                path="/moje-konto/przychody"
                element={<PanelPrzychody />}
              />
              <Route path="/moje-konto/wyplaty" element={<PanelWyplaty />} />
              <Route path="/moje-konto/pojazdy" element={<PanelPojazdy />} />
              <Route path="/moje-konto/faktury" element={<PanelFaktury />} />
              <Route
                path="/moje-konto/dodaj-fakture"
                element={<PanelDodajFakture />}
              />

              <Route path="/moje-konto/partner" element={<PanelPartner />} />
              <Route
                path="/moje-konto/do-pobrania"
                element={<PanelDoPobrania />}
              />
              <Route
                path="/moje-konto/informacje"
                element={<PanelInformacje />}
              />

              {/* ADMIN */}

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/uzytkownicy" element={<AdminUsers />} />
              <Route
                path="/admin/uzytkownicy/:user_id"
                element={<AdminUser />}
              />
              <Route path="/admin/pojazdy" element={<AdminCars />} />
              <Route path="/admin/pojazdy/:car_id" element={<AdminCar />} />
              <Route path="/admin/wyplaty" element={<AdminWyplaty />} />
              <Route path="/admin/przychody" element={<AdminPrzychody />} />
              <Route
                path="/admin/przychody/:przychod_id"
                element={<AdminPrzychod />}
              />
              <Route path="/admin/faktury" element={<AdminFaktury />} />
              <Route
                path="/admin/faktury/:invoice_id"
                element={<AdminFaktura />}
              />
              <Route path="/admin/informacje" element={<AdminNews />} />
              <Route
                path="/admin/informacje/dodaj"
                element={<AdminNewsAdd />}
              />
              <Route
                path="/admin/informacje/:news_id"
                element={<AdminNewsSingle />}
              />
              <Route
                path="/admin/wyplaty/:wyplata_id"
                element={<AdminWyplata />}
              />
              <Route path="/admin/dokumenty" element={<AdminDokumenty />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
