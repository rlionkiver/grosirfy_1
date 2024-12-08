import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/landingPage";
import Login from "./pages/login";
import DaftarPage from "./pages/daftar";
import RiwayatPengisianStock from "./pages/riwayatPengisianStock"; // Correct import
import ProfilePage from "./pages/profile";

const App = () => {
  const historyData = []; // Initialize or retrieve this data from state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<DaftarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/riwayat-pengisian"
          element={<RiwayatPengisianStock historyData={historyData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
