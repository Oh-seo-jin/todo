// axios 실습이니 express 간소화를 위해 한 파일에 정리
const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./Models/Todo')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json()) // middleware 등록, server에서 json의 형태로 전송

mongoose.connect("mongodb://localhost/todolist")

app.get('/get', async(req, res) => {
  const todos = await Todo.find()
  console.log('/get 호출')
  console.log(todos)
  res.json(todos)
})

app.post('/add', async(req, res) => {
  const task = req.body.task
  console.log(task)
  const todos = await Todo.create({task:task})
  console.log('/add 호출')
  console.log(todos)
  res.json(todos)
})

app.put('/update/:id', async(req, res) => {
  const {id} = req.params
  console.log(id)
  const todo = await Todo.findById(id)
  todo.done = !todo.done
  todo.save()
  console.log('/update/:id 호출')
  console.log(todo)
  res.json(todo)
})

app.delete('/delete/:id', async(req, res) => {
  const {id} = req.params
  const todos = await Todo.findByIdAndDelete({_id: id})
  console.log('/delete/:id 호출')
  console.log(todos)
  res.json(todos)
})

app.listen(3001, () => {
  console.log(":: SERVER STARTED ::")
})
