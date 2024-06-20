//SELECT ELEMENT
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')
const todoListEl = document.getElementById('todos-list')

//VAR
let todos = []
let editTodoId = -1
//FORM SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault()
    saveTodo()
    renderTodos()
})

//SAVE TODO
function saveTodo() {
    const todoValue = todoInput.value

    const isDuplicate = todos.some(todo => todo.value.toUpperCase() === todoValue.toUpperCase())

    if (todoValue === '') {
        alert("Todo's input is empty")
    } else if (isDuplicate) {
        alert("Todo already exists!")
    } else if (editTodoId >= 0) {
        todos = todos.map((todo, index) => ({
            ...todo,
            value: index === editTodoId ? todoValue : todo.value
        }))
        editTodoId = -1

    } else {


        todos.push({
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        })
        // todoInput.value = ''
        // todoInput.focus()
    }
    todoInput.value = ''
    todoInput.focus()
}

//RenderTodo
function renderTodos() {

    //Clear element before render
    todoListEl.innerHTML = ''

    //Render
    todos.forEach((todo, index) => {
        todoListEl.innerHTML += `
          <div class="todo" id=${index}>
          <i 
            class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
            style = "color:${todo.color}"
            data-action ="check"
          ></i>
          <p class="" data-action ="check">${todo.value}</p>
          <i class="bi bi-pencil-square" data-action ="edit" ></i>
          <i class="bi bi-trash" data-action ="delete"></i>
        </div> 
        `
    })
}

//Click event listener for all the todos
todoListEl.addEventListener('click', (e) => {
    const target = e.target
    const parentElement = target.parentElement
    if (parentElement.className !== 'todo') return

    const todo = parentElement
    const todoId = Number(todo.id)

    const action = target.dataset.action

    action === 'check' && checkTodo(todoId)
    action === 'edit' && editTodo(todoId)
    action === 'delete' && deleteTodo(todoId)


})

function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked
    }))
    renderTodos()
}

function editTodo(todoId) {
    todoInput.value = todos[todoId].value
    editTodoId = todoId
}

function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId)
    editTodoId = -1
    renderTodos()
}

