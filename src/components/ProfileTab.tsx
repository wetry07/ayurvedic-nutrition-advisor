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

export default function ProfileTab() {
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
    <h2 className="text-2xl font-bold">AI Response</h2>
    {history.map((entry, index) => (
      <div key={index}>
        <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
        <p>Dosha: {JSON.parse(entry.recommendations).Dosha}</p>
        <p>Body Type: {JSON.parse(entry.recommendations).BodyType}</p>
        <p>Skin Type: {JSON.parse(entry.recommendations).SkinType}</p>
        <p>Climate: {JSON.parse(entry.recommendations).Climate}</p>
        <p>Digestion: {JSON.parse(entry.recommendations).Digestion}</p>
        <p>Energy Levels: {JSON.parse(entry.recommendations).EnergyLevels}</p>
        <p>Mood: {JSON.parse(entry.recommendations).Mood}</p>
        <p>Sleep: {JSON.parse(entry.recommendations).Sleep}</p>
        <p>Hunger: {JSON.parse(entry.recommendations).Hunger}</p>
        <p>Sweat: {JSON.parse(entry.recommendations).Sweat}</p>
        <p>Fatigue: {JSON.parse(entry.recommendations).Fatigue}</p>
        <p>Crowds/Noise: {JSON.parse(entry.recommendations).Crowds_Noise}</p>
        <p>Season: {JSON.parse(entry.recommendations).Season}</p>
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <h4 className="text-lg font-semibold mb-2">Diet</h4>
        <ul>
          {JSON.parse(entry.recommendations).Recommendations.Diet.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mb-2">Lifestyle</h4>
        <ul>
          {JSON.parse(entry.recommendations).Recommendations.Lifestyle.map((lifestyle, index) => (
            <li key={index}>{lifestyle}</li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mb-2">Herbs</h4>
        <ul>
          {JSON.parse(entry.recommendations).Recommendations.Herbs.map((herb, index) => (
            <li key={index}>{herb}</li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mb-2">Other Recommendations</h4>
        <ul>
          {JSON.parse(entry.recommendations).Recommendations.OtherRecommendations.map((other, index) => (
            <li key={index}>{other}</li>
          ))}
        </ul>
      </div>
    ))}
    <button onClick={() => logout()}>Logout</button>
  </div>
);
}
