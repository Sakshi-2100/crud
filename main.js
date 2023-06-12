const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

// POST /createContact
app.post("/createContact", async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  if (data_store === "CRM") {
    try {
      const apiKey = "TWaf2Sjom1lwh9A267dNIg";
      const url = "student-588417745674560757.myfreshworks.com/api/contacts";

      const response = await axios.post(
        url,
        {
          first_name,
          last_name,
          email,
          mobile_number,
        },
        {
          headers: {
            Authorization: `Token token=${apiKey}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data_store parameter" });
  }
});

// GET /getContact
app.get("/getContact", async (req, res) => {
  const { contact_id, data_store } = req.body;

  if (data_store === "CRM") {
    try {
      const apiKey = "TWaf2Sjom1lwh9A267dNIg";
      const url = `student-588417745674560757.myfreshworks.com/api/contacts/${contact_id}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Token token=${apiKey}`,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data_store parameter" });
  }
});

// POST /updateContact
app.post("/updateContact", async (req, res) => {
  const { contact_id, new_email, new_mobile_number, data_store } = req.body;

  if (data_store === "CRM") {
    try {
      const apiKey = "TWaf2Sjom1lwh9A267dNIg";
      const url = `student-588417745674560757.myfreshworks.com/api/contacts/${contact_id}`;

      const response = await axios.put(
        url,
        {
          email: new_email,
          mobile_number: new_mobile_number,
        },
        {
          headers: {
            Authorization: `Token token=${apiKey}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data_store parameter" });
  }
});

// POST /deleteContact
app.post("/deleteContact", async (req, res) => {
  const { contact_id, data_store } = req.body;

  if (data_store === "CRM") {
    try {
      const apiKey = "TWaf2Sjom1lwh9A267dNIg";
      const url = `student-588417745674560757.myfreshworks.com/api/contacts/${contact_id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Token token=${apiKey}`,
        },
      });

      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data_store parameter" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});