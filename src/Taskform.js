
import {useState} from 'react'
export default function Taskform({onAdd}){

    const[taskName,setTaskName]=useState('');
    function handleSubmit(ev){
        ev.preventDefault();
        if(taskName=='')
        {
            alert("please enter something");
        }else{
            onAdd(taskName);
        }
       
        setTaskName('');
    }
    return (
    <form onSubmit={handleSubmit}>
        <div class="page_inputContainer__W4Zzc">
            <input type="text" 
            placeholder="add details" 
            class="page_input__MSOId" 
            name="todo" 
            onChange={ev=>setTaskName(ev.target.value)}
            value={taskName}/>
            <button class="page_addButton__Ty7ix" disabled="">Add</button>
        </div>
    </form>
    );
}