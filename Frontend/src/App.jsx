import { useState } from "react";
import TableList from "./components/TableList";
import TableStructure from "./components/TableStructure";
import TableRelationships from "./components/TableRelationships";
import "./App.css";

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <>
      <div className="app">
        <h1>MySQL Schema Viewer</h1>
        <div className="content-container">
          <TableList
            onTableSelect={handleTableSelect}
            selectedTable={selectedTable}
          />
          <TableStructure selectedTable={selectedTable} />
        </div>
        <TableRelationships selectedTable={selectedTable} />
      </div>
    </>
  );
}

export default App;
