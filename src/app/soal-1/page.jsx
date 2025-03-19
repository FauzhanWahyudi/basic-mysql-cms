"use client";

import { useState } from "react";

export default function Soal1Page() {
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [array, setArray] = useState([]);

  const generatefib = () => {
    let result = [];
    const end = Number(row) * Number(col);
    if (!end || end == 0) {
      return result;
    }

    if (end == 1) {
      return [0];
    }
    result.push(0, 1);

    for (let i = 2; i <= end; i++) {
      const x = result[i - 1];
      const prev = result[i - 2];
      result.push(x + prev);
    }
    return result;
  };
  const handleSubmit = () => {
    const result = generatefib();
    const table = document.getElementById("table");
    table.innerHTML = "";
    let counter = 0;
    for (let i = 0; i < row; i++) {
      const table_row = document.createElement("tr");
      table_row.className = "py-4";
      for (let j = 0; j < col; j++) {
        const table_data = document.createElement("td");
        table_data.className = "p-2 border text-center";
        table_data.textContent = result[counter];
        table_row.appendChild(table_data);
        counter++;
      }
      table.appendChild(table_row);
    }
  };
  return (
    <div className="flex flex-col gap-4 h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-3 px-3 py-4  border rounded-lg">
        <div className="flex gap-4">
          <label htmlFor="row">Row</label>
          <input
            type="text"
            className="border rounded-lg px-2"
            onChange={(e) => setRow(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="col">Col</label>
          <input
            type="text"
            className="border rounded-lg px-2"
            onChange={(e) => setCol(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="border cursor-pointer hover:bg-black/10 active:bg-black/20 active:border-gray-400 active:border-[3px] rounded-full"
        >
          Submit
        </button>
      </div>
      <table className="w-3/5">
        <tbody id="table" className=""></tbody>
      </table>
    </div>
  );
}
