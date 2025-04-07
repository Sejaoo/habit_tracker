import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import ToDay from "./pages/ToDay";
import Habits from "./pages/Habits";
import MyDay from "./pages/MyDay";
import More from "./pages/More";
import { HabitProvider } from "./context/HabitContext";

function App() {
  return (
    <HabitProvider>
      <Router basename="/habit_tracker">
        <NavBar />
        <Routes>
          <Route path="/" element={<ToDay />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/my-day" element={<MyDay />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </Router>
    </HabitProvider>
  );
}

export default App;
