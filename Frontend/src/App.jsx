import { useState } from "react";
import TableList from "./components/TableList";
import TableStructure from "./components/TableStructure";
import TableRelationships from "./components/TableRelationships";
import TableDataViewer from "./components/TableDataViewer";
import "./App.css";

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>MySQL Schema Viewer</h1>
      </header>
      <div className="content-container">
        <div className="top-section">
          <TableList
            onTableSelect={handleTableSelect}
            selectedTable={selectedTable}
          />
          <div className="table-data">
            <TableDataViewer selectedTable={selectedTable} />
          </div>
        </div>

        <div className="bottom-section">
          <div className="table-relationships">
            <TableRelationships selectedTable={selectedTable} />
          </div>
          <div className="table-structure">
            <TableStructure selectedTable={selectedTable} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
