import { useState, useEffect } from "react";
import axios from "axios";
import "./TableList.css";

function TableList({ onTableSelect, selectedTable }) {
  const [tables, setTables] = useState([]); //Initialize empty array for tables
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tables");
        console.log("Tables data:", response.data);

        // Get the database name from the first table object
        const dbNameKey = Object.keys(response.data[0]).find((key) =>
          key.startsWith("Tables_in_")
        );

        // Transform the data to extract just the table names
        const tableNames = response.data.map((table) => table[dbNameKey]);
        setTables(tableNames);
      } catch (error) {
        setError("Error fetching tables");
        console.error(error);
      }
    };
    fetchTables();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="table-list">
      <h2>Database Tables</h2>
      {error && <p className="error">{error}</p>}
      <ul className="tables">
        {tables.map((tableName, index) => (
          <li
            key={index}
            className={`table-item ${
              selectedTable === tableName ? "selected" : ""
            }`}
            onClick={() => onTableSelect(tableName)}
          >
            {tableName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableList;
