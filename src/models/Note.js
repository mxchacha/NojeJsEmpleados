const { Schema, model } = require("mongoose");
const mongoose=require('mongoose');
const empleado=mongoose.model('empleado')

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    empleado:{
      type:Schema.ObjectId, ref:"empleado"
    }

  },
  {
    timestamps: true
  }
);

module.exports = model("Note", NoteSchema);
