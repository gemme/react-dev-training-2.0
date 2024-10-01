const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { faker } = require("@faker-js/faker");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/currencies", (req, res) => {
  // es conveninente hacer fetch directamente
  // puesto que node en sus ultimas versiones ya implementa fetch
  axios
    .get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
    )
    .then(({ data }) => {
      res.json(data);
    });
});

app.get("/currencies/base/:base/target/:target", (req, res) => {
  console.log(req.params);
  const { base, target } = req.params;
  fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/${base}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json({
        rate: data[base][target],
      });
    });
});

const users = [
  {
    name: "Ernesto",
    lastName: "Martinez",
    currency: "EUR",
    id: "69eab871698eaa8421ec",
  },
  {
    name: "Florinda",
    lastName: "Mezaa",
    currency: "MXN",
    id: "8447d98ef422cd15d471",
  },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  users.push({ id: faker.string.uuid(), ...req.body });
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
