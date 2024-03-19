import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Profile from "./components/ProfileIcon/ProfileIcon";
import SignupButton from "./components/SignupButton/SignupButton";
import LoginButton from "./components/LoginButton/LoginButton";
import { useState } from "react";
import SignupCard from "./components/SignupCard/SignupCard";

const usingBackend = process.env.USING_BACKEND == "TRUE" ? true : false;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;
  return (
    <div className={!isOpen ? "background-default" : "background-overlay"}>
      {usingBackend && (
        <div className="sidebar-and-profile">
          <Sidebar></Sidebar>
          {isLoggedIn ? (
            <Profile username={"Jonathan"}></Profile>
          ) : (
            <div>
              <SignupButton onClick={() => setIsOpen(true)} />
              <LoginButton />
            </div>
          )}
        </div>
      )}
      <SignupCard open={isOpen} onClose={() => setIsOpen(false)}></SignupCard>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
