const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use((req, res, next) => {
  console.log("Woooooow");
  next();
});

const tours = JSON.parse(fs.readFileSync("./tours-simple.json", "utf-8"));
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: tours,
  });
};
const writeTour = async (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile("./tours-simple.json", JSON.stringify(tours), (err) => {
    res
      .status(201)
      .json({ status: "success", results: newTour.length, data: newTour });
  });
};

const getTour =async (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((elem) => elem.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }

  res.status(200).json({ status: "success", data: tour });
};

const updateTour =async (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((elem) => elem.id === id);
  if (!tour) {
    return res.status(404).json({ status: "failed", data: "Id not found" });
  }
  const updateTour = Object.assign(tour, req.body);

  res.status(200).json({ status: "success", data: updateTour });
};

const deletTour = async(req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((elem) => elem.id === id);

  if (!tour) {
    res.status(404).json({ ststus: "Failed", data: "Not found" });
  }
  tours.forEach((element, index) => {
    if (element.id === id) {
      tours.splice(index, 1);
    }
  });
  console.log(tour);

  res.status(200).json({ status: "success", data: tours });
};

app.route("/api/v1/tours").get(getAllTours).post(writeTour);

app.route("/api/v1/tours/:id").get(getTour).put(updateTour).delete(deletTour);

app.listen(3000, () => {
  console.log("Listening");
});
