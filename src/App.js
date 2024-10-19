import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Make sure Home component is imported
import ClientDefinitions from "./ClientDefinitions";
import ProgramList from "./ProgramList";
import Navbar from "./Navbar"; // Your navigation bar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Other routes */}
        <Route path="Home" element={<Home />} />
        <Route path="/client-definitions" element={<ClientDefinitions />} />
        <Route path="/program-list" element={<ProgramList />} />
      </Routes>
    </Router>
  );
}

export default App;
