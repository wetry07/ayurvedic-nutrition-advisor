import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/ProfileTab";
import AssessmentQuestion from "@/components/AssessmentQuestion";
import PersonalDetails, { PersonalDetailsType } from "@/components/PersonalDetails";
import Results from "@/components/Results";

const questions = [
  {
    id: 1,
    question: "How would you describe your physical build?",
    options: ["Thin and light", "Medium and muscular", "Broad and sturdy"]
  },
  {
    id: 2,
    question: "How is your skin?",
    options: ["Dry and rough", "Normal to slightly oily", "Oily and prone to breakouts"]
  },
  {
    id: 3,
    question: "How do you typically feel in different weather conditions?",
    options: [
      "Cold, dry, or windy weather makes me feel unbalanced",
      "I do well in warm weather, but I can get irritable in the heat",
      "I feel best in cool, moist weather"
    ]
  },
  {
    id: 4,
    question: "How is your digestion?",
    options: [
      "My digestion is irregular, and I sometimes feel bloated or gassy",
      "I usually have good digestion, but I might feel warm or acidic after eating",
      "I have slow digestion, and I often feel heavy after eating"
    ]
  },
  {
    id: 5,
    question: "What is your typical energy level throughout the day?",
    options: [
      "I feel energized but often become fatigued quickly",
      "I have moderate and steady energy levels",
      "I feel lethargic or sluggish at times"
    ]
  },
  {
    id: 6,
    question: "How do you react to stress or emotional situations?",
    options: [
      "I tend to become anxious or nervous",
      "I may feel irritable or angry",
      "I become withdrawn and feel emotionally heavy"
    ]
  },
  {
    id: 7,
    question: "How do you sleep?",
    options: [
      "I have trouble sleeping or often wake up during the night",
      "I sleep soundly but tend to get overheated at night",
      "I sleep deeply and feel well-rested"
    ]
  },
  {
    id: 8,
    question: "How would you describe your appetite?",
    options: [
      "I have irregular or fluctuating hunger",
      "I have a strong appetite, but I crave spicy or sour foods",
      "I tend to eat slowly and may skip meals due to lack of appetite"
    ]
  },
  {
    id: 9,
    question: "How would you describe your body temperature?",
    options: [
      "I often feel cold or chilly",
      "I tend to feel warm, especially in the evenings",
      "I generally feel comfortable but may sweat easily"
    ]
  },
  {
    id: 10,
    question: "How do you feel after eating?",
    options: [
      "I feel bloated or gassy, sometimes even fatigued",
      "I feel satisfied but might feel overly full if I eat too much",
      "I feel heavy or sluggish after meals"
    ]
  },
  {
    id: 11,
    question: "How do you react to physical exertion or exercise?",
    options: [
      "I get tired quickly and need time to recover",
      "I do well with moderate exercise and enjoy physical activities",
      "I can do intense physical activities but may feel worn out afterward"
    ]
  },
  {
    id: 12,
    question: "How do you feel in different environments or surroundings?",
    options: [
      "I feel agitated or restless in crowded or noisy environments",
      "I enjoy being in a balanced environment but may get overheated or stressed",
      "I feel grounded and comfortable in calm, peaceful surroundings"
    ]
  },
  {
    id: 13,
    question: "What season are you currently experiencing?",
    options: [
      "Sharad Ritu (Autumn)",
      "Hemant Ritu (Winter)",
      "Shishir Ritu (Late Winter)",
      "Vasant Ritu (Spring)",
      "Grishma Ritu (Summer)",
      "Varsha Ritu (Monsoon)"
    ]
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 for personal details
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType | null>(null);
  const [recommendations, setRecommendations] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handlePersonalDetailsComplete = (details: PersonalDetailsType) => {
    setPersonalDetails(details);
    setCurrentQuestion(0);
  };

  const handleAnswer = async (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentQuestion === 0) {
      setCurrentQuestion(-1); // Go back to personal details
    }
  };

  const submitAnswers = async () => {
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyApY33HNc2TrZqZm5s4Piv4UEi09QzjEzo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Based on these answers, provide Ayurvedic recommendations: ${JSON.stringify(answers)}`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get recommendations');
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      const recommendationsText = data.candidates[0].content.parts[0].text;
      setRecommendations(recommendationsText);

      await push(ref(db, `results/${currentUser?.uid}`), {
        personalDetails,
        answers,
        recommendations: recommendationsText,
        timestamp: new Date().toISOString()
      });

      setIsSubmitted(true);
      toast({
        title: "Analysis Complete",
        description: "Your Ayurvedic profile has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze results. Please try again.",
      });
    }
  };

  const renderAssessmentContent = () => {
    if (isSubmitted) {
      return (
        <Results 
          personalDetails={personalDetails!}
          answers={answers}
          recommendations={recommendations}
        />
      );
    }

    if (currentQuestion === -1) {
      return <PersonalDetails onComplete={handlePersonalDetailsComplete} />;
    }

    return (
      <AssessmentQuestion
        question={questions[currentQuestion]}
        currentAnswer={answers[currentQuestion] || ''}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        isFirstQuestion={currentQuestion === 0}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Tabs defaultValue="assessment" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment">
          {renderAssessmentContent()}
        </TabsContent>
        
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}