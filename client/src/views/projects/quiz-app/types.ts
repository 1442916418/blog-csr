/** 习题参数 */
export interface exercisesParams {
  id: string
  title: string
  describe?: string
  answerOptions: exercisesAnswerOptions[]
  answer: string
}

export interface exercisesAnswerOptions {
  label: string
  value: string
}

/** 习题答案选择参数 */
export interface selectedAnswerParams {
  exercises: exercisesParams
  selectAnswer: string
  isSuccess: boolean
}
