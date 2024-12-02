import { useState, useEffect } from "react";
import axios from "axios";
import "./TableStructure.css";

function TableStructure({ selectedTable }) {
  const [structure, setStructure] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Only fetch if we have a selected table
    if (selectedTable) {
      const fetchStructure = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/table/${selectedTable}`
          );
          setStructure(response.data);
        } catch (err) {
          setError("Error fetching table structure");
          console.error(err);
        }
      };

      fetchStructure();
    }
  }, [selectedTable]); // Dependency on selectedTable - will re-fetch when table changes

  if (!selectedTable) {
    return <div>Please select a table to view its structure</div>;
  }

  return (
    <div className="table-structure">
      <h2>Structure of {selectedTable}</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Data Type</th>
            <th>Nullable</th>
            <th>Key</th>
            <th>Default</th>
            <th>Extra</th>
          </tr>
        </thead>
        <tbody>
          {structure &&
            structure.map((column, index) => (
              <tr key={index}>
                <td>{column.Field}</td>
                <td>{column.Type}</td>
                <td>{column.Null}</td>
                <td>{column.Key}</td>
                <td>{column.Default || "NULL"}</td>
                <td>{column.Extra}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default TableStructure;
