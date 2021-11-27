import {} from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="container flex p-2 bg-blue-900">
      <MainMenu label="Home" path="/" />
      <MainMenu label="Tasks" path="/tasks" />
      <MainMenu label="Add Tasks" path="/tasks/add" />
    </div>
  );
}

const MainMenu = ({ path, label }) => {
  return (
    <Link className="block p-2 brightness-75 focus:brightness-100" to={path}>
      {label}
    </Link>
  );
};
