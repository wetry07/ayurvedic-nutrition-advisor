import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonalDetailsType } from "./PersonalDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  personalDetails: PersonalDetailsType;
  answers: Record<number, string>;
  recommendations: string;
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
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px] font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{personalDetails.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Birth</TableCell>
                  <TableCell>{new Date(personalDetails.dob).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{personalDetails.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>{personalDetails.phone}</TableCell>
                </TableRow>
                {Object.entries(answers).map(([questionId, answer]) => (
                  <TableRow key={questionId}>
                    <TableCell className="font-medium">Question {questionId}</TableCell>
                    <TableCell>{answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-primary">Recommendations</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendations}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}