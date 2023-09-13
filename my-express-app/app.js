import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://192.168.7.150:4200" }));

const port = 3000;
const host = "192.168.7.150";

async function readDataFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file: ", error);
    return [];
  }
}

app.get("/", (req, res) => {
  res.send("Start Server!");
});

app.get("/tasks", async (req, res) => {
  const jsonData = await readDataFromFile("data.json");
  res.json(jsonData);
});

app.get("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  //   console.log(id); -> send object back

  try {
    const jsonData = await readDataFromFile("data.json");
    const item = jsonData.find((item) => item.id === id);
    // console.log(item); -> send object back
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error reading data from file: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const jsonData = await readDataFromFile("data.json");
    const taskId = jsonData.findIndex((task) => task.id === id);
    // console.log(taskIndex); -> return index back
    if (taskId !== -1) {
      jsonData.splice(taskId, 1);
      await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
      res.status(201).json({ response: "Everything is fine" });
    } else {
      res.status(404).json({ error: "Task ID not found" });
    }
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tasks/post", async (req, res) => {
  try {
    const existingData = await readDataFromFile("data.json");
    // console.log("request from angular: ", req.body);
    // console.log("exist data", existingData);
    console.log("show id", req.body);
    const maxId = existingData.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );
    // console.log("max id now: ", maxId);
    const new_task = {
      id: maxId + 1,
      task: req.body.task,
      date: req.body.date,
      reminder: req.body.reminder,
    };
    existingData.push(new_task);
    // console.log("after push data", existingData);
    await fs.writeFile("data.json", JSON.stringify(existingData, null, 2));
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error addind data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    // console.log("start put");

    // const start1 = Date.now();
    const existingData = await readDataFromFile("data.json");
    // const end1 = Date.now();
    // console.log("time read file", `${end1 - start1} ms`);

    const recordId = req.params.id;

    // // console.log("my record ID: ",typeof recordId);
    // const start2 = Date.now();
    const recordIndex = existingData.findIndex(
      (record) => record.id == recordId
    );

    // console.log("Index: ", recordIndex);

    if (recordIndex === -1) {
      res.status(500).json({ error: "Data index not exist" });
    } else {
      // console.log("recieve request data: ", req.body);
      const updateData = req.body;
      existingData[recordIndex] = {
        ...existingData[recordIndex],
        ...updateData,
      };

      try {
        await fs.writeFile("data.json", JSON.stringify(existingData, null, 2));
        res.status(201).json({ message: "Put success" });
      } catch (error) {
        console.log("Error update data");
        res.status(500).json({ error: "Internal server error" });
      }
    }

    // const end2 = Date.now();
    // console.log("time find index", `${end2 - start2} ms`);
    // console.log("record put index: ", recordIndex);
  } catch (error) {
    console.error("Error addind data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, host, () => {
  console.log(`Express app running on port: ${port}!`);
});
