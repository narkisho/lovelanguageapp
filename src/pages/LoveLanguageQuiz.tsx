import { MainLayout } from "@/components/layout/MainLayout";
import { questions } from "@/data/loveLanguageQuestions";
import { QuizLogic } from "@/components/love-language/QuizLogic";

const LoveLanguageQuiz = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Love Language Quiz</h1>
          <p className="text-spark-text-light text-lg max-w-2xl mx-auto">
            Discover your primary love language by answering 10 simple questions.
          </p>
        </div>

        <QuizLogic questions={questions} />
      </div>
    </MainLayout>
  );
};

export default LoveLanguageQuiz;