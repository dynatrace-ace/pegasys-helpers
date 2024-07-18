class QuestionSDK {
  constructor() {}

  createQuestion(id: string, question: string) {
    let obj = {
      id: id,
      question: question,
    };
    return obj;
  }
}
export default QuestionSDK;
