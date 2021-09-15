import React, { useState,useEffect } from 'react';
import { nanoid } from 'nanoid';


export function TodoInput({ todoList, setTodoList,setLoading ,page,setPage}) {

    const [text, setText] = useState("");

    
    useEffect(() => {
        getTodos();
    }, [page]);

    const getTodos = () => {
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
          .then((data) => data.json())
          .then((data) => {
            setTodoList(data);
            setLoading(false);
          })
    }
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleClick = () => {
        const payload = {
            status: false,
            title: text,
            id: nanoid(3)
        };

        fetch("http://localhost:3001/todos", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            getTodos();
        })
        setText("");
    };

    return (
      <div>
        <h3>Todo list</h3>
        <input
          value={text}
          onChange={handleChange}
          type="text"
          placeholder="Enter Task"
        />
        <button onClick={handleClick}>Add Task</button>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    );

}