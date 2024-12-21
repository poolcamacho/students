const express = require("express");
const router = express.Router();

let students = [];
let idCounter = 1;

router.post("/", (req, res) => {
  const { name, email, age } = req.body;
  const newStudent = { id: idCounter++, name, email, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.get("/", (req, res) => {
  res.json(students);
});

router.get("/std", (req, res) => {
  res.json(students);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  const student = students.find((s) => s.id === parseInt(id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  student.name = name || student.name;
  student.email = email || student.email;
  student.age = age || student.age;

  res.json(student);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = students.findIndex((s) => s.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
