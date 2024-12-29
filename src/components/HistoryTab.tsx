import { useAuth } from '../contexts/AuthContext';
import JSONPretty from 'react-json-pretty';
import { db } from '../lib/firebase';
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PersonalDetailsType } from "./PersonalDetails";

interface HistoryEntry {
  personalDetails: PersonalDetailsType;
  answers: Record<number, string>;
  recommendations: string;
  timestamp: string;
}

import { Navigate } from 'react-router-dom';

export default function HistoryTab() {
const { currentUser, logout } = useAuth();
if (!currentUser) {
  return <Navigate to="/auth" />;
}
const [history, setHistory] = useState<HistoryEntry[]>([]);

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
      <button onClick={() => logout()}>Logout</button>
    <h2 className="text-2xl font-bold">History</h2>
   
    {history.map((entry, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{entry.personalDetails.name} - {new Date(entry.timestamp).toLocaleString()}</span>
          </CardTitle>
        </CardHeader>
<CardContent>
  <div className="prose max-w-none">
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
      <div className="space-y-2">
        <p className="text-lg font-bold text-blue-500">Name:</p>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.personalDetails.name}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold text-blue-500">Date of Birth:</p>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{new Date(entry.personalDetails.dob).toLocaleDateString()}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold text-blue-500">Birth Place:</p>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.personalDetails.birthPlace}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold text-blue-500">Current Location:</p>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.personalDetails.currentLocation}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-bold text-blue-500">Phone:</p>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.personalDetails.phone}</p>
      </div>
      <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
      {(() => {
        try {
          const recommendations = JSON.parse(entry.recommendations);
          return (
            <div>
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
            </div>
          );
        } catch (error) {
          return <p>Error parsing recommendations: {error.message}</p>;
        }
      })()}
    </div>
  </div>
</CardContent>
      </Card>
    ))}
    
  </div>
);
}
