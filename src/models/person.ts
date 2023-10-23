import { model, Schema, Document } from "mongoose";

interface IPerson extends Document {
  name: string;
  email: string;
  stack: string;
  isConfirmed: boolean;
  isPresent:boolean;
  isSuccessfully:boolean;
}

const PersonSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  stack: {
    type: String,
  },
  isConfirmed:{
    type: Boolean
  },
  isPresent:{
    type:Boolean
  },
  isSuccessfully:{
    type: Boolean
  }
});

const PersonModel = model<IPerson>("Person", PersonSchema);

export { PersonModel, IPerson };
