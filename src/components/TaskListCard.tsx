/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskContext } from '@/contexts/TaskContext'
import { Trash, Check } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'

// Componente que exibe a lista de tarefas
export function TaskListCard() {
  // Acesso ao contexto que fornece informações sobre as tarefas e o contador de tarefas
  const {
    tasksContext,
    setTasksContext,
    setTaskCountContext,
    taskCountContext,
    setCompletedTasksCountContext,
  } = useContext(TaskContext)

  // Estado local para controlar os checkboxes de tarefas
  const [checkedTasks, setCheckedTasks] = useState(
    new Array(tasksContext.length).fill(false),
  )
  // Estado local para manter a contagem de tarefas concluídas
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  // Função para excluir uma tarefa com base no índice
  const deleteTask = (index: number) => {
    return () => {
      // Cria uma cópia das tarefas do contexto
      const updatedTasks = [...tasksContext]

      // Verifica se a tarefa que está sendo excluída estava concluída
      const wasTaskCompleted = checkedTasks[index]

      // Remove a tarefa com base no índice
      updatedTasks.splice(index, 1)

      // Atualiza o contexto com as tarefas atualizadas
      setTasksContext(updatedTasks)

      // Atualiza o estado local dos checkboxes para refletir as tarefas restantes
      const newCheckedTasks = [...checkedTasks]
      newCheckedTasks.splice(index, 1)
      setCheckedTasks(newCheckedTasks)

      // Decrementa o contador de tarefas no contexto
      setTaskCountContext(taskCountContext - 1)

      // Se a tarefa excluída estava concluída, decrementa a contagem de tarefas concluídas
      if (wasTaskCompleted) {
        setCompletedTasksCountContext(completedTasksCount - 1)
      }
    }
  }

  // Função para alternar o estado do checkbox de uma tarefa com base no índice
  const toggleCheckbox = (index: number) => {
    const newCheckedTasks = [...checkedTasks]
    // Inverte o estado do checkbox
    newCheckedTasks[index] = !newCheckedTasks[index]
    // Atualiza o estado local dos checkboxes
    setCheckedTasks(newCheckedTasks)
  }
  useEffect(() => {
    // Calcula a contagem de tarefas concluídas
    const completedCount = checkedTasks.filter((isChecked) => isChecked).length
    // Atualiza o estado local de contagem de tarefas concluídas
    setCompletedTasksCount(completedCount)
    // Atualiza o contexto com a contagem de tarefas concluídas
    setCompletedTasksCountContext(completedCount)
  }, [checkedTasks, setCompletedTasksCountContext])

  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-10">
      {tasksContext.map((task, index) => (
        <div
          key={index}
          className="p-6 bg-[#262626] border-[#262626] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[35rem]"
        >
          <div className="flex flex-row items-center bg-transparent">
            <div className="flex items-center gap-4 bg-transparent">
              <div className="bg-transparent">
                <div
                  className={`w-5 h-5 border-2 border-[#1100ff] rounded-full cursor-pointer relative transition-all ${
                    checkedTasks[index]
                      ? 'bg-[#1100ff] border-[#1100ff] '
                      : 'bg-transparent'
                  }`}
                  onClick={() => toggleCheckbox(index)}
                >
                  {checkedTasks[index] && (
                    <Check className="w-3 h-3 bg-[#1100ff] text-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>

              <div className="bg-transparent">
                <p
                  className={
                    checkedTasks[index]
                      ? 'line-through bg-transparent whitespace-nowrap text-[#808080]'
                      : 'bg-transparent whitespace-nowrap text-[#FBE4D8]'
                  }
                >
                  {task}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-transparent ml-[31rem] mt-[-24px]">
            <button className="text-[#808080]" onClick={deleteTask(index)}>
              <Trash size={20} className="bg-transparent hover:text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
