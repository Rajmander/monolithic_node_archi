import express from "express";
import cors from "cors";
import morgan from "morgan";

export const loadExpress = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
};
