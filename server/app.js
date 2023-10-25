const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/strava/callback", async (req, res) => {
  try {
    console.log("test", req.query);
    const { data } = await axios.post(
      "https://www.strava.com/oauth/token",
      {},
      {
        params: {
          client_id: 112873,
          client_secret: "ff2d81564e9b3d62b028009abde3a7d3a596591d",
          code: req.query.code,
          grant_type: "authorization_code",
        },
      }
    );
    console.log(data, "<<");
    // res.status(200).json(data);

    // redirect ke halaman login client
    res.redirect(
      "http://localhost:5173/login?access_token=" + data.access_token
    );
    // https://www.strava.com/oauth/token?client_id=112873&client_secret=bfc831429ad72a4f7a28a84efce14d94292dc761&code=a87d381ae7b43b20833cfd8794122a18bec3b8b6&grant_type=authorization_code
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json(error);
  }
});

app.get("/Suggestion_Activies", async (req, res) => {
  const { level } = req.query;
  try {
    // console.log(level, "<<levl");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `rekomendasi latihan lari, untuk level ${level}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log("Sampe sini", completion)
    res.status(200).json(completion.choices);
  } catch (error) {
    console.log(error, "<<<");
    res.status(500).json(error);
  }
});
app.get("/activities", async (req, res) => {
  try {
    // const
    const { access_token } = req.headers;
    const {page, per_page} = req.query
    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing." });
    }
    const { data } = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          page, per_page
        }
      }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json(error);
  }
});

app.get("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Activity ID is missing." });
    }

    // console.log(id);x

    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing." });
    }

    const { data } = await axios.get(
      `https://www.strava.com/api/v3/activities/${id}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
});

app.post("/activities", async (req, res) => {
  try {
    // const
    const { access_token } = req.headers;
    const {
      name,
      type,
      sport_type,
      start_date_local,
      elapsed_time,
      description,
      distance,
    } = req.body;
    if (
      !name ||
      !type ||
      !sport_type ||
      !start_date_local ||
      !elapsed_time ||
      !description ||
      !distance
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const { data } = await axios.post(
      "https://www.strava.com/api/v3/activities",
      {
        name,
        type,
        sport_type,
        start_date_local,
        elapsed_time,
        description,
        distance,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    // console.log(error.response);
    // res.status(500).json(error);
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
});

app.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Activity ID is missing." });
    }

    const { name, type, sport_type, description } = req.body;

    if (!name || !type || !sport_type || !description) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const { access_token } = req.headers;

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing." });
    }

    const { data } = await axios.put(
      `https://www.strava.com/api/v3/activities/${id}`,
      {
        name,
        type,
        description,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
