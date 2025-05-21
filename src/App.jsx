import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";

function App() {
  const [todo, settodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const SavetoLOCALSTIRAGE = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };
  const [showfionished, setshowfionished] = useState(true);

  const togglefinsnihed = () => {};

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("Todos"));
    if (storedTodos) {
      setTodos(storedTodos); // bin
    }
  }, []);

  useEffect(() => {
    if (Todos.length > 0) {
      localStorage.setItem("Todos", JSON.stringify(Todos));
    }
  }, [Todos]);
  // const handleedit=(e,id) => {
  //   let oldTOdo = Todos.filter(item =>  item.id === id )
  //   // console.log(oldTOdo);
  //   setTodos(oldTOdo.todo);
  //   let newTODO = Todos.filter(item => { return item.id !== id });
  //   setTodos(newTODO);

  // }
  const handleedit = (e, id) => {
    const oldTodo = Todos.find((item) => item.id === id);
    settodo(oldTodo.todo);
    const newTodos = Todos.filter((item) => item.id !== id); // remove the old todo from list
    setTodos(newTodos); // update todos state
    // SavetoLOCALSTIRAGE();
  };

  const handleDelete = (e, id) => {
    // let index = Todos.findIndex((item) => {
    //   return item.id === id;
    // });
    let NAYATODO = Todos.filter((item) => {
      return item.id !== id;
    });

    // NAYATODO[index].isCompleted = !NAYATODO[index].isCompleted;
    setTodos(NAYATODO);
    // console.log(newTodos, Todos);
    // SavetoLOCALSTIRAGE();
  };

  const handleADD = () => {
    setTodos([...Todos, { todo, id: uuidv4(), isCompleted: false }]);
    settodo("");
    // SavetoLOCALSTIRAGE();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const ToggleFinis=() => {
    setshowfionished(!showfionished);

    
  }
  
  const hacndleCHECKBOX = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });
    let NAYATODO = [...Todos];
    NAYATODO[index].isCompleted = !NAYATODO[index].isCompleted;
    setTodos(NAYATODO);

    // SavetoLOCALSTIRAGE();
  };

  return (
    <>
      <Navbar />
      <div className="container w-[75vw] mx-auto my-5 rounded-xl bg-indigo-100 text-black min-h-[80vh] top-8 bor">
        <div className="addtodo text-center top-2 ">
          <h2
            className="text-center text-lg font-bold my-3
  "
          >
            Add a todo{" "}
          </h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="bg-slate-400 mx-3 text-black px-3 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-[55vh] h-[30px] "
          />
          {/* <div className="flex"> */}
            <button
              className="border disabled:focus:ring-red-200 border-purple-300 px-3 py-2 rounded bg-violet-950 hover:bg-violet-700 rounded-1xl text-white h-[30px]"
              onClick={handleADD}
              disabled={todo.length === 0}
            >
              <IoIosSave className="scale-125 mask-center"/>
              
            </button>
          {/* </div> */}
        </div>
        <div className="flex justify-center items-center">
          <input
            onClick={ToggleFinis}
            type="checkbox"
            checked={showfionished}
          />{" "}
          Show Finished
        </div>
        <h2 className="text-lg font-bold mt-5 text-center py-2">Your Todo's</h2>

        <div className="todos">
          {Todos.length === 0 && (
            <div className="flex justify-center">
              No Todos to display , Please Add Todo
            </div>
          )}
          {Todos.map((item) => {
            return (
              (showfionished || !item.isCompleted) && (
                // <div className="flex gap-1 ">

                <div
                  key={item.id}
                  className="todo flex justify-between items-center w-full max-w-md mx-auto  my-3 p-3 "
                >
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={hacndleCHECKBOX}
                    checked={item.isCompleted}
                    id=""
                  />
                  {/* </div> */}
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      className="border border-purple-300 px-3 py-1 rounded bg-violet-950 rounded-1xl text-white  hover:bg-violet-700 mx-1 scale-90 "
                      onClick={(e) => {
                        handleedit(e, item.id);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className=" border border-purple-300 px-3 py-1 rounded bg-violet-950 mx-1 text-white hover:bg-violet-700 scale-90 "
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
