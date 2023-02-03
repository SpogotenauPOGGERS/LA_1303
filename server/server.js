import express from "express";
import cors from "cors";
import shoes from "./data.js";
import { randomUUID, randomUUID as uuid } from "crypto";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(5000);

app.get("/allShoes", (req, res) => {
  res.json(shoes);
});

app.get("/shoe/:id", (req, res) => {
  const { id } = req.params;
  const shoe = shoes.find((shoe) => id === shoe.id);
  res.json(shoe);
});

app.post("/addShoe", (req, res) => {
  console.log(req.body);
  const { name, release, colorWay, price } = req.body;

  const newShoe = {
    id: uuid(),
    name: name,
    release: release,
    colorWay: colorWay,
    price: price,
  };

  res.json(newShoe);

  shoes.push(newShoe);
});

app.put("/changeShoe/:id", (req, res) => {
  const { id } = req.params;
  const shoe = shoes.find((shoe) => id === shoe.id);
  const { name, release, colorWay, price } = req.body;

  shoe.name = name;
  shoe.release = release;
  shoe.colorWay = colorWay;
  shoe.price = price;

  res.json({ shoe });
});

app.delete("/deleteShoe/:id", (req, res) => {
  const { id } = req.params;

  const shoe = shoes.find((shoe) => shoe.id === id);
  const index = shoes.indexOf(shoe);
  shoes.splice(index, 1);

  res.json(shoes);
});

// login part here
const users = [
  {
    name: "Tim",
    password: "$2b$10$PCyuH1kw6cSUWuL3l2X9RusD1uDzj5lN9WEFImeBIIMTzxjpMKX0q",
  },
];

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;

  try {
    // const salt = await bcrypt.genSalt();
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = { name: name, password: hashedPassword };
    users.push(user);
    res.status(201).json({ register: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMessage: err.message });
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("no user with this name");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ login: true, accessToken: accessToken });
    } else {
      res.json({ login: true, errMessage: "wrong password" });
    }
  } catch {
    res.status(500);
  }
});
app.get("/posts", authenticateToken, (req, res) => {
  res.json(users.filter((user) => user.name === req.user.name));
});
function authenticateToken(req, res, next) {
  console.log(req.body);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/users", (req, res) => {
  res.json(users);
});
