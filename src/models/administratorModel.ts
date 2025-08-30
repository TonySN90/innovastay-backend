import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IAdministrator extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const administratorSchema = new mongoose.Schema<IAdministrator>({
  name: {
    type: String,
    required: [true, "Administrator must have a name"],
  },
  email: {
    type: String,
    required: [true, "Administrator must have an email"],
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
    required: [true, "Administrator must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: IAdministrator, el: string): boolean {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
}, {
  timestamps: true,
});

administratorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined as any;
  next();
});

administratorSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IAdministrator>("Administrator", administratorSchema);