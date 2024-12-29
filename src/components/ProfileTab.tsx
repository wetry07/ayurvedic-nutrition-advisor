import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoryEntry {
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
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              Assessment from {new Date(entry.timestamp).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <h3 className="text-lg font-semibold">Recommendations</h3>
              <p className="whitespace-pre-wrap">{entry.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}