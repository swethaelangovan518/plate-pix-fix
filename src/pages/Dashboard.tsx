import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import food images
import buddhaBowl from '@/assets/buddha-bowl.jpg';
import grilledSalmon from '@/assets/grilled-salmon.jpg';
import veggiePasta from '@/assets/veggie-pasta.jpg';
import smoothieBowl from '@/assets/smoothie-bowl.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import chickenStirfry from '@/assets/chicken-stirfry.jpg';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentQuote, setCurrentQuote] = useState(0);

  const inspirationalQuotes = [
    "Let food be thy medicine and medicine be thy food. - Hippocrates",
    "Cooking is love made visible. - Author Unknown",
    "The groundwork for all happiness is good health. - Leigh Hunt",
    "Take care of your body. It's the only place you have to live. - Jim Rohn",
    "A recipe has no soul. You, as the cook, must bring soul to the recipe. - Thomas Keller"
  ];

  const featuredMeals = [
    {
      id: 1,
      name: "Rainbow Buddha Bowl",
      image: buddhaBowl,
      time: "25 min",
      calories: "380 cal",
      tags: ["Vegetarian", "High Protein"]
    },
    {
      id: 2,
      name: "Grilled Salmon Delight",
      image: grilledSalmon,
      time: "20 min", 
      calories: "420 cal",
      tags: ["High Protein", "Omega-3"]
    },
    {
      id: 3,
      name: "Garden Fresh Pasta",
      image: veggiePasta,
      time: "15 min",
      calories: "340 cal", 
      tags: ["Vegetarian", "Quick"]
    }
  ];

  const todaysMeals = [
    {
      meal: "Breakfast",
      name: "Green Smoothie Bowl",
      image: smoothieBowl,
      time: "8:00 AM"
    },
    {
      meal: "Lunch", 
      name: "Avocado Toast",
      image: avocadoToast,
      time: "12:30 PM"
    },
    {
      meal: "Dinner",
      name: "Chicken Stir Fry",
      image: chickenStirfry,
      time: "7:00 PM"
    }
  ];

  const stats = [
    {
      title: "Meals Planned",
      value: "28",
      icon: Calendar,
      change: "+12% from last week"
    },
    {
      title: "Avg Prep Time",
      value: "22 min",
      icon: Clock,
      change: "-5 min improvement"
    },
    {
      title: "Favorite Recipes",
      value: "15",
      icon: Heart,
      change: "+3 this week"
    },
    {
      title: "Health Score",
      value: "85%",
      icon: TrendingUp,
      change: "+8% this month"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-white/90 mb-8 slide-up">
              Ready to plan some delicious and healthy meals today?
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium text-white/80">Daily Inspiration</span>
              </div>
              <p className="text-lg font-medium text-white italic">
                "{inspirationalQuotes[currentQuote]}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="food-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Meals */}
          <div className="lg:col-span-1">
            <Card className="food-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Today's Meals</span>
                </CardTitle>
                <CardDescription>Your planned meals for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysMeals.map((meal, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-16 h-16 rounded-lg object-cover recipe-image"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{meal.meal}</p>
                      <p className="text-sm text-muted-foreground">{meal.name}</p>
                      <p className="text-xs text-primary">{meal.time}</p>
                    </div>
                  </div>
                ))}
                <Link to="/meal-planner">
                  <Button className="w-full mt-4" variant="outline">
                    View Full Planner
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Featured Meals */}
          <div className="lg:col-span-2">
            <Card className="food-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Featured Meals</span>
                </CardTitle>
                <CardDescription>
                  Handpicked recipes based on your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-full object-cover recipe-image group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">{meal.name}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{meal.time}</span>
                          </div>
                          <span>{meal.calories}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {meal.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/recipes">
                  <Button className="w-full mt-6 hero-gradient">
                    Explore All Recipes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card className="food-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your meal planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/meal-planner">
                  <Button className="w-full h-20 flex flex-col space-y-2" variant="outline">
                    <Calendar className="h-6 w-6" />
                    <span>Plan This Week</span>
                  </Button>
                </Link>
                <Link to="/recipes">
                  <Button className="w-full h-20 flex flex-col space-y-2" variant="outline">
                    <Heart className="h-6 w-6" />
                    <span>Browse Recipes</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button className="w-full h-20 flex flex-col space-y-2" variant="outline">
                    <TrendingUp className="h-6 w-6" />
                    <span>Update Preferences</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;