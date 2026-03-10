const express = require('express');
const app = express();
const port = 4000;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors=require("cors");
app.use(cors())
app.listen(port,()=>{
console.log(`My Server listening on port ${port}`)
})
app.get("/",(req,res)=>{
res.send("This Web server is processed for MongoDB")
})
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion1");

app.get("/fashions",cors(),async (req,res)=>{
const result = await fashionCollection.find({}).toArray();
res.send(result)
}
)

app.get("/fashions/:id",cors(),async (req,res)=>{
var o_id = new ObjectId(req.params["id"]);
const result = await fashionCollection.find({_id:o_id}).toArray();
res.send(result[0])
}
)

app.post("/fashions",cors(),async(req,res)=>{
//put json Fashion into database
await fashionCollection.insertOne(req.body)
//send message to client(send all database to client)
res.send(req.body)
})

app.put("/fashions",cors(),async(req,res)=>{
//update json Fashion into database
await fashionCollection.updateOne(
{_id:new ObjectId(req.body._id)},//condition for update
{ $set: { //Field for updating
style: req.body.style,
fashion_subject:req.body.fashion_subject,
fashion_detail:req.body.fashion_detail,
fashion_image:req.body.fashion_image
}
}
)
//send Fahsion after updating
var o_id = new ObjectId(req.body._id);
const result = await fashionCollection.find({_id:o_id}).toArray();
res.send(result[0])
})

///delete fashion by id
app.delete("/fashions/:id", cors(), async (req, res) => {
    var o_id = new ObjectId(req.params["id"])
    await fashionCollection.deleteOne({_id: o_id})
    const result = await fashionCollection.find({}).toArray()  // ← lấy toàn bộ list
    res.send(result)  // ← gửi list mới
})