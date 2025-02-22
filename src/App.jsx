
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUppage from "./pages/SignUppage";
import SignInpage from "./pages/SignInpage";
import Dashboardpage from "./pages/Dashboardpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUppage/>}/>
        <Route path="/signin" element={<SignInpage/>}/>
        <Route path="/dashboard" element={<Dashboardpage/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
