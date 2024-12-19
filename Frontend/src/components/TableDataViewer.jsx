import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const TableDataViewer = ({ selectedTable }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      if (!selectedTable) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/table/${selectedTable}/data`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch table data");
        }

        const data = await response.json();
        setTableData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [selectedTable]);

  const getColumns = (data) => {
    if (!data.length) return [];
    return Object.keys(data[0]);
  };

  if (!selectedTable) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Select a table to view its data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data: {selectedTable}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error: {error}</div>
        ) : tableData.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {getColumns(tableData).map((column) => (
                    <TableHead
                      key={column}
                      className="whitespace-nowrap font-medium"
                    >
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {getColumns(tableData).map((column) => (
                      <TableCell
                        key={`${rowIndex}-${column}`}
                        className="whitespace-nowrap"
                      >
                        {row[column]?.toString() || ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-gray-500 p-4">
            No data available in table
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TableDataViewer;
