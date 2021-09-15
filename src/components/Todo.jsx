import { useState } from 'react';
import { TodoInput } from './TodoInput';
import {ShowTodo} from "./ShowTodo";


export function Todo() {

    const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1)

    
    return (
      <div>
        <TodoInput
          todoList={todoList}
          setTodoList={setTodoList}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
        />
        <ShowTodo
          todoList={todoList}
          setTodoList={setTodoList}
          loading={loading}
          setLoading={setLoading}
          page={page}
        />

      </div>
    );

}