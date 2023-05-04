import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();

const port        = 8000;
const mongodb_url = process.env.MONGODB_URL;
const mongodb_db  = process.env.MONGODB_DB;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/get/tasks/byid/:id", async (req, res) => {
    const { id } = req.params;

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });

    res.json(task);
});

app.get("/api/get/tasks/byuser/:user", async (req, res) => {
    const { user } = req.params;

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const tasks = await db.collection("tasks").find({ user }).toArray();

    res.json(tasks);
});

app.put("/api/put/task/", async (req, res) => {
    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const ack = await db.collection("tasks").insertOne({
        name:        req.body.name,
        user:        req.body.user,
        category:    req.body.category,
        urgency:     req.body.urgency,
        startDate:   req.body.startDate,
        endDate:     req.body.endDate,
        location:    req.body.location,
        status:      req.body.status,
        description: req.body.description,
    });

    res.json({ acknowledged: ack.acknowledged });
});

app.put("/api/update/task/", async (req, res) => {
    console.log(`Request to update ${req.body.id}`);

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const filter = { _id: new ObjectId(req.body.id) };
    const update = { $set: {
        name:        req.body.name,
        user:        req.body.user,
        category:    req.body.category,
        urgency:     req.body.urgency,
        startDate:   req.body.startDate,
        endDate:     req.body.endDate,
        location:    req.body.location,
        status:      req.body.status,
        description: req.body.description,
    } };

    const ack = await db.collection("tasks").updateOne(filter, update);
    res.json({ acknowledged: ack.acknowledged });
});

app.delete("/api/delete/task/byid/:id", async (req, res) => {
    console.log(`Request to delete ${req.params.id}`);

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const ack = await db.collection("tasks").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ acknowledged: ack.acknowledged });
});

app.listen(port, () => {
    console.log(`Using ${mongodb_db}@${mongodb_url}`);
    console.log(`Listening for connections on port ${port}...`);
});
