import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    priority: {
      type: String,
      enum: ['extreme', 'moderate', 'low'],
      default: 'moderate',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);
