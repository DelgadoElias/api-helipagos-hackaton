import dotenv from "dotenv";
dotenv.config();
import "./lib/db";
import express from "express";
import countryRoutes from "./routes/country";
import personRoutes from "./routes/person";
import examRoutes from "./routes/exams";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

/** 
   app.use(express.raw({ type: "application/vnd.custom-type" }));
   app.use(express.text({ type: "text/html" }));
*/
app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.use("/countries", countryRoutes);
app.use("/person", personRoutes);
app.use("/exams", examRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
