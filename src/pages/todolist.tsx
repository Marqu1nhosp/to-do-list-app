'use client'
import React, { useContext, useEffect, useState } from 'react'
import '../styles/todolist.css'
import { PlusCircle } from '@phosphor-icons/react'
import { TaskListCard } from '@/components/TaskListCard'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskContext } from '@/contexts/TaskContext'
import { NoCreateTask } from '@/components/NoCreateTask'

// Schema de validação para a criação de tarefas
const createTaskSchema = z.object({
  task: z.string().nonempty('Digitar uma tarefa é obrigatório'),
})

type CreateTaskData = z.infer<typeof createTaskSchema>

// Componente principal
export default function ToDoList() {
  // Estado local para controlar a exibição do componente NoCreateTask
  const [showNoCreateTask, setShowNoCreateTask] = useState(false)

  // Acesso ao contexto que fornece as informações sobre tarefas
  const {
    tasksContext,
    setTasksContext,
    setTaskCountContext,
    taskCountContext,
    completedTasksCountContext,
  } = useContext(TaskContext)

  // Estado local para armazenar o número de tarefas no componente
  const [taskCount, setTaskCount] = useState(0)
  // Estado local para manter a contagem de tarefas concluídas
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  // Estado local para armazenar as tarefas no componente
  const [tasks, setTasks] = useState<string[]>([])

  // Configuração do formulário de criação de tarefas
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSchema),
  })

  // Função para criar uma nova tarefa
  function createTask(data: CreateTaskData) {
    const { task } = data

    // Atualiza o array de tarefas local e no contexto
    setTasks([...tasks, task])
    setTasksContext([...tasks, task])

    // Incrementa o contador local de tarefas e atualiza o contexto
    setTaskCount(taskCount + 1)
    setTaskCountContext(taskCount + 1)
  }
  // console.log('Contexto todolist:', taskCountContext)

  // Efeito para atualizar taskCount com base em taskCountContext
  useEffect(() => {
    setTaskCount(taskCountContext)
  }, [taskCountContext])

  // Efeito para atualizar completedTasksCount com base em completedTasksCountContext
  useEffect(() => {
    setCompletedTasksCount(completedTasksCountContext)
  }, [completedTasksCountContext])

  // Efeito para exibir ou ocultar o componente NoCreateTask com base no estado das tarefas
  useEffect(() => {
    if (tasksContext.length === 0) {
      setShowNoCreateTask(false)
    } else {
      setShowNoCreateTask(true)
    }
  }, [tasksContext])

  return (
    <div className="">
      <div className="w-full h-32 bg-[#190019] flex flex-col gap-5 items-center justify-center ">
        <div className="mt-4">
          <h1 className="bg-[#190019] text-[#FBE4D8] text-2xl font-bold">
            Lista de Tarefa
          </h1>
        </div>
      </div>
      <form
        className="flex flex-row gap-1 items-center justify-center top-6-"
        action=""
        onSubmit={handleSubmit(createTask)}
      >
        <div className="relative flex flex-col bottom-5 bg-transparent">
          <input
            className="p-3 placeholder-[#FBE4D8] text-white bg-[#333333] shadow rounded w-96 h-10"
            type="text"
            placeholder="Adicione uma nova tarefa"
            {...register('task')}
          />
          <div className="fixed mt-11 bg-transparent">
            {errors.task && (
              <span className="text-red-700 mt-7">{errors.task.message}</span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col bottom-5 bg-transparent">
          <button
            type="submit"
            className="flex items-center w-24 text-[#FBE4D8] bg-[#005eff] hover:bg-[#1100ff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus-ring-primary-800"
          >
            Criar{' '}
            <div className="bg-transparent">
              <PlusCircle size={20} className="bg-transparent ml-2" />
            </div>
          </button>
        </div>
      </form>

      <div className="">
        <div className="flex flex-row items-center justify-center gap-60 mt-5">
          <div>
            {' '}
            <h1 className="text-[#005eff] font-bold">
              Tarefas criadas{' '}
              <span className="rounded-full bg-[#333333] px-2 text-center text-[#FBE4D8]">
                {taskCount}
              </span>
            </h1>
          </div>
          <div>
            {' '}
            <h1 className="text-[#1100ff] font-bold">
              Conclúidas{' '}
              <span className="rounded-full bg-[#333333] px-2 text-center text-[#FBE4D8]">
                {completedTasksCount} de {taskCount}
              </span>
            </h1>
          </div>
        </div>
        {showNoCreateTask ? <TaskListCard /> : <NoCreateTask />}
      </div>
    </div>
  )
}
