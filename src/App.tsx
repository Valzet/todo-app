import { FC, SetStateAction, useState } from 'react';
import ITask from './Interfaces'
import TaskList from './Components/TaskList'
import './App.css';

const App: FC = () => {
  const [task, setTask] = useState<string>('') // стейт задачи
  const [todo, setTodo] = useState<ITask[]>([]) // стейт массива задач


  // ввод названия задачи уходящий в стейт
  const handleChangeInputValue = (evt: { target: { name: string; value: SetStateAction<string>; }; }) => {
    if (evt.target.name === 'task') {
      setTask(evt.target.value)
    }
  }

  //сохранение задачи с присвоением нужных показателей (название, статус выполнения и id)
  const handleSaveTask = (): void => {
    setTodo([...todo, { taskName: task, isDone: false, id: Math.floor(Math.random() * 99999) }])
    setTask('')
  }

  // удаление задачи с сравнением по ид
  const removeTask = (id: number): void => {
    setTodo(todo.filter((task) => {
      return task.id !== id
    }))
  }

  // аналогично удалению - установка выполненной задачи
  const finishTask = (id: number): void => {
    setTodo(todo.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return {
        ...task,
        isDone: !task.isDone
      }
    }))
  }

  return (

    <main className='main'>
      <div className='content'>
        <header className='header'>
          <input className='text' type="text" name='task' placeholder='Put a task' onChange={handleChangeInputValue} value={task} required />
          <input className='button' type="submit" value="SAVE" onClick={handleSaveTask} />
        </header>
        <div className='todo__list'>
          {todo.map((task: ITask, key: number) => {
            return <TaskList key={key} task={task} removeTask={removeTask} finishTask={finishTask}
              todo={todo}
              setTodo={setTodo}
            />
          })}
        </div>
      </div>
    </main>



  );
}

export default App;
