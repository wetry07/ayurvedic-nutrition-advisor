import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AssessmentQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  currentAnswer: string;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isLoading: boolean;
}

export default function AssessmentQuestion({
  question,
  currentAnswer,
  onAnswer,
  onPrevious,
  onSubmit,
  isFirstQuestion,
  isLastQuestion,
  isLoading
}: AssessmentQuestionProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">
        {question.question}
      </h3>
      <RadioGroup
        onValueChange={onAnswer}
        value={currentAnswer}
        className="space-y-4"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label className="cursor-pointer" htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </Button>
        {isLastQuestion && (
          <Button 
            onClick={onSubmit}
            disabled={isLoading || !currentAnswer}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Submit Assessment'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}