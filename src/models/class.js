import mongoose, { Schema } from 'mongoose'

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  grade: Number,
  class: Number,
  introduce: {
    type: String,
    required: true
  },
  colors: {
    type: Object,
    default: {}
  }
})

export default mongoose.model('class', classSchema)
