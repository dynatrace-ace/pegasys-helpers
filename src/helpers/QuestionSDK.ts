import { Question } from "../types/Question";

class QuestionSDK {
  constructor() {}

  createQuestion(id: string, question: string) {
    let obj = {
      id: id,
      description: question,
    } as Question;
    return obj;
  }
}
export default QuestionSDK;
