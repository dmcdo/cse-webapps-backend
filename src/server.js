import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"

const port         = 8000;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_pass = process.env.MONGODB_PASS;
const mongodb_url  = `mongodb+srv://${mongodb_user}:${mongodb_pass}@milestone3.vwix0hd.mongodb.net/milestone3`;
const mongodb_db   = "milestone3";

const app = express();
app.use(express.json());
app.use(cors());

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
