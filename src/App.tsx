import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import { ADMIN_PATH } from "./config";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={ADMIN_PATH} element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
