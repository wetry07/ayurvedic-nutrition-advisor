import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface PersonalDetailsProps {
  onComplete: (details: PersonalDetailsType) => void;
}

export interface PersonalDetailsType {
  name: string;
  dob: string;
  email: string;
  phone: string;
}

export default function PersonalDetails({ onComplete }: PersonalDetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const details = {
      name: formData.get('name') as string,
      dob: formData.get('dob') as string,
      email: formData.get('email') as string,
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="Enter your email" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Continue to Assessment
      </Button>
    </form>
  );
}