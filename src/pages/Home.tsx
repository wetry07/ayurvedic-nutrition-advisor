import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";

const questions = [
  {
    id: 1,
    question: "How would you describe your physical build?",
    options: [
      "Thin and light",
      "Medium and muscular",
      "Broad and sturdy"
    ]
  },
  // ... Add all 12 questions here
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  const submitAnswers = async () => {
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer AIzaSyApY33HNc2TrZqZm5s4Piv4UEi09QzjEzo`,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Based on these answers, provide Ayurvedic recommendations: ${JSON.stringify(answers)}`
            }]
          }]
        })
      });

      const data = await response.json();
      
      // Store results in Firebase
      await push(ref(db, `results/${currentUser?.uid}`), {
        answers,
        recommendations: data.candidates[0].content.parts[0].text,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Analysis Complete",
        description: "Your Ayurvedic profile has been analyzed successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze results. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Ayurvedic Health Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion < questions.length ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">
                {questions[currentQuestion].question}
              </h3>
              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion]}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-medium">Thank you for completing the assessment!</h3>
              <p className="text-muted-foreground mt-2">
                Your results are being analyzed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}