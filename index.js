const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://dbUser:BPCF1oZNzDYSH3X3@cluster0.41z8na8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();

    const documentCollection = client.db("idol-group").collection("documents");

    app.get("/documents", async (req, res) => {
      const query = {};
      const cursor = documentCollection.find(query);
      const documents = await cursor.toArray();
      res.send(documents);
    });

    app.get("/documents/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const document = await documentCollection.findOne(query);
      res.send(document);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From idol group");
});

app.listen(port, () => {
  console.log(`idol app listening on port ${port}`);
});
