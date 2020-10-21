import React, { useState } from "react";
import CandleStickChart from "./CandleStickChart";

const ChartModal = ({ showModal, setShowModal, stock }) => {
  const [timeLine, setTimeline] = useState(5);
  console.log("stock:", stock);
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{
        display: showModal ? "block" : "none",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Symbol : {stock && stock.symbol}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 1 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(1);
                }}
              >
                1D
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 5 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(5);
                }}
              >
                5D
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 30 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(30);
                }}
              >
                1M
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 365 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(365);
                }}
              >
                1Y
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 1095 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(1095);
                }}
              >
                3Y
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  timeLine === 1825 ? "selected" : ""
                }`}
                onClick={() => {
                  setTimeline(1825);
                }}
              >
                5Y
              </button>
            </div>
            <CandleStickChart
              stocksData={stock ? stock.stocksData : []}
              timeLine={timeLine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
