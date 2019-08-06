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
  students: {
    type: [ Schema.Types.ObjectId ],
    default: []
  },
  president: { // 반장이나 부반장 등
    type: [ Schema.Types.ObjectId ],
    default: []
  },
  colors: {
    type: Object,
    default: {}
  }
})

export default mongoose.model('class', classSchema)
