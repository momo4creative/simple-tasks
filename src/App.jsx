import {} from "react";
import { Link, Routes, Route } from "react-router-dom";
import { AddTasks, Home, Login, Register, Tasks, TasksIndex } from "./pages";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/main";

function App() {
  return (
    <>
      <Header />

      <AnimatePresence>
        <Routes>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />}>
            <Route index element={<TasksIndex />} />
            <Route path="add" element={<AddTasks />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
