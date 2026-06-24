const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/ticket").then(() => {console.log("db is connected")}).catch((err) => {console.log(err)})

const Item = mongoose.model("Item",{
    ticketid : {type:Number, unique:true},
    customername : String,
    issue : String,
    status :[String],
    ticketdate :Date
})

app.post('/add', async (req,res) => {
    const ticketid = Number(req.body.ticketid);
    const ticketdate = new Date(req.body.ticketdate);
    const customername = req.body.customername;
    const issue = req.body.issue;
    const status = req.body.status;
    const item = new Item({
        ticketid,
        customername,
        issue,
        status,
        ticketdate
    })
    await item.save();
    res.status(200).send({msg : "added!!"});
})

app.delete('/deletebtech', async (req,res) => {
    await Item.deleteMany({ customername : {$regex : "a", $options: "i"}});
    res.status(200).json({
      msg: "Deleted successfully"})
})

app.get('/get', async (req,res) => {
    const a = await Item.find();
    res.json(a);
})



app.delete('/delete/:name', async (req,res) => {
    await Item.deleteMany({customername: req.params.name})
    res.status(200).json({
      msg: "Deleted successfully"})
}
)

app.put('/update/:id', async (req,res) => {
    await Item.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.status(200).json({
      msg: "updated successfully"})
})


app.listen(5000, () => {console.log("app is in port 5000")});