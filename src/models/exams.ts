import { model, Schema, Document } from "mongoose";

interface IExam extends Document {
  personId: string;
  githubName: string;
  name: string;
  repoName: string;
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
    type: String,
  },
  note: {
    type: Number,
    default: 0,
  },
  repoName: {
    type: String,
    default: "",
  },
});

const ExamModel = model<IExam>("Exam", ExamSchema);

export { ExamModel, IExam };
