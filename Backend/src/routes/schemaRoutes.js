const express = require("express");
const router = express.Router();
const schemaController = require("../controllers/schemaController");

//Route to get all tables
router.get("/tables", schemaController.getAllTables);

router.get("/table/:tableName/data", schemaController.getTableData);

//Route to get specific table structure
router.get("/table/:tableName", schemaController.getTableStructure);

router.get(
  "/table/:tableName/relationships",
  schemaController.getTableRelationships
);

router.get(
  "/join/:tableName/:foreignKey/:relatedTable/:id",
  schemaController.getRelatedRecords
);

router.get(
  "/many-to-many/:table1/:table2/:junctionTable/:id",
  schemaController.getManytoManyRecords
);

module.exports = router;

//keep in mind, here, routes do not contain /api anymore since we will include em in server.js
//We are directly using the controller methods we created.
