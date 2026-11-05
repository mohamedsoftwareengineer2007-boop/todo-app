import { useState, useEffect } from "react";
import { ListTodo } from "lucide-react";



function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])


  const addTodo = () => {
    if(input.trim()) {
      setTodos([...todos, {id: Date.now(), text:input, completed:false }])
      setInput("")
    }
  }

  return (
    <div className="min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-r
                    from-blue-600
                    to-emerald-400
                    p-4">

      <div className="bg-white
                        shadow-lg
                        rounded-3xl
                        w-full
                        max-w-md
                        p-6
                        sm:p-10 ">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">TODO LIST<ListTodo size={28}/></h1>

        <div className="mb-4 flex">

          <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          type="text" 
          placeholder="Add a new todo" 
          className="flex-grow px-3 py-2 border rounded-l-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 "/>

          <button 
          onClick={addTodo}
          className=" bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Add</button>
          
        </div>
        <ul className="space-y-2">
          {todos.map((item) => (
            <li
            key={item.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input 
              type="checkbox" 
              checked={item.completed}
              onChange={() => setTodos(
                todos.map((t) => (
                  t.id === item.id ? {...t,
                   completed: !t.completed} : t
                ))
              )}
              className="mr-2 h-5 w-5 text-blue-600 "
              />

              <span className={`flex-grow ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {item.text}
              </span>

              <button 
              onClick={() => setTodos(todos.filter((t) => t.id !== item.id ))}
              className=" ml-2
                          border-none
                          p-2
                          rounded-lg
                        bg-red-500
                        text-white
                          hover:bg-red-600">Delete</button>

            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default App;
