const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.HAPIKEY;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get("/", async (req, res) => {
    
    const url =
      "https://api.hubspot.com/crm/v3/objects/2-15312185?properties=name&properties=address&properties=favriates&limit=10";

    const headers = {
      Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
      "Content-Type": "application/json",
    };

    try {
      const resp = await axios.get(url, { headers });
      const data = resp.data.results;
      res.render("home", { title: "Home | HubSpot APIs", data });
    } catch (error) {
      // console.log(PRIVATE_APP_ACCESS)
      console.error(error);
    }
  });

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get("/update-cobj", (req, res) => {
    res.render("updates", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
    });
  });
  

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post("/update-cobj", async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/2-15312185`;

    const headers = {
      Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
      "Content-Type": "application/json",
    };

    const data = {
      properties: {
        name: req.body.name,
        address: req.body.address,
        favriates: req.body.favriates,
      },
    };
    
    try {
      await axios.post(url, data, { headers });
      res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  });

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));