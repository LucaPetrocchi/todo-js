class TodoList {
  constructor() {
    this.items = this.loadTasks()
    self = this // this is there because "this" is lost
    // when calling this.methods() inside 
    // eventListener arrow function callbacks.
    // bind does not work
  }

  loadTasks() {
    return JSON.parse(localStorage.getItem('tasks'))
  }

  init() {
    // change toDo -> this
    let allTasks = this.getAllTasks()
    list = document.getElementById("list")
    list.setAttribute('class', 'taskList')

    allTasks.forEach(this.createTaskItem)
  }
  
  createTask(task, complete) {
    const id = this.items.length
    
    let newItem = {
      id: id,
      task: task,
      complete: complete,
    }
    
    this.createTaskItem(newItem)
    
    this.items.push(newItem)
    this.saveTasks()
  }

  updateTask = function(id, task, complete) {
    const exists = this.getTaskById(id)
    if (exists) {
      const index = this.items.indexOf(exists)

      if (task != undefined) { this.items[index].task = task }
      if (complete != undefined) { this.items[index].complete = complete }

      console.log(this.items[index].task)

      this.saveTasks()
    } else {
      console.log("does not exist")
    }
  } 
  
  createTaskItem(item) {

    let li = document.createElement('li')
    li.setAttribute('class', 'taskBox')
    li.setAttribute('id', `itemNumber${item.id}`)

    list.appendChild(li)
    
    let itemTask = document.createElement('textarea')
    itemTask.setAttribute('id', 'itemTask')
    li.appendChild(itemTask)
    itemTask.innerHTML = item.task
    
    let itemStatus = document.createElement('button')
    itemStatus.setAttribute('id', 'itemStatus')
    li.appendChild(itemStatus)
    itemStatus.innerHTML = item.complete ? "Complete" : "Incomplete"
    itemStatus.addEventListener('click' , () => {
      itemStatus.innerHTML = (itemStatus.innerHTML == "Complete") ? "Incomplete" : "Complete"
    })
    
    let saveButton = document.createElement('button')
    li.appendChild(saveButton)
    saveButton.innerHTML = "Save!"
    saveButton.addEventListener('click', () => {
      let task = itemTask.value
      let complete = (itemStatus.innerHTML == "Complete") ? true : false
      console.log(task)
      console.log(complete)

      self.updateTask(item.id, task, complete)
    })

    let deleteButton = document.createElement('button')
    li.appendChild(deleteButton)
    deleteButton.innerHTML = "Delete"
    deleteButton.addEventListener('click', (function() {
      self.deleteTask(item.id)
    }))
  }

  getAllTasks() {
    return this.items
  }

  getTaskById(id) {
    return this.items.find(item => item.id === id)
  }

  getTaskByStatus(status) {
    return this.items.filter(item => item.complete === status)
  }


  deleteTask(id) {
    const exists = this.getTaskById(id)
    if (exists) { 
      this.items.splice(id, 1) 
      document.getElementById(`itemNumber${id}`).remove()
      this.saveTasks()
    }
  }

  deleteAll() {
    document.getElementById('list').innerHTML = ""
    localStorage.removeItem('tasks')
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.items))
  }

}

// inicializacion demo
items = [
  {
    id: 0,
    task: "text",
    complete: true
  },
  {
    id: 1,
    task: "text",
    complete: false
  },
  {
    id: 2,
    task: "plexto",
    complete: true
  },
  {
    id: 3,
    task: "gogo",
    complete: false
  },
  {
    id: 4,
    task: "rara",
    complete: true
  },
]

let tasksExist = localStorage.getItem('tasks')
if (!tasksExist) {
  localStorage.setItem('tasks', JSON.stringify(items))
}

const toDo = new TodoList()
toDo.init()

document.getElementById('deleteAllButton').addEventListener('click', () => {
  toDo.deleteAll()
})

createTaskBoxChildren = document.getElementById('createTask').children
createTaskTextArea = createTaskBoxChildren[0]
createTaskStatus = createTaskBoxChildren[1]
createTaskSave = createTaskBoxChildren[2]

createTaskStatus.addEventListener('click', () => {
  createTaskStatus.innerHTML = (createTaskStatus.innerHTML == "Complete") ? "Incomplete" : "Complete"
})

createTaskSave.addEventListener('click', () => {
  let task = createTaskTextArea.value
  let complete = (createTaskStatus.innerHTML == "Complete") ? true : false
  toDo.createTask(task, complete)
})

sortButton = document.getElementById('sortButton')
let sortI = 0
sortButton.addEventListener('click', () => {
  sortI = (sortI + 1) % 3

  let showOnly = ""
  switch (sortI) {
    case 0:
      showOnly = "All"
      break
    case 1: 
      showOnly = "Complete"
      break
    case 2:
      showOnly = "Incomplete"
      break
  }
  
  items = document.getElementById('list').children
  
  for (let i = 0; i < items.length; i++) {
    let status = items[i].children[1].innerHTML
    if (status == showOnly || showOnly == "All") {
      items[i].classList.remove('hidden')
    } else {
      items[i].classList.add('hidden')
    }
  }


  sortButton.innerHTML = showOnly
})

// toDo.createTask("plerbo", true)
// console.log(toDo.items)
// console.log(toDo.getTaskByStatus(false))
// console.log(toDo.items[1])
// toDo.updateTask(1, undefined, true)
// toDo.deleteTask(3)
// toDo.updateTask(4, "coxo", false)
// console.log(toDo.items[1])
// console.log(toDo.items)