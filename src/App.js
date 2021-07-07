import React, {useEffect} from 'react'
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

//ленивая загрузка компонента AddTodo
const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
    const [todos, setTodos] = React.useState([])
    const[loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)
                }, 2000)

            })
    }, [])

    // обрабатывает клик по чекбоксу
    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        )
    }

  //  удаляет задачу
    function removeTodo(id){
        // при нажатии фильтрую массив, если переданный id не равняеться id в массиве то он остаеться, если равняеться то..
        setTodos(todos.filter(todo => todo.id !== id))
    }

  //  добавляет todo
    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

  return (
      <Context.Provider value={{removeTodo}}>
          <div className="wrapper">
              <h1>React tutorial</h1>

              <Modal/>

              <React.Suspense fallback={<Loader/>}>
                  <AddTodo onCreate={addTodo}/>
              </React.Suspense>

              {loading && <Loader/>}
              {
                  todos.length ? ( // если массив записей больше 0 вывожу его а иначе параграф
                      <TodoList
                          todos = {todos}
                          onToggle={toggleTodo}
                      />
                  ) : loading ? null : (
                      <p>No todos!</p>
                  )
              }

          </div>
      </Context.Provider>

  )
}

export default App;
