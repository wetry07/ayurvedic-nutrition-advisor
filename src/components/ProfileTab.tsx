import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalDetailsType } from "./PersonalDetails";

interface HistoryEntry {
  personalDetails: PersonalDetailsType;
  answers: Record<number, string>;
  recommendations: string;
  timestamp: string;
}

export default function ProfileTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) return;

    const historyRef = ref(db, `results/${currentUser.uid}`);
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.values(data) as HistoryEntry[];
        setHistory(historyArray.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Assessment History</h2>
      {history.map((entry, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Assessment from {new Date(entry.timestamp).toLocaleDateString()}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {entry.personalDetails?.name}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                <p>Date of Birth: {new Date(entry.personalDetails?.dob).toLocaleDateString()}</p>
                <p>Email: {entry.personalDetails?.email}</p>
                <p>Phone: {entry.personalDetails?.phone}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <p className="whitespace-pre-wrap">{entry.recommendations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}