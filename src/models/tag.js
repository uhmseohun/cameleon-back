import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  payload: {
    type: Number,
    required: true
  },
  color: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('tag', tagSchema)
