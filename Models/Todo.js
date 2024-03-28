// DB 관련 처리
const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

const TodoSchema = new mongoose.Schema({
  // schema
  // autoincrement field는 plugin()에서 생성
  task: String,
  done: {type: Boolean, default: false}
  }, { versionKey: false }) // option : __v 필드 삭제

TodoSchema.plugin(AutoIncrement, {inc_field: "id"})

module.exports = mongoose.model("Todo", TodoSchema)