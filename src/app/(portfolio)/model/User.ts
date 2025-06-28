import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});


const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;