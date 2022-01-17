const express = require("express");

const cors = require("cors");

const app = express();

const generateFile = require("./generateFile");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run", async (req, res) => {
  console.log(req.body);
  /*const { code }= req.body;

  if (code.value === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }*/
  // need to generate a r file with content from the request
  const filepath = await generateFile( req.body );
  return res.json( filepath );
});
app.get("/", (req,res) => {
  return res.json({hello: "world"});
});
app.listen(5000, () => {
    console.log(`Listening on port 5000!`);
  });