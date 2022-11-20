const express = require("express");
const router = express.Router();
const {
  getEnvelopes,
  addEnvelope,
  getEnvelopesById,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
  addABudgetToManyEnvelopes,
} = require("../controllers/envelopes");

router.post("/", addEnvelope);
router.get("/", getEnvelopes);
router.get("/:id", getEnvelopesById);
router.put("/:id", updateEnvelope);
router.delete("/:id", deleteEnvelope);
router.post("/transfer/:fromId/:toId", transferBudget);
router.post("/multiEnvelopes", addABudgetToManyEnvelopes);

module.exports = router;
