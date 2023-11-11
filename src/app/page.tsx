import '../styles/global.css'

import { TaskProvider } from '@/contexts/TaskContext'
import ToDoList from '@/pages/todolist'

export default function Home() {
  return (
    <TaskProvider>
      <ToDoList />
    </TaskProvider>
  )
}
