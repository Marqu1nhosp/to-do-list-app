/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react'

interface TaskProviderProps {
  children: ReactNode
}

interface TaskData {
  tasksContext: string[]
  setTasksContext: (value: string[]) => void
  taskCountContext: number
  setTaskCountContext: (value: number) => void
  completedTasksCountContext: number
  setCompletedTasksCountContext: (value: number) => void
}

export const TaskContext = createContext({} as TaskData)

export function TaskProvider({ children }: TaskProviderProps) {
  // Cria uma ref chamada initialStateSet, inicializada como false
  const initialStateSet = React.useRef(false)

  // Define três estados e suas funções de atualização usando o hook useState
  const [tasksContext, setTasksContext] = useState<string[]>([])
  const [taskCountContext, setTaskCountContext] = useState<number>(0)
  const [completedTasksCountContext, setCompletedTasksCountContext] =
    useState(0)

  useEffect(() => {
    // Se o estado inicial ainda não foi definido, carregar do localStorage
    if (!initialStateSet.current) {
      const storedStateAsJSON = localStorage.getItem('@todolist-tasks-1.0')

      if (storedStateAsJSON) {
        const parsedState = JSON.parse(storedStateAsJSON)
        setTasksContext(parsedState.tasksContext)
        setTaskCountContext(parsedState.taskCountContext)
        setCompletedTasksCountContext(parsedState.completedTasksCountContext)
      }

      // Configurar a bandeira como true para indicar que o estado inicial foi definido
      initialStateSet.current = true
    }
  }, [])

  useEffect(() => {
    // Salvar no localStorage sempre que o estado mudar
    const stateToSave = {
      tasksContext,
      taskCountContext,
      completedTasksCountContext,
    }

    const stateJSON = JSON.stringify(stateToSave)
    localStorage.setItem('@todolist-tasks-1.0', stateJSON)
  }, [tasksContext, taskCountContext, completedTasksCountContext])

  console.log('Completed contexto:', completedTasksCountContext)

  return (
    <TaskContext.Provider
      value={{
        tasksContext,
        setTasksContext,
        taskCountContext,
        setTaskCountContext,
        completedTasksCountContext,
        setCompletedTasksCountContext,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
