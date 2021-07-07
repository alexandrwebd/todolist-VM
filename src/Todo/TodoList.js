import React from 'react'
import PropTypes from 'prop-types' // валидация входящих параметров
import TodoItem from "./TodoItem";

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

 function TodoList (props) {
    return (
        <ul style={styles.ul}>
            {props.todos.map((todo, index) => (
                <TodoItem todo = {todo} index = {index} key={todo.id} onChange={props.onToggle}/>
            ))}
        </ul>
    )
}

//валидирую входящие параметры
TodoList.propTupes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired, //входит массив обьектов и он нам необходим для работы этого компонента
    onToggle: PropTypes.func.isRequired // принимаю функцию для работы этого компонента
}

export default TodoList