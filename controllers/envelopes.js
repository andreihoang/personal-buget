const dbEnvelopes = require("../config/db");
const { createId, findById, deleteById } = require("../helpers/helper");

const getEnvelopes = async (req, res) => {
  try {
    res.status(200).json(dbEnvelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};
const addEnvelope = async (req, res) => {
  try {
    const { title, budget } = req.body;
    const envelopes = await dbEnvelopes;
    const newId = createId(envelopes);
    const newEnvelop = {
      id: newId,
      title,
      budget: Number(budget),
    };
    envelopes.push(newEnvelop);
    res.status(200).json("Adding envelop successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};
const getEnvelopesById = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await dbEnvelopes.find(
      (envelop) => envelop.id === Number(id)
    );
    res.status(200).json(found);
  } catch (err) {
    res.status(400).send(err);
  }
};
const updateEnvelope = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, budget } = req.body;
    const envelopes = await dbEnvelopes;

    const foundEnvelop = await envelopes.find(
      (evelope) => evelope.id === Number(id)
    );

    if (!foundEnvelop) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    foundEnvelop.title = title;
    foundEnvelop.budget = budget;

    res.status(200).json(foundEnvelop);
  } catch (err) {
    res.status(400).send(err);
  }
};
const deleteEnvelope = async (req, res) => {
  try {
    const { id } = req.params;
    const envelopes = await dbEnvelopes;
    const envelope = await envelopes.find((en) => en.id === Number(id));

    if (!envelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }
    const index = dbEnvelopes.findIndex(
      (envelope) => envelope.id === parseInt(id)
    );
    dbEnvelopes.splice(index, 1);

    res.status(204).json(dbEnvelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

const transferBudget = async (req, res) => {
  try {
    const { fromId, toId } = req.params;
    const { transferAmount } = req.body;

    const envelopes = await dbEnvelopes;
    const fromEnvelope = envelopes.find((env) => env.id === Number(fromId));
    const toEnvelope = envelopes.find((env) => env.id === Number(toId));
    if (!fromEnvelope || !toEnvelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    if (fromEnvelope.budget < transferAmount) {
      return res.status(400).send({
        message: "Amount to transfer exceeds envelope budget funds",
      });
    }
    fromEnvelope.budget -= transferAmount;
    toEnvelope.budget += transferAmount;
    return res.status(204).json(fromEnvelope);
  } catch (err) {
    res.status(400).send(err);
  }
};
const addABudgetToManyEnvelopes = async (req, res) => {
  try {
    const { envelopes, budget } = req.body;
    for (let title of envelopes) {
      const newEnvelope = {
        id: createId(dbEnvelopes),
        title: title,
        budget: budget,
      };
      dbEnvelopes.push(newEnvelope);
    }
    dbEnvelopes.push();

    return res.status(200).json(dbEnvelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getEnvelopes,
  getEnvelopesById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
  addABudgetToManyEnvelopes,
};
