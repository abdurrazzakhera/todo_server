const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
//

//midleware
app.use(cors());
app.use(express.json());

//
app.get("/", (req, res) => {
  res.send("hello Expresws");
});

const uri =
  "mongodb+srv://tododemo1:3HoGNcvLWONMVG6i@cluster0.zf4unvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("todoapp").collection("todos");

    app.get("/todo", async (req, res) => {
      const result = await todoCollection.find().toArray();
      res.send(result);
    });
    app.post("/todo", async (req, res) => {
      const todoadd = req.body;
      const result = await todoCollection.insertOne(todoadd);
      res.send({ success: true, result });
      console.log(result);
    });
    //
    app.delete("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const productDeleted = await todoCollection.deleteOne(query);
      res.send(productDeleted);
    });

    //
  } finally {
  }
}
run();

app.listen(port, () => console.log(`Listening on port ${port}`));
