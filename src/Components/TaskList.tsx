import React from 'react';
import { ITask } from '../Interfaces';


interface Props {
    task: ITask;
    removeTask(taskNameRemove: string): void;
}

const TaskList = ({ task, removeTask }: Props) => {
    return (
        <article className='task'>
            <h2>{task.taskName}</h2>
            <p>{task.taskDescription}</p>

            <button onClick={() => {
                removeTask(task.taskName)
            }}>X</button>
        </article>
    )

}


export default TaskList