import * as React from "react";
import { Chart } from "react-google-charts";

const getFormattedData = (stock, timeLine) => {
  if (!stock.length) {
    return [];
  }
  const dataArr = [];
  const typeArr = [
    {
      type: "string",
      id: "Date",
    },
    {
      type: "number",
      label: "Low",
    },
    {
      type: "number",
      label: "Open",
    },
    {
      type: "number",
      label: "Close",
    },
    {
      type: "number",
      label: "High",
    },
  ];
  dataArr.push(typeArr);
  stock.slice(0, timeLine).forEach((st) => {
    const tempArr = [];
    tempArr.push(st.Date);
    tempArr.push(parseFloat(st.Low).toFixed(2));
    tempArr.push(parseFloat(st.Open).toFixed(2));
    tempArr.push(parseFloat(st.Close).toFixed(2));
    tempArr.push(parseFloat(st.High).toFixed(2));
    dataArr.push(tempArr);
  });
  return dataArr;
};

const CandleStickChart = ({ stocksData, timeLine }) => {
  const data = getFormattedData(stocksData, timeLine);
  return (
    <div className="App">
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
      />
    </div>
  );
};
export default CandleStickChart;
