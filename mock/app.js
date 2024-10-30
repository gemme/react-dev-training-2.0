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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// expressjs servicios restful esta sobre node
// engine templates pug
// generar html con sintaxis indentado
// server side rendering
// beneficios quita stress
// performance mostramos
// React 19
// server components
// ejecutar sql y mostrarlas en su cliente a traves de stream
// NextJS
// Remix / Hydrogen

// client components

// pattern
// Backend for fronted
// por seguridad
// localhost:3000/api/collections
// shopify.prod/api/collections
// token, headers,
// token, host, headers
// redirect requests as proxy
// Server side rendering
