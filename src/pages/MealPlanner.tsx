import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, X, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import food images
import buddhaBowl from '@/assets/buddha-bowl.jpg';
import grilledSalmon from '@/assets/grilled-salmon.jpg';
import veggiePasta from '@/assets/veggie-pasta.jpg';
import smoothieBowl from '@/assets/smoothie-bowl.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import chickenStirfry from '@/assets/chicken-stirfry.jpg';

interface Meal {
  id: string;
  name: string;
  image?: string;
  cookTime?: string;
  servings?: number;
}

interface DayMeals {
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

interface WeekPlan {
  [key: string]: DayMeals;
}

const MealPlanner = () => {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>({
    Monday: { breakfast: null, lunch: null, dinner: null },
    Tuesday: { breakfast: null, lunch: null, dinner: null },
    Wednesday: { breakfast: null, lunch: null, dinner: null },
    Thursday: { breakfast: null, lunch: null, dinner: null },
    Friday: { breakfast: null, lunch: null, dinner: null },
    Saturday: { breakfast: null, lunch: null, dinner: null },
    Sunday: { breakfast: null, lunch: null, dinner: null },
  });

  const [customMeal, setCustomMeal] = useState({ name: '', cookTime: '', servings: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealType: keyof DayMeals } | null>(null);
  const { toast } = useToast();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes: (keyof DayMeals)[] = ['breakfast', 'lunch', 'dinner'];

  const suggestedMeals = [
    {
      id: '1',
      name: 'Rainbow Buddha Bowl',
      image: buddhaBowl,
      cookTime: '25 min',
      servings: 2
    },
    {
      id: '2', 
      name: 'Grilled Salmon Delight',
      image: grilledSalmon,
      cookTime: '20 min',
      servings: 4
    },
    {
      id: '3',
      name: 'Garden Fresh Pasta',
      image: veggiePasta,
      cookTime: '15 min',
      servings: 3
    },
    {
      id: '4',
      name: 'Green Smoothie Bowl',
      image: smoothieBowl,
      cookTime: '10 min',
      servings: 1
    },
    {
      id: '5',
      name: 'Avocado Toast Supreme',
      image: avocadoToast,
      cookTime: '8 min',
      servings: 2
    },
    {
      id: '6',
      name: 'Chicken Stir Fry',
      image: chickenStirfry,
      cookTime: '18 min',
      servings: 4
    }
  ];

  const addMealToSlot = (day: string, mealType: keyof DayMeals, meal: Meal) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: meal
      }
    }));
    setIsDialogOpen(false);
    toast({
      title: "Meal added!",
      description: `${meal.name} has been added to ${day} ${mealType}.`,
    });
  };

  const removeMealFromSlot = (day: string, mealType: keyof DayMeals) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }));
    toast({
      title: "Meal removed",
      description: `Meal removed from ${day} ${mealType}.`,
    });
  };

  const addCustomMeal = () => {
    if (!customMeal.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meal name.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSlot) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: customMeal.name.trim(),
      cookTime: customMeal.cookTime.trim() || undefined,
      servings: customMeal.servings ? parseInt(customMeal.servings) : undefined
    };

    addMealToSlot(selectedSlot.day, selectedSlot.mealType, meal);
    setCustomMeal({ name: '', cookTime: '', servings: '' });
  };

  const openMealSelector = (day: string, mealType: keyof DayMeals) => {
    setSelectedSlot({ day, mealType });
    setIsDialogOpen(true);
  };

  const clearWeekPlan = () => {
    setWeekPlan({
      Monday: { breakfast: null, lunch: null, dinner: null },
      Tuesday: { breakfast: null, lunch: null, dinner: null },
      Wednesday: { breakfast: null, lunch: null, dinner: null },
      Thursday: { breakfast: null, lunch: null, dinner: null },
      Friday: { breakfast: null, lunch: null, dinner: null },
      Saturday: { breakfast: null, lunch: null, dinner: null },
      Sunday: { breakfast: null, lunch: null, dinner: null },
    });
    toast({
      title: "Week cleared",
      description: "All meals have been removed from your weekly plan.",
    });
  };

  const generateShoppingList = () => {
    const meals = Object.values(weekPlan).flatMap(day => 
      Object.values(day).filter(meal => meal !== null)
    );
    
    if (meals.length === 0) {
      toast({
        title: "No meals planned",
        description: "Add some meals to generate a shopping list.",
        variant: "destructive",
      });
      return;
    }

    // This is a simplified shopping list - in a real app, you'd have ingredient data
    const ingredients = [
      "Quinoa", "Sweet potatoes", "Chickpeas", "Avocados", "Mixed greens",
      "Cherry tomatoes", "Salmon fillets", "Broccoli", "Pasta", "Basil",
      "Chicken breast", "Mixed vegetables", "Smoothie ingredients"
    ];

    toast({
      title: "Shopping list generated!",
      description: `Generated list with ${ingredients.length} common ingredients.`,
    });
  };

  const getMealTypeColor = (mealType: keyof DayMeals) => {
    switch (mealType) {
      case 'breakfast': return 'bg-yellow-50 border-yellow-200';
      case 'lunch': return 'bg-blue-50 border-blue-200';
      case 'dinner': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
            Weekly Meal Planner
          </h1>
          <p className="text-xl text-white/90 slide-up">
            Plan your meals for the week and stay organized with your nutrition goals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button onClick={generateShoppingList} variant="outline">
            Generate Shopping List
          </Button>
          <Button onClick={clearWeekPlan} variant="outline">
            Clear Week
          </Button>
        </div>

        {/* Weekly Planner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {days.map((day) => (
            <Card key={day} className="food-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-lg font-semibold text-primary">
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mealTypes.map((mealType) => (
                  <div
                    key={mealType}
                    className={`p-3 rounded-lg border-2 border-dashed transition-colors ${getMealTypeColor(mealType)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium capitalize text-foreground">
                        {mealType}
                      </h4>
                      {weekPlan[day][mealType] && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMealFromSlot(day, mealType)}
                          className="h-6 w-6 p-0 hover:bg-red-100"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      )}
                    </div>
                    
                    {weekPlan[day][mealType] ? (
                      <div className="space-y-2">
                        {weekPlan[day][mealType]!.image && (
                          <img
                            src={weekPlan[day][mealType]!.image}
                            alt={weekPlan[day][mealType]!.name}
                            className="w-full h-20 object-cover rounded recipe-image"
                            loading="lazy"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {weekPlan[day][mealType]!.name}
                          </p>
                          {weekPlan[day][mealType]!.cookTime && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{weekPlan[day][mealType]!.cookTime}</span>
                            </div>
                          )}
                          {weekPlan[day][mealType]!.servings && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                              <Users className="h-3 w-3" />
                              <span>{weekPlan[day][mealType]!.servings} servings</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openMealSelector(day, mealType)}
                        className="w-full h-16 border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/5"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Meal
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meal Selection Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Add Meal to {selectedSlot?.day} {selectedSlot?.mealType}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Suggested Meals */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Suggested Meals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedMeals.map((meal) => (
                    <div
                      key={meal.id}
                      onClick={() => selectedSlot && addMealToSlot(selectedSlot.day, selectedSlot.mealType, meal)}
                      className="cursor-pointer group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-32 object-cover recipe-image"
                        loading="lazy"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-foreground mb-2">{meal.name}</h4>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{meal.cookTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{meal.servings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Meal */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Add Custom Meal</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mealName">Meal Name *</Label>
                    <Input
                      id="mealName"
                      placeholder="Enter meal name"
                      value={customMeal.name}
                      onChange={(e) => setCustomMeal(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cookTime">Cook Time (optional)</Label>
                      <Input
                        id="cookTime"
                        placeholder="e.g., 30 min"
                        value={customMeal.cookTime}
                        onChange={(e) => setCustomMeal(prev => ({ ...prev, cookTime: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="servings">Servings (optional)</Label>
                      <Input
                        id="servings"
                        type="number"
                        placeholder="e.g., 4"
                        value={customMeal.servings}
                        onChange={(e) => setCustomMeal(prev => ({ ...prev, servings: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={addCustomMeal} className="w-full hero-gradient">
                    Add Custom Meal
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MealPlanner;