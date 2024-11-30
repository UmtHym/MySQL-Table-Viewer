const { pool } = require("../config/db");

const schemaController = {
  getAllTables: async (req, res) => {
    let connection;
    try {
      // Get a connection from the pool
      connection = await pool.getConnection();
      // Query to show all tables
      const [tables] = await connection.query("SHOW TABLES");
      // Send the results back
      res.json(tables);
    } catch (error) {
      console.error("Error getching tables", error);
      res.status(500).json({ error: "Failed to fetch tables" });
    } finally {
      // Always release the connection
      if (connection) connection.release();
    }
  },

  getTableStructure: async (req, res) => {
    let connection;
    try {
      const { tableName } = req.params;
      connection = await pool.getConnection();
      const [columns] = await connection.query("DESCRIBE ??", [tableName]);
      res.json(columns);
    } catch (error) {
      console.error("Error fetching table structure:", error);
      res.status(500).json({ error: "Failed to fetch table structure" });
    } finally {
      if (connection) connection.release();
    }
  },

  getTableRelationships: async (req, res) => {
    let connection;

    try {
      const { tableName } = req.params;
      connection = await pool.getConnection();

      // Get outgoing relationships (foreign keys from this table)
      const [outgoingRelations] = await connection.query(
        `
          SELECT 
                COLUMN_NAME as from_column,
                REFERENCED_TABLE_NAME as to_table,
                REFERENCED_COLUMN_NAME as to_column,
                'outgoing' as direction
            FROM
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE 
                TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = ?
                AND REFERENCED_TABLE_NAME IS NOT NULL;
          `,
        [tableName]
      );
      // Get incoming relationships (foreign keys pointing to this table)
      const [incomingRelations] = await connection.query(
        `
          SELECT 
                TABLE_NAME as from_table,
                COLUMN_NAME as from_column,
                REFERENCED_COLUMN_NAME as to_column,
                'incoming' as direction
            FROM
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE 
                TABLE_SCHEMA = DATABASE()
                AND REFERENCED_TABLE_NAME = ?;
          `,
        [tableName]
      );

      // Analyze and categorize relationships
      const relationships = {
        outgoing: outgoingRelations.map((rel) => ({
          ...rel,
          relationship_type: "many-to-one", // Foreign key implies many-to-one
        })),
        incoming: incomingRelations.map((rel) => ({
          ...rel,
          relationship_type: "one-to-many", // Being referenced implies one-to-many
        })),
        summary: {
          table: tableName,
          total_relationships:
            outgoingRelations.length + incomingRelations.length,
        },
      };

      res.json(relationships);
    } catch (error) {
      console.error("Error fetching relationships", error);
      res.status(500).json({ error: "Failed to fetch relationships" });
    } finally {
      if (connection) connection.release();
    }
  },
  //one-to-many
  getRelatedRecords: async (req, res) => {
    let connection;
    try {
      const { tableName, foreignKey, relatedTable, id } = req.params;
      connection = await pool.getConnection();

      // First, verify the relationship exists
      const [relationship] = await connection.query(
        `
            SELECT 
                COLUMN_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE 
                TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = ?
                AND REFERENCED_TABLE_NAME = ?;
        `,
        [tableName, relatedTable]
      );

      if (relationship.length === 0) {
        return res.status(400).json({
          error: `No relationship found between ${tableName} and ${relatedTable}`,
        });
      }

      // Perform the JOIN query
      const [records] = await connection.query(
        `
            SELECT child.*
            FROM ?? child
            JOIN ?? parent ON child.?? = parent.??
            WHERE parent.id = ?
        `,
        [tableName, relatedTable, foreignKey, "id", id]
      );

      res.json({
        parent_table: relatedTable,
        parent_id: id,
        child_table: tableName,
        record_count: records.length,
        records: records,
      });
    } catch (error) {
      console.error("Error fetching related records:", error);
      res.status(500).json({ error: "Failed to fetch related records" });
    } finally {
      if (connection) connection.release();
    }
  },
  //many-to-many
  getManytoManyRecords: async (req, res) => {
    let connection;
    try {
      const {
        table1, // First main table (e.g., products)
        table2, // Second main table (e.g., categories)
        junctionTable, // Junction table (e.g., product_categories)
        id, // ID from table1 to look up
      } = req.params;

      connection = await pool.getConnection();

      const [junctionRelationships] = await connection.query(
        `
        SELECT 
            TABLE_NAME,
            COLUMN_NAME,
            REFERENCED_TABLE_NAME,
            REFERENCED_COLUMN_NAME
        FROM
            INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE 
            TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = ?
            AND REFERENCED_TABLE_NAME IN (?, ?);
        `,
        [junctionTable, table1, table2]
      );

      if (junctionRelationships.length < 2) {
        return res.status(400).json({
          error: `Invalid many-to-many relationship between ${table1} and ${table2} through ${junctionTable}`,
        });
      }
      // Perform the double JOIN query
      const [records] = await connection.query(
        `
        SELECT t2.*
        FROM ?? t1
        JOIN ?? j ON t1.id = j.product_id
        JOIN ?? t2 ON j.category_id = t2.id
        WHERE t1.id = ?
        `,
        [table1, junctionTable, table2, id]
      );

      res.json({
        source_table: table1,
        source_id: id,
        related_table: table2,
        junction_table: junctionTable,
        record_count: records.length,
        records: records,
      });
    } catch (error) {
      console.error("Error fetching many-to-many records:", error);
      res.status(500).json({ error: "Failed to fetch many-to-many records" });
    } finally {
      if (connection) connection.release();
    }
  },
};

module.exports = schemaController;
