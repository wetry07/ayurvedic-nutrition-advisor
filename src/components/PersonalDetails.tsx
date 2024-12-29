import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

interface PersonalDetailsProps {
  onComplete: (details: PersonalDetailsType) => void;
}

export interface PersonalDetailsType {
  name: string;
  dob: string;
  birthPlace: string;
  currentLocation: string;
  phone: string;
}

export default function PersonalDetails({ onComplete }: PersonalDetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
const details = {
  name: formData.get('name') as string,
  dob: formData.get('dob') as string,
  birthPlace: formData.get('birthPlace') as string,
  currentLocation: formData.get('currentLocation') as string,
  phone: formData.get('phone') as string,
};
    onComplete(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required placeholder="Enter your full name" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" name="dob" type="date" required />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="birthPlace">Place of Birth</Label>
          <Input id="birthPlace" name="birthPlace" required placeholder="Enter your place of birth" />
<div className="grid gap-2">
  <Label htmlFor="currentLocation">Current Location</Label>
  <Input id="currentLocation" name="currentLocation" required placeholder="Enter your current location" />
</div>

</div>
</div>
<Button type="submit" className="w-full">
  Continue to Assessment
</Button>
</form>
  );
}
