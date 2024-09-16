export const getPendingGoals = async (): Promise<PendingGoalsResponse> => {
  const response = await fetch('http://localhost:3333/pending-goals')
  const data = response.json()

  return data
}

type PendingGoalsResponse = {
  pendingGoals: {
    id: string
    title: string
    desiredWeeklyFrequency: number
    completionCount: number
  }[]
}
