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

var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get("/create-cookie",cors(),(req,res)=>{
res.cookie("username","phuongthao")
res.cookie("password","123456")
account={"username":"phuongthao",
"password":"123456"}
res.cookie("account",account)
res.send("cookies are created")
})



app.get("/read-cookie",cors(),(req,res)=>{
//cookie is stored in client, so we use req
username=req.cookies.username
password=req.cookies.password
account=req.cookies.account
infor="username = "+username+"<br/>"
infor+="password = "+password+"<br/>"
if(account!=null)
{
infor+="account.username = "+account.username+"<br/>"
infor+="account.password = "+account.password+"<br/>"
}
res.send(infor)
})

//Expires after 360000 ms from the time it is set.
app.get("/clear-cookie",cors(),(req,res)=>{
res.clearCookie("account")
res.send("[account] Cookie is removed")
})

// ================================================
// THÊM VÀO index.js - Collection User + Login API
// ================================================

// Khai báo collection User (thêm cạnh fashionCollection)
userCollection = database.collection("User");

// Seed sample data nếu chưa có
async function seedUsers() {
    const count = await userCollection.countDocuments();
    if (count === 0) {
        await userCollection.insertMany([
            { username: "admin",        password: "admin123" }
        ]);
        console.log("Sample Users imported!");
    }
}
seedUsers();

// POST /login  ← route login
app.post("/login", cors(), async (req, res) => {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username, password });
    if (user) {
        res.cookie("username", user.username, { maxAge: 86400000 });
        res.cookie("fullname", user.fullname, { maxAge: 86400000 });
        res.cookie("email",    user.email,    { maxAge: 86400000 });
        res.send({ success: true, user: { username: user.username, fullname: user.fullname, email: user.email } });
    } else {
        res.status(401).send({ success: false, message: "Sai username hoặc password!" });
    }
});

// GET /read-login-cookie  ← đọc cookie login
app.get("/read-login-cookie", cors(), (req, res) => {
    res.send({
        username: req.cookies.username || null,
        fullname: req.cookies.fullname || null,
        email:    req.cookies.email    || null
    });
});

// GET /logout  ← xoá cookie
app.get("/logout", cors(), (req, res) => {
    res.clearCookie("username");
    res.clearCookie("fullname");
    res.clearCookie("email");
    res.send({ success: true, message: "Logged out" });
});