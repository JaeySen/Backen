const mongoose = require("mongoose");
const { Schema } = mongoose;

// const representationSchema = new Schema({
//     id: Number
// }, { _id: false })

// const productSchema = new Schema({
//     id: Number,
//     name: String,
//     representation: [representationSchema],
//     type: String
// }, { _id: false })

// const spaceSchema = new Schema({
//     id: String,
// }, { _id: false })

// const storeySchema = new Schema({
//     elevation: Number,
//     id: Number,
//     name: String,
//     long_name: String,
//     products: [productSchema],
//     representation: [representationSchema],
//     spaces: [spaceSchema],
//     building: { type: Schema.Types.ObjectId, ref: "buildings"}
// }, { _id: false })

// const buildingSchema = new Schema({
//     id: Number,
//     name: String,
//     storeys: [storeySchema],
//     site: { type: Schema.Types.ObjectId, ref: "sites"}
// }, { _id: false })

// const projectSchema = new Schema({
//     globalId: String,
//     id: Number,
//     long_name: String,
//     name: String,
//     sites: {
//         buildings: [buildingSchema],
//         globalId: String,
//         id: Number,
//         name: String,
//         project: { type: Schema.Types.ObjectId, ref: "projects"}
//     },
//     $ref: String
// })

const projectSchema = new Schema({
  name: String,
  serverLocation: String,
  description: String,
  created: String,
  startDate: Number,
  endDate: Number,
  adminId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

module.exports = mongoose.model("Project", projectSchema, "projects");
