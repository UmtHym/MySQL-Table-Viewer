import { useState, useEffect } from "react";
import axios from "axios";
import "./TableList.css";

function TableList({onTableSelect, selectedTable}) {
  const [tables, setTables] = useState([]); //Initialize empty array for tables
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tables");
        console.log("Tables data:", response.data);
        setTables(response.data);
      } catch (error) {
        setError("Error fetching tables");
        console.error(err);
      }
    };
    fetchTables();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="table-list">
      <h2>Database Tables</h2>
      {error && <p className="error">{error}</p>}
      <ul className="tables">
        {tables.map((table, index) => (
          <li
            key={index}
            className={`table-item ${
              selectedTable === table.Tables_in_ecommerce ? "selected" : ""
            }`}
            onClick={() => onTableSelect(table.Tables_in_ecommerce)}
          >
            {table.Tables_in_ecommerce}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableList;
