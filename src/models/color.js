import mongoose, { Schema } from 'mongoose'

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  introduce: {
    type: String,
    required: true,
    trim: true
  },
  rgb: { // #12ab34 에서 12ab34
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 6
  },
  kelvin: {
    type: Number,
    required: true
  }
})

export default mongoose.model('color', colorSchema)
