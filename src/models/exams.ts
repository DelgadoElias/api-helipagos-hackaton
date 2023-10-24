import { model, Schema, Document } from "mongoose";

interface IExam extends Document {
  personId: string;
  githubName: string;
  name: string;
}

const ExamSchema = new Schema({
  personId: {
    type: String,
    unique: true,
  },
  githubName: {
    type: String,
  },
  name: {
    type: String
  }
});

const ExamModel = model<IExam>("Exam", ExamSchema);

export { ExamModel, IExam };
