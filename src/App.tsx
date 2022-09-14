import { FC, SetStateAction, useState } from 'react';
import { ITask } from './Interfaces'

import TaskList from './Components/TaskList'

import './App.css';

const App: FC = () => {

  const [task, setTask] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [todo, setTodo] = useState<ITask[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)

  const handleChangeInputValue = (evt: { target: { name: string; value: SetStateAction<string>; }; }) => {
    if (evt.target.name === 'task') {
      setTask(evt.target.value)
    } else {
      setDescription(evt.target.value)
    }
  }

  const handleSaveTask = (): void => {
    const newTask = { taskName: task, taskDescription: description, isDone: isDone }
    setTodo([...todo, newTask])
    setDescription('')
    setTask('')
  }

  const removeTask = (taskNameRemove: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameRemove
    }))
  }


  const finishTask = () => {
    setIsDone(true)
  }

  return (

    <main className='main'>
      <header>
        <input type="text" name='task' placeholder='Put a task' required onChange={handleChangeInputValue} value={task} />
        <input type="text" name='description' placeholder='Put a description (no required)' onChange={handleChangeInputValue} value={description} />
        <input type="submit" value="save" onClick={handleSaveTask} />
      </header>

      <div className='todo__list'>
        {todo.map((task: ITask, key: number) => {
          return <TaskList key={key} task={task} removeTask={removeTask} />
        })}
      </div>

    </main>



  );
}

export default App;
