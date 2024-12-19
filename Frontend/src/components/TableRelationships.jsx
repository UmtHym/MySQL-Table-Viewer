import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import "./TableRelationships.css";

const TableRelationships = ({ selectedTable }) => {
  const [relationships, setRelationships] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelationships = async () => {
      if (!selectedTable) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/table/${selectedTable}/relationships`
        );
        if (!response.ok) throw new Error("Failed to fetch relationships");
        const data = await response.json();
        setRelationships(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      caches;
    };

    fetchRelationships();
  }, [selectedTable]);

  if (!selectedTable) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <p className="text-gray-500">
            Select a table to view its relationships
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Relationships for {selectedTable}
        </h3>

        <div className="space-y-6">
          {relationships.outgoing && relationships.incoming ? (
            <div className="relationships-container">
              {relationships.outgoing.length === 0 &&
              relationships.incoming.length === 0 ? (
                <p className="text-gray">
                  No relationships found for this table
                </p>
              ) : (
                <>
                  {relationships.outgoing.map((rel, index) => (
                    <div
                      key={`outgoing-${index}`}
                      className="relationship-item"
                    >
                      <div className="relationship-row">
                        <div className="table-name">{selectedTable}</div>
                        <div className="relationship-type">
                          <span className="arrow">→</span>
                          <span className="relationship-label">
                            {rel.relationship_type}
                          </span>
                        </div>
                        <div className="table-name">{rel.to_table}</div>
                      </div>
                      <div className="relationship-details">
                        <span className="detail-label">via: </span>
                        {rel.from_column} → {rel.to_column}
                      </div>
                    </div>
                  ))}
                  {relationships.incoming.map((rel, index) => (
                    <div
                      key={`incoming-${index}`}
                      className="relationship-item"
                    >
                      <div className="relationship-row">
                        <div className="table-name">{rel.from_table}</div>
                        <div className="relationship-type">
                          <span className="arrow">→</span>
                          <span className="relationship-label">
                            {rel.relationship_type}
                          </span>
                        </div>
                        <div className="table-name">{selectedTable}</div>
                      </div>
                      <div className="relationship-details">
                        <span className="detail-label">via: </span>
                        {rel.from_column} → {rel.to_column}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <p className="text-gray">No relationship data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableRelationships;
