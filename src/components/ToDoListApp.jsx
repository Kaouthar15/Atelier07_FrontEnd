import React, { useState } from 'react'
import {AiOutlineCheck} from 'react-icons/ai';
import {AiOutlineClose} from 'react-icons/ai';
import {MdDeleteOutline} from 'react-icons/md';
import {LuBarChart3} from 'react-icons/lu';
import {MdPublishedWithChanges} from 'react-icons/md';
import Swal from 'sweetalert2';
// npm i sweetalert2  
import "../App.css"
export default function ToDoListApp2() {
    const iconStyle = {fontSize:'25Px',color:'white'};
    const iconStyle1 = {fontSize:'25Px',color:'white',cursor:'pointer'};
    const iconStyle2 = {fontSize:'50px'};
    const [tasks,setTasks]=useState([
        {description:"Python",completed:true},
        {description:"Javascript",completed:false},
        {description:"CSS",completed:true},
        {description:"PHP",completed:false},
        {description:"Laravel",completed:false},
        {description:"React",completed:true},
        {description:"Excel",completed:true}
    ]);
    const [task,setTask]=useState('');
    const addNote= () =>
    {
        if (task.trim()==='')
        {
            Swal.fire('Blank field!')
            return;
        }
        
        if (tasks.filter(t=>t.description.toLowerCase()===task.toLowerCase()).length > 0)
        {
            Swal.fire('Already exists!')
            return;
        }
        setTasks((t)=>[...t,{description:task,completed:false}]);
        setTask('');
        document.getElementById('task').focus();

    }
    const deleteTask = (e)=>
    {
        Swal.fire({title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              const newTasks = [...tasks];
              newTasks.splice(e,1);
              setTasks(newTasks); 
            }

          })
            
    }
    const updateTask = (e) =>
    {
        const updateTask = [...tasks];
        updateTask[e].completed = !updateTask[e].completed;
        setTasks(updateTask);
    }
    const delAll = () =>
    {
        Swal.fire({ title: 'Are you sure that\'s you want to delete all of them ?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete them!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your tasks has been deleted.',
                'success'
              ) 
              setTasks([]);
            } 
          })
      
    }
    const delFinished = () =>
    {
        const finishedTask=[...tasks];
        if (!finishedTask.filter(e=>e.completed))
        {
            Swal.fire('There are no completed tasks');  
        }
        else
        {
            Swal.fire({  title: 'Are you sure that\'s u want to delete the finished tasks?',  text: "You won't be able to revert this!",  icon: 'warning',  showCancelButton: true,  confirmButtonColor: '#3085d6',  cancelButtonColor: '#d33',  confirmButtonText: 'Yes, delete them!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your finished tasks has been deleted.',
                    'success'
                  )
        setTasks(finishedTask.filter(e=>!e.completed));            
                }

              })
        }
    }
    const delInProgress = () =>
    {
        const inProgressedTask=[...tasks];
        if (!inProgressedTask.filter(e=>!e.completed)) 
        {  
            Swal.fire('All the tasks are completed');
        }
        else
        {
            Swal.fire({
                title: 'Are you sure that\'s you want to delete the tasks in progress?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete them!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your undone tasks has been deleted.',
                    'success'
                  )
        setTasks(inProgressedTask.filter(e=>e.completed));            

                }

              })
        }
    }
    const finishAll = () =>
    {
      Swal.fire({ title: 'Are you sure?', text: "", showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Done'
              ) 
        setTasks(tasks.map(e=>({...e,completed:true})))

            } 
          })
    }
    const ongoingAll = () =>
    {
      Swal.fire({ title: 'Are you sure?', text: "", showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Done'
              ) 
              setTasks(tasks.map(e=>({...e,completed:false})))
            } 
          })
    }
  return (
    <div className='container'>
        <div className='treating'>
               <fieldset >
                <legend >Add</legend>
                <div className='add'>
                <input type="text" value={task} id='task' onChange={(e)=>setTask(e.target.value)} placeholder='Add a task...' required/>
                <button onClick={addNote}>Add</button>
                </div>
                </fieldset> 
                <fieldset >
                    <legend >Delete</legend>
                    <div className='add'>
                    <button onClick={delAll}>All</button>
                    <button onClick={delFinished}>Finished</button>
                    <button onClick={delInProgress}>In Progress</button> 
                    </div>
                </fieldset>
                <fieldset >
                    <legend >Update</legend>
                    <div className='add'>
                    <button onClick={finishAll}>Finish All</button>
                    <button onClick={ongoingAll}>Ongoing All</button>
                    </div>
                </fieldset>       
        </div>  
        <div className='posting'>
                <div className='statistic'>
                    <div className="icon">
                        <LuBarChart3 style={iconStyle2}/>
                    </div> 
                        <div className='status'>
                            <h3>  {tasks.length} : Tasks</h3>
                            <h3>  {tasks.filter(e=>e.completed).length} : Finished</h3>
                            <h3>  {tasks.filter(e=>!e.completed).length} : In Progress</h3>
                        </div> 
                </div>

                {tasks.map((t,index)=>
            
                <div key={index} className='description'>
                <h3>{t.completed ? <AiOutlineCheck style={iconStyle}/>:<AiOutlineClose style={iconStyle}/>}{ t.description}</h3> 
                <div className='buttons'>
                    <button onClick={()=>deleteTask(index)} ><MdDeleteOutline style={iconStyle1}/></button>
                    <button onClick={()=>updateTask(index)}><MdPublishedWithChanges style={iconStyle1}/></button>
                </div>
                </div>
                
                )}

        </div>
    </div>
  )
}
