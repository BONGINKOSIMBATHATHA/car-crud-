import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

let cars = [
  { id: 1, color: 'white', make: 'Volkswagen', model: 'Polo', reg_number: 'CL 61045' },
  { id: 2, color: 'red', make: 'Toyota', model: 'Tazz', reg_number: 'CY 16875' },
  { id: 3, color: 'orange', make: 'Nissan', model: 'Juke', reg_number: 'CK 32655' },
  { id: 4, color: "white", make: "Nissan", model: "Micra", reg_number: "CJ 16103" },
  { id: 5, color: "orange", make: "Nissan",model: "Juke", reg_number: "CL 42789" },
  { id: 6, color: "blue", make: "Volkswagen", model: "Jetta", reg_number: "CA 46977" },
  { id: 7, color: "white", make: "Volkswagen", model: "Polo", reg_number: "CY 25661" },
  { id: 8, color: "white", make: "Nissan", model: "Micra", reg_number: "CY 35475" },
  { id: 9, color: "orange", make: "Toyota", model: "Corolla", reg_number: "CK 57166" },
  { id: 10, color: "orange", make: "Ford", model: "Fiesta", reg_number: "CL 77790" },
  { id: 11, color: "blue", make: "Nissan", model: "Juke", reg_number: "CY 98904" },
  // more car objects...
];

function mostPopularCar(cars) {
  const carMakeCounts = cars.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});

  const mostPopularMake = Object.keys(carMakeCounts).reduce((a, b) => carMakeCounts[a] > carMakeCounts[b] ? a : b);

  return mostPopularMake;
}

// CREATE
app.post('/api/cars', (req, res) => {
  const newCar = { id: cars.length + 1, ...req.body };
  cars.push(newCar);
  res.status(201).send(newCar);
});

// READ
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).send('Car not found');
  res.json(car);
});

// UPDATE
app.put('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).send('Car not found');
  Object.assign(car, req.body);
  res.json(car);
});

// DELETE
app.delete('/api/cars/:id', (req, res) => {
  const carIndex = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (carIndex === -1) return res.status(404).send('Car not found');
  const deletedCar = cars.splice(carIndex, 1);
  res.json(deletedCar);
});

// Endpoint to get the most popular car make
app.get('/api/mostPopularCar', (req, res) => {
  const popularMake = mostPopularCar(cars);
  res.json({ mostPopularMake: popularMake });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
