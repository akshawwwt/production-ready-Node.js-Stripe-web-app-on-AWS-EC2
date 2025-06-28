const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;
const stripe = require("stripe")(api_key);

// ------------ Imports & necessary things here ------------

// Static directory fallback:
const staticDir = process.env.STATIC_DIR || "client";

// Setting up the static folder:
app.use(express.static(resolve(__dirname, staticDir)));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "index.html"));
});

// creating a route for success page:
app.get("/success", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "success.html"));
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "cancel.html"));
});

// Workshop page routes:
app.get("/workshop1", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "workshops", "workshop1.html"));
});
app.get("/workshop2", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "workshops", "workshop2.html"));
});
app.get("/workshop3", (req, res) => {
  res.sendFile(resolve(__dirname, staticDir, "workshops", "workshop3.html"));
});

// ____________________________________________________________________________________

const domainURL = process.env.DOMAIN;
app.post("/create-checkout-session/:pid", async (req, res) => {
  const priceId = req.params.pid;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${domainURL}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
  });

  res.json({ id: session.id });
});

// Server listening:
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`You may access your app at: ${domainURL}`);
});
