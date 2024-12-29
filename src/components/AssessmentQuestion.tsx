import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AssessmentQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  currentAnswer: string;
  onAnswer: (answer: string) => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
}

export default function AssessmentQuestion({
  question,
  currentAnswer,
  onAnswer,
  onPrevious,
  isFirstQuestion
}: AssessmentQuestionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {question.question}
      </h3>
      <RadioGroup
        onValueChange={onAnswer}
        value={currentAnswer}
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </Button>
      </div>
    </div>
  );
}