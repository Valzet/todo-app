import React, { SetStateAction, useState } from 'react';
import ITask from '../Interfaces';

interface Props {
    task: ITask;
    removeTask: (id: number) => void;
    finishTask: (id: number) => void;
    // editCard: (id: number) => void;
    todo: ITask[];
    setTodo: React.Dispatch<SetStateAction<ITask[]>>;

}

const TaskList = ({ task, removeTask, finishTask, todo, setTodo }: Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [taskEdit, setTaskEdit] = useState<string>(task.taskName)


    const editCard = (id: number): void => {
        setTodo(todo.map((task) => {
          if (task.id !== id) {
            return task;
          }

          else if (taskEdit.length !== 0) {

        
          setTaskEdit('')
          return {
            ...task,
            taskName: taskEdit
          }} 
          else return task;
        }))
      }
   

    return (
        <article className={task.isDone ? 'task_done' : 'task'}>
            {
                isEdit ? (<input className='editInput' value={taskEdit} onChange={(e) => setTaskEdit(e.target.value)} />) : (<h2 className='text'>{task.taskName}</h2>)
            }

            <div className='task__buttons'>
                <button className='button' onClick={() => {
                    removeTask(task.id)
                }}>REMOVE</button>

                <button className='button' onClick={() => {
                    finishTask(task.id)
                }}>DONE</button>

                {!isEdit ? (<button className='button' onClick={() => {
                    if (!isEdit) {
                        setIsEdit(!isEdit)
                    }
                }}>EDIT</button>)
                    :
                    (<button className='button' onClick={() => {
                        if (isEdit) {
                            editCard(task.id)
                            setIsEdit(false)
                        }
                    }}>SAVE</button>)}

            </div>
        </article>
    )

}


export default TaskList