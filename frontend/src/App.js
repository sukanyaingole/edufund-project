import React from "react";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import StocksPage from "./components/StocksPage";

function App() {
  return (
    <CookiesProvider>
      <div className="App container-fluid">
        <header className="navbar navbar-expand-lg navbar-light bg-teal">
          <a className="navbar-brand" href="#">
            <h1>EduFund</h1>
          </a>
        </header>
        <StocksPage />
      </div>
    </CookiesProvider>
  );
}

export default App;
