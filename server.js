const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("yaml");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerFile = fs.readFileSync("./swagger/swagger.yaml", "utf8");
const swaggerDocument = yaml.parse(swaggerFile);

swaggerDocument.servers = [
  { url: process.env.BASE_URL || `http://localhost:${PORT}` },
];

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Students Service running on port ${PORT}`);
  console.log(
    `Swagger docs available at ${swaggerDocument.servers[0].url}/api-docs`
  );
});
