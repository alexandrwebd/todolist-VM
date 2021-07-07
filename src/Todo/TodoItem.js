import React, {useContext} from "react";
import PropTypes from 'prop-types'
import Context from "../context";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        borderRadius: '4px',
        marginBottom: '.5rem',
        border: '1px solid #ccc'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem ({todo, index, onChange}) {
    const {removeTodo} = useContext(Context)
    // добавляю класс при чекед
    const classes = []
    if (todo.completed) {
        classes.push('done')
    }
    return (
       <li style={styles.li}>
           <span className={classes.join(' ')}>
               <input style={styles.input} type="checkbox" checked={todo.completed} onChange={() => onChange(todo.id)}/>
                <strong>{index + 1}.</strong>
               &nbsp;
               {todo.title}
           </span>

           <button className={'rm'} onClick={() => removeTodo(todo.id)}>&times;</button>
           {/*<button className={'rm'} onClick={removeTodo.bind(null, todo.id)}>&times;</button>*/}
       </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired, // todo - обьект и он нам необходим для работы этого компонента, и индекс - число
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired // принимаю функцию для работы этого компонента
}

export default  TodoItem