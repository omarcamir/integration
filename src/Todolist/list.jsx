import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios.config";
import { useDebounce } from "../dobounce";
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [taskname, setTaskname] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const  getData =  () => {
    setTimeout(() => {
      axiosInstance.get("/todos").then((data) => {
        console.log(data.data);
        setTodos(data.data);
      });
    }, 500);
  }
  useEffect(() => {
getData()
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setTaskname(e.target.value);
  };

  const handleDelete = (id) => {
    console.log('id', id)
    axiosInstance.delete(`/todos/${id}`).then(() => getData())
  };
  const handleEdit = (status) => {
    status.isCompleted = false
    axiosInstance.patch('/todos/' + status.id, status).then(() => getData())
  };
  const handleDone = (status) => {
    status.isCompleted = true
    axiosInstance.patch('/todos/' + status.id, status).then(() => getData())
  };

  const addTask = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/todos", {
      method: "post",
      body: JSON.stringify({
        taskname,
        isCompleted: false,
      }),
      headers: {'content-type': 'application/json'}
    }).then((data) => {
      getData()
      setTaskname('')
    });
 

  };
  // const searchQuery = useDebounce(query, 2000)

 const  handleSearch = (e) => {
    console.log(e.target.value)
    e.preventDefault();
    setSearchName(e.target.value);
    axiosInstance.get("/todos", {
   params: {
        q: e.target.value,
      } 
    }).then((data) => {
      console.log(data.data, 'data.datadata.datadata.data');
      setTodos(data.data);
    });
  }
  return (
    <div className="todolist">
      <div className="search" onSubmit={addTask}>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search ex: todo 1"
          style={{ color: "white" }}
        />
      </div>
      <form className="addTask" onSubmit={addTask}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Add a task........"
          style={{ color: "white"}}
        />
        <button className="addtask-btn">Add Task</button>
      </form>
      <div className="lists">
          {todos?.map((todo, id) => (
          <div
            key={id}
            className={`list ${todo.isCompleted ? "completed" : ""}`}
          >
            
            <p style={{todo}}> {todo.taskname}</p>
            <div className="span-btns">
              {!todo.isCompleted && (
                <span onClick={() => handleDone(todo)} title="completed">
                  ✓
                </span>
              )}
              <span
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
                title="delete"
              >
                x
              </span>
              <span
                className="edit-btn"
                onClick={() => handleEdit(todo)}
                title="edit"
              >
                ↻
              </span>
            </div>
          </div>
        ))}
        {!todos?.length && <h1>No Records</h1>}
      </div>
    </div>
  );
};

export default Todolist;
