import mongoose, { Document } from "mongoose";
import validator from "validator";

interface ILandlord extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

const landlordsSchema = new mongoose.Schema<ILandlord>({
  name: {
    type: String,
    required: [true, "Landlord must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Landlord must have a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: ILandlord, el: string): boolean {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

export default mongoose.model<ILandlord>("Landlord", landlordsSchema);
