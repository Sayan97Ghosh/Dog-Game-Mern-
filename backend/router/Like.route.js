const express = require("express");
const { Likemodel } = require("../model/Likemodel");

const likeRouter = express.Router();



likeRouter.get("/:id", async (req, res) => {
  const userID = req.params.id
  console.log(userID);
  try {
    const getdata = await Likemodel.find({email:userID});

    res.send(getdata);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// likeRouter.get("/:id", async(req, res)=>{
//   try{
//     const id = req.params.id;
//     const userID = req.body.userId;
//     console.log(userID);
//     const user = await Likemodel.findOne({ _id: id });
//     console.log(user);
//     if(userID !== user.userId){
//       res.send("user is not authorized");
//     }else{
//       const getdata = await Likemodel.findById({_id:id});
//       res.send(getdata);
//     }
    
//   }catch(err){
//     res.status(500).send({ message: err.message });

//   }
// })


likeRouter.post("/post", async (req, res) => {
  try {
    const payload = req.body;
    const userID = req.body.userId;
    const time = new Date();
    console.log(time);
    // console.log(userID,time)
    console.log(payload);
    const new_note = new Likemodel(payload);
    await new_note.save();
    res.send({ message: "note is created" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

likeRouter.delete("/delete/:likeId", async (req, res) => {
  try {
    const likeId = req.params.likeId;

    const userID = req.body.userId;
    console.log(userID);
    const user = await Likemodel.findOne({ _id: likeId });
    console.log(user);
    if (userID !== user.userId) {
      res.send("user is not authorized");
    } else {
      await likeModel.findByIdAndDelete({ _id: likeId });
      res.send("note is deleted");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { likeRouter };