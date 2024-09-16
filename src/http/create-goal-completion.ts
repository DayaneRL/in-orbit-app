export const createGoalCompletion = async (goalId: string) => {
  const response = await fetch('http://localhost:3333/goal-completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
  // const data = response.json()

  // return data

  if (!response.ok) {
    throw new Error('Error while creating the goal completion')
  }
}
