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

app.get('/',(req,res) =>{
    res.send("Welcome to the Event Server")
})

app.post('/events', async (req,res) =>{
    const newData = req.body;
    const result = await events.insertOne(newData);
    res.send(result);
});

app.listen(PORT, () =>{
    console.log(`Event Server is running on port:${PORT}`)
});