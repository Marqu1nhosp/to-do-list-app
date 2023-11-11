import { ClipboardText } from '@phosphor-icons/react'

export function NoCreateTask() {
  return (
    <div className="flex flex-col justify-center items-center mt-14 gap-20">
      <div>
        <ClipboardText size={32} className="text-[#808080]" />
      </div>
      <div>
        <p className="text-[#808080] font-bold text-base text-center font">
          Você ainda não tem tarefas cadastradas
        </p>
        <p className="text-[#808080] text-base text-center">
          {' '}
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
    </div>
  )
}
