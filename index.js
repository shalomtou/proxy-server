// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get("/", async (req, res) => {
//   try {
//     const responseData = { data: "response from weather proxy" };
//     res.json(responseData);
//   } catch (error) {
//     console.error("Error handling request:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Define a route to proxy requests to the weather API
// app.get("/weather", async (req, res) => {
//   const { apiKey = "5cbf0a4aca94419eb5a120540241004", location = "Tel aviv" } =
//     req.query;

//   console.log(apiKey, location);

//   try {
//     const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=14`;
// "https://api.weatherapi.com/v1/forecast.json?key=5cbf0a4aca94419eb5a120540241004&q=Tel aviv&days=14"
//     const response = await axios.get(apiUrl);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server is running on http://localhost:${port}`);
// });

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Define a route to proxy requests to the target API
app.get("/proxy", async (req, res) => {
  // url should be encoded before sended to this proxy
  const { url } = req.query;

  console.log("==== proxy ====\n");
  console.log("url:", url);

  try {
    // Make a request to the target API
    const response = await axios.get(url);

    // log response
    console.log("response:", response.data);

    // Send the response from the target API back to the client
    res.json(response.data);
  } catch (error) {
    // If there's an error, send an error response to the client
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});

// Export the Server API
module.exports = app;
