import React, { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import ChartModal from "./ChartModal";
import "./StocksPage.css";
import ENDPOINTS from "../services/APIService";
var prevValue = "";

const StocksPage = () => {
  const [stocksData, setStocksData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stock, setSelectedStock] = useState(null);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [loggedIn, setLoginStatus] = useState(cookies["access_token"]);
  const getHeaders = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", cookies["access_token"]);
    myHeaders.append("X-access-token", cookies["access_token"]);

    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
  };

  const login = async () => {
    const response = await fetch(ENDPOINTS.SIGN_IN, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceDetails: window.navigator.appVersion,
      }),
    });
    const loginData = await response.json();

    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    setCookie("access_token", loginData.access_token, {
      path: "/",
      expires: date,
    });

    if (response.status === 200) {
      setLoginStatus(true);
    }
  };

  const callStocksApi = async () => {
    let stocksApiData = [];
    const myHeaders = getHeaders();
    const response = await fetch(ENDPOINTS.SYMBOL_DATA, {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    });
    if (response.status !== 200) {
      return setLoginStatus(false);
    }
    stocksApiData = await response.json();
    setStocksData(stocksApiData);
  };
  const getStockDetailsHandler = async (stocks) => {
    const myHeaders = getHeaders();
    if (prevValue !== stocks.Symbol) {
      prevValue = stocks.Symbol;
      const response = await fetch(ENDPOINTS.ONE_COMPANY_DATA, {
        method: "POST",
        mode: "cors",
        cache: "default",
        headers: myHeaders,
        body: JSON.stringify({
          symbol: stocks.Symbol,
        }),
      });
      const stockData = await response.json();
      setSelectedStock(stockData);
    } else {
      console.log("Already selected!");
    }
  };

  useEffect(() => {
    callStocksApi();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div>
        <button className="btn btn-primary btn-lg" onClick={() => login()}>
          Please Login to continue!
        </button>
      </div>
    );
  }

  if (!stocksData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <ChartModal
        showModal={showModal}
        setShowModal={setShowModal}
        stock={stock}
      />
      <div className="col-md-3">
        <div className="data-etfs">
          {stocksData.map((stocks) => (
            <div className="stocks-list" key={stocks.SecurityName}>
              <ul className="list-group">
                <li
                  className={`list-group-item ${
                    stocks && stock && stocks.Symbol === stock.symbol
                      ? "selected"
                      : ""
                  }`}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      getStockDetailsHandler(stocks);
                    }}
                  >
                    {stocks.SecurityName}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-9">
        <div className={`tableData ${stock ? "showTable" : "hidden"}`}>
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary btn-lg float-right"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => setShowModal(true)}
              >
                See Chart!
              </button>
            </div>
          </div>
          <table className="table table-striped stocksTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {stock &&
                stock.stocksData &&
                stock.stocksData.map((st) => (
                  <tr key={st.Date}>
                    <td>{st.Date}</td>
                    <td>{st.Open}</td>
                    <td>{st.High}</td>
                    <td>{st.Low}</td>
                    <td>{st.Close}</td>
                    <td>{st.Volume}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StocksPage;
