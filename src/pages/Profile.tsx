import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Heart, AlertCircle, Save, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free', 
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low Carb',
  'Mediterranean',
  'Pescatarian',
  'Raw Food'
];

const commonAllergies = [
  'Nuts',
  'Peanuts', 
  'Shellfish',
  'Fish',
  'Eggs',
  'Dairy',
  'Soy',
  'Wheat',
  'Sesame',
  'Sulfites'
];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dietaryPreferences: user?.dietaryPreferences || [],
    allergies: user?.allergies || []
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDietaryChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: checked
        ? [...prev.dietaryPreferences, option]
        : prev.dietaryPreferences.filter(item => item !== option)
    }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      allergies: checked
        ? [...prev.allergies, allergy]
        : prev.allergies.filter(item => item !== allergy)
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    updateProfile({
      name: formData.name.trim(),
      email: formData.email.trim(),
      dietaryPreferences: formData.dietaryPreferences,
      allergies: formData.allergies
    });

    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      dietaryPreferences: user?.dietaryPreferences || [],
      allergies: user?.allergies || []
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fresh-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
            My Profile
          </h1>
          <p className="text-xl text-white/90 slide-up">
            Manage your account settings and dietary preferences
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="food-card">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "" : "hero-gradient w-full"}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </Button>
                </div>

                {/* Quick Stats */}
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Profile Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dietary Preferences</span>
                      <Badge variant="secondary">
                        {user.dietaryPreferences.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allergies</span>
                      <Badge variant="secondary">
                        {user.allergies.length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="food-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-muted rounded-md text-foreground">
                        {user.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-muted rounded-md text-foreground flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="hero-gradient">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card className="food-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Dietary Preferences</span>
                </CardTitle>
                <CardDescription>
                  Select your dietary preferences to get personalized meal recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dietaryOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.dietaryPreferences.includes(option)}
                          onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                        />
                        <Label htmlFor={option} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.dietaryPreferences.length > 0 ? (
                      user.dietaryPreferences.map((pref) => (
                        <Badge key={pref} variant="secondary" className="bg-primary/10 text-primary">
                          {pref}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No dietary preferences set. Click "Edit Profile" to add some.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="food-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span>Allergies & Restrictions</span>
                </CardTitle>
                <CardDescription>
                  List your allergies to avoid recipes with those ingredients
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={formData.allergies.includes(allergy)}
                          onCheckedChange={(checked) => handleAllergyChange(allergy, checked as boolean)}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.allergies.length > 0 ? (
                      user.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="bg-red-100 text-red-800">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No allergies listed. Click "Edit Profile" to add any allergies or restrictions.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Meal Planning Stats */}
            <Card className="food-card">
              <CardHeader>
                <CardTitle>Your PlateJoy Journey</CardTitle>
                <CardDescription>
                  Track your meal planning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">28</div>
                    <div className="text-sm text-muted-foreground">Meals Planned</div>
                  </div>
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">15</div>
                    <div className="text-sm text-muted-foreground">Favorite Recipes</div>
                  </div>
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">7</div>
                    <div className="text-sm text-muted-foreground">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;