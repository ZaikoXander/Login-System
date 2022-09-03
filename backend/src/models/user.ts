import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

const User = model("User", UserSchema)

export default User
