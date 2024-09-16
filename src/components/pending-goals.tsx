import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'
import { toast } from 'sonner'

export const PendingGoals = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (!data) {
    return null
  }

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    const goal = data?.pendingGoals?.find(goal => goal.id === goalId)
    const count = Number(goal?.completionCount) + 1
    if (goal?.desiredWeeklyFrequency === count) {
      toast.success('Meta semanal finalizada com sucesso.')
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.pendingGoals?.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
