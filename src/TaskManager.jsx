import { useState } from 'react';

export default function TaskManager() {
  // State for task list
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read book', completed: true }
  ]);

  // State for new task input field
  const [taskTitle, setTaskTitle] = useState('');

  // State for filter options ('all', 'pending', 'completed')
  const [filter, setFilter] = useState('all');

  // Function to add a new task
  const addTask = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false
    };

    setTasks([...tasks, newTask]);

    // Clear input field
    setTaskTitle('');
  };

  return (
    <div className="w-screen h-screen p-6 bg-white shadow-md flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Task Manager</h1>
      
      {/* Task Input Form */}
      <form onSubmit={addTask} className="mb-6 w-full max-w-lg">
        <div className="flex gap-2">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add task"
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'completed'].map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-3 py-1 rounded-md transition ${
              filter === filterOption ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="w-full max-w-lg space-y-2">
        {tasks
          .filter(task => 
            filter === 'all' ? true : 
            filter === 'completed' ? task.completed : 
            !task.completed
          )
          .map(task => (
            <li
              key={task.id}
              className={`flex justify-between p-3 rounded-md border ${
                task.completed ? 'bg-green-100 text-gray-600' : 'bg-gray-50'
              } transition hover:shadow-md w-full`}
            >
              <div className="flex items-center">
                {/* Checkbox to toggle task completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ))
                  }
                  className="h-5 w-5 accent-green-500"
                />
                {/* Task title with strikethrough if completed */}
                <span className={`ml-3 text-lg ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
