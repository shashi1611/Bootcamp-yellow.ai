import logo from './logo.svg';
import './App.css';
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabMenu from './TabMenu';
import Taskform from './Taskform';
import Task from './Task';
import CheckBox from './checkBox';
import {useEffect,useState} from "react";
import Header from './Header';
import TaskActive from './TaskActive';
function App() {
  const [value, setValue] = React.useState(2);
  const[tasks,setTasks]=useState([]);

  useEffect(()=>{
    if(tasks.length===0)return;
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);

  useEffect(()=>{
    const tasks=JSON.parse(localStorage.getItem('tasks'));
    const storedTasks = tasks || []; // Use an empty array if tasksFromLocalStorage is null
    setTasks(storedTasks);
    // torage.setItem('tasks',JSON.stringify(tasks));
    // setTasks(tasks);
  },[]);


  // <<<<<<<<<<<<<<<< Add new task >>>>>>>>>>>>>>>>>
  function addTask(name) {
    setTasks(prev=>{
      return[...prev,{name:name,done:false}]
    });
    
  }

  // <<<<<<<<<<update task status>>>>>>>>>>>>>>>
  function updateTaskDone(taskIndex,newDone) {
    setTasks(prev=>{
      const newTasks=[...prev];
      newTasks[taskIndex].done=newDone
      return newTasks;
    })    
  }

  // <<<<<<<<<<<<<<<<<<<< delete completed task  >>>>>>>>>>>>>>>>>
  function removeTask(indexToRemove){
    setTasks(prev=>{
      return prev.filter((taskObject,number)=>number!=indexToRemove);
    });

  }

  // <<<<<<<<<<<<<<<<<<<< handeling the tab >>>>>>>>>>>>>>>>>>>>>>>
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  // <<<<<<<<< delete all the completed task at once >>>>>>>>>>>>>>>
  function clearCompletedTasks() {
    setTasks(prev => {
      const newTasks = prev.filter(task => !task.done);
      localStorage.setItem('tasks', JSON.stringify(newTasks)); // Update local storage
      return newTasks;
    });
  }
  return(
    <main>
    <Header/>
    <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
    <div className="content">
        {activeTab === 'all' && 
        <div>
           <Taskform onAdd={addTask}/>
            {tasks.map((task,number)=>(
              <TaskActive{...task}
              // onTrash={()=> removeTask(number)}
              onToggle={done=> updateTaskDone(number,done)}/>
            ))}
        </div>}
        {activeTab === 'active' && 
        <div>
          <Taskform onAdd={addTask}/>
        {tasks
          .filter(task => !task.done) // Filter tasks whose done value is false
          .map((task, number) => (
            <TaskActive
              key={number}
              {...task}
              onTrash={() => removeTask(number)}
              onToggle={() => updateTaskDone(number, !task.done)} // Pass opposite value of task.done
            />
          ))}
      </div>
        }
          {activeTab === 'completed' &&
            <div className="completed-wrapper">
              {/* <div style={{ position: 'relative' }}> */}
              {tasks
                .filter(task => task.done) // Filter tasks whose done value is true
                .map((task, number) => (
                  <Task
                    key={number}
                    {...task}
                    onTrash={() => removeTask(number)}
                    onToggle={() => updateTaskDone(number, !task.done)} // Pass opposite value of task.done
                  />
                ))}
                {/* </div> */}
                <div>
                {/* <button onClick={clearCompletedTasks}>Clear All</button> */}
                <button className="clearCompleted" onClick={clearCompletedTasks}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                  Clear All
                  </button>
                </div>
            </div>
          }

      </div>
    </main>
  );
}
export default App;
