import React, { useState, useEffect} from "react";
export function ShowTodo({ todoList, setTodoList, loading ,setLoading,page}) {
    
    const handleDelete = (id) => {
        
      fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      }).then(() => {
      getTodos();
        
      })
        
    }

    const handleToggle = (id) => {
        fetch(`http://localhost:3001/todos/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((data) => data.json()).then((data) => {
            
            fetch(`http://localhost:3001/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify({status:!data.status}),
              headers: {
                "Content-Type": "application/json",
              },
            });
        getTodos();

        })
  }
  
  const getTodos = () => {
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
      .then((data) => data.json())
      .then((data) => {
        setTodoList(data);
        setLoading(false);
      });
  };

  return loading ? (
    "loading..."
  ) : (
    <div>
      {todoList.map((el) => {
          return (
            <div key={el.id}>
              <p>
                {el.title} - {el.status ? "Done" : "Not Done"}
              </p>
              <button
                onClick={() => {
                  handleDelete(el.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleToggle(el.id);
                }}
              >
                Toggle
              </button>
            </div>
          );
      })}
    </div>
  );
}
