import mongoose, { Schema } from 'mongoose'

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: 'color'
  },
  writer: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('subject', subjectSchema)
