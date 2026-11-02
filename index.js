import express, { response } from "express";
import cors from "cors"
import 'dotenv/config'
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

const client = new MongoClient(`${process.env.MONGODB_URI}`);

export async function connectToMongoDB(){
    try{
        await client.connect();
        console.log("successfully connected")
        return client;
    }
    catch(err){
        console.dir();
    }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db('community');
const events = db.collection('events') ;
const eventJoins = db.collection('event-joins') ;

app.get('/',(req,res) =>{
    res.send("Welcome to the Event Server")
})

app.get('/events', async (req,res) =>{
    const allEvents = await events.find({}).toArray();
    res.send(allEvents);
});

app.get('/events/:id', async (req,res) =>{
    const id = req.params.id;
    const event = await events.findOne({_id: new ObjectId(id)});
    res.send(event);
});

app.get("/myevents/:userId", async (req, res) => {
    const userId = req.params.userId;
    const myEvents = await events.find({ organizerId: userId }).toArray();
    res.send(myEvents);
});

app.post('/events', async (req,res) =>{
    const newData = req.body;
    const result = await events.insertOne(newData);
    res.send(result);
});

app.patch('/events/:id', async (req,res) =>{
    const id = req.params.id;
    const updateData = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };
    const updateDoc = {
        $set: updateData,
    };
    const result = await events.updateOne(filter, updateDoc, options);
    res.send(result);
});

app.delete('/events/:id', async (req,res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await events.deleteOne(query);
    res.send(result);
});


// Event Joins API

app.get('/event-joins', async (req,res) =>{
    const allEventJoins = await eventJoins.find({}).toArray();
    res.send(allEventJoins);
});

app.post('/event-joins', async (req,res) =>{
    const newData = req.body;
    const result = await eventJoins.insertOne(newData);
    res.send(result);
});

app.get('/event-joins/:userId/event/:eventId', async (req, res) => {
    const { userId, eventId } = req.params;
    const joinRecord = await eventJoins.findOne({ "joinerdata.joinerId": userId, "eventdata._id": eventId });
    res.json(joinRecord);
});

app.delete('/event-joins/:id', async (req,res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await eventJoins.deleteOne(query);
    res.send(result);
});

app.get('/event-joins/:userId', async (req,res) =>{
    const userId = req.params.userId;
    const allEventJoins = await eventJoins.find({"joinerdata.joinerId": userId}).toArray();
    res.send(allEventJoins);
});

app.listen(PORT, () =>{
    console.log(`Event Server is running on port:${PORT}`)
});