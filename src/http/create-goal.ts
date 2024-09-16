export const createGoal = async ({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) => {
  const response = await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
  // const data = response.json()

  // return data

  if (!response.ok) {
    throw new Error('Error while creating the goal')
  }
}

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}
