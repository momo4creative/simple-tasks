import {} from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Home, Tasks } from "./pages";

function App() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="tasks">Tasks</Link>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
