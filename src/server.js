import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const port         = 8000;
const mongodb_url  = "mongodb://127.0.0.1:27017";
const mongodb_db   = "cse-todo-app";

const app = express();
app.use(express.json());

let i = 0;

app.get("/api/get/tasks/byid/:id", async (req, res) => {
    const { id } = req.params;

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });

    console.log(task);
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
    console.log(req.body);

    const client = new MongoClient(mongodb_url);
    await client.connect();
    const db = client.db(mongodb_db);

    db.collection("tasks").insertOne({
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

    res.send(`Response #${i++}`);
});

app.listen(port, () => {
    console.log(`Listening for connections on port ${port}...`);
});
