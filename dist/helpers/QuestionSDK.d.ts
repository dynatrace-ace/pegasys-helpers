declare class QuestionSDK {
    constructor();
    createQuestion(id: string, question: string): {
        id: string;
        question: string;
    };
}
export default QuestionSDK;
