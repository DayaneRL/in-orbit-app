import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBR)

export const Summary = () => {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds cache
  })

  if (!data?.summary) {
    return 'nada'
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedAVG = Math.round(
    (data?.summary?.completed * 100) / data?.summary?.total
  )

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedAVG}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.summary?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.summary?.total}</span> metas
            nessa semana.
          </span>
          <span>{completedAVG}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {data.summary?.goalsPerDay ? (
          Object.entries(data.summary?.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('D [ de ] MMMM')
            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}h</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })
        ) : (
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Você ainda não completou nenhuma tarefa essa semana.</span>
          </div>
        )}
      </div>
    </div>
  )
}