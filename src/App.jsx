import {} from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home, Login, Register, Tasks } from "./pages";

function App() {
  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
