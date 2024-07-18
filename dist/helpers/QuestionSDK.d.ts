import { Question } from "../types/Question";
declare class QuestionSDK {
    constructor();
    createQuestion(id: string, question: string): Question;
}
export default QuestionSDK;
