export const getSummary = async (): Promise<SummaryResponse> => {
  const response = await fetch('http://localhost:3333/summary')
  const data = response.json()

  return data
}

type SummaryResponse = {
  summary: {
    completed: number
    total: number
    goalsPerDay: Record<
      string,
      {
        id: string
        title: string
        completedAt: string
      }[]
    >
  }
}
