import React, {useState} from "react";
import PropTypes from "prop-types";

//кастомный хук
function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: e => setValue(e.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}


function AddTodo({onCreate}) {

    const input = useInputValue('')

    // добавляет запись в массив todos
    function submitHandler(e) {
        e.preventDefault()

        if (input.value().trim()){
            onCreate(input.value())
            input.clear()
        }
    }
    return (
        <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
            <input {...input.bind}/>
            <button tupe="submit">Add todo</button>
        </form>
    )
}

AddTodo.propTupes = {
    onCreate: PropTypes.func.isRequired
}
export default AddTodo