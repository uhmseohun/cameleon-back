import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: { // todo: 길이 등 검증 필요
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: Schema.Types.ObjectId,
  class: [
    {
      type: Schema.Types.ObjectId
    }
  ]
})

export default mongoose.model('user', userSchema)
