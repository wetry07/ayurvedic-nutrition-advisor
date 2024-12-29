import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonalDetailsType } from "./PersonalDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  personalDetails: PersonalDetailsType;
  answers: Record<number, string>;
  recommendations: any;
  isLoading?: boolean;
}

export default function Results({ personalDetails, answers, recommendations, isLoading }: ResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyzing Your Results...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

return (
  <div className="space-y-6 animate-in fade-in-50">
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b bg-muted/50">
        <CardTitle className="text-2xl font-bold text-primary">Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary">Personal Details</h3>
<div className="space-y-2">
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">Name: {personalDetails.name}</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">Date of Birth: {new Date(personalDetails.dob).toLocaleDateString()}</p>
</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
<CardContent className="p-6">
  <h3 className="text-xl font-semibold text-primary">Your Profile</h3>
  <div className="p-4 bg-muted/50 rounded-lg">
<div className="flex flex-col space-y-2">
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Dosha:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Dosha}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Body Type:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.BodyType}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Skin Type:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.SkinType}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Climate:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Climate}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Digestion:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Digestion}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Energy Levels:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.EnergyLevels}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Mood:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Mood}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Sleep:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Sleep}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Hunger:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Hunger}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Sweat:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Sweat}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Fatigue:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Fatigue}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Crowds/Noise:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Crowds_Noise}</p>
</div>
<div className="space-y-2">
  <p className="text-lg font-bold text-blue-500">Season:</p>
  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations.Season}</p>
</div>
</div>
  </div>
<h3 className="text-xl font-semibold text-primary">Recommendations</h3>
  <div className="p-4 bg-muted/50 rounded-lg">
    {Object.keys(recommendations.Recommendations).map((key, index) => (
      <div key={index}>
        <p className="text-lg font-bold text-blue-500">{key}:</p>
        <ul>
          {recommendations.Recommendations[key].map((item, subindex) => (
            <li key={subindex}>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);
}
