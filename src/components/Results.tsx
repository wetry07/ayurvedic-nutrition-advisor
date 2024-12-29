import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PersonalDetailsType } from "./PersonalDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsProps {
  personalDetails: PersonalDetailsType;
  answers: Record<number, string>;
  recommendations: string;
}

export default function Results({ personalDetails, answers, recommendations }: ResultsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead>Details</TableHead>
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
                {Object.entries(answers).map(([questionId, answer]) => (
                  <TableRow key={questionId}>
                    <TableCell className="font-medium">Question {questionId}</TableCell>
                    <TableCell>{answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Recommendations</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{recommendations}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}