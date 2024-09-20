const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
