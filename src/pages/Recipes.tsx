import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Clock, Users, Heart, Star, ChefHat } from 'lucide-react';

// Import food images
import buddhaBowl from '@/assets/buddha-bowl.jpg';
import grilledSalmon from '@/assets/grilled-salmon.jpg';
import veggiePasta from '@/assets/veggie-pasta.jpg';
import smoothieBowl from '@/assets/smoothie-bowl.jpg';
import avocadoToast from '@/assets/avocado-toast.jpg';
import chickenStirfry from '@/assets/chicken-stirfry.jpg';

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  category: string[];
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Rainbow Buddha Bowl",
    image: buddhaBowl,
    cookTime: "25 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.8,
    category: ["Vegetarian", "Healthy", "Bowl"],
    description: "A colorful and nutritious Buddha bowl packed with quinoa, roasted vegetables, and a delicious tahini dressing.",
    ingredients: [
      "1 cup quinoa, cooked",
      "1 cup roasted sweet potato cubes", 
      "1 cup roasted chickpeas",
      "1 avocado, sliced",
      "1 cup shredded purple cabbage",
      "1 cup shredded carrots",
      "2 tbsp tahini",
      "1 tbsp lemon juice",
      "1 tsp maple syrup",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions and let cool.",
      "Roast sweet potato cubes at 400°F for 20 minutes.",
      "Roast chickpeas with olive oil and spices for 15 minutes.",
      "Prepare vegetables by shredding cabbage and carrots.",
      "Make tahini dressing by mixing tahini, lemon juice, maple syrup, and water.",
      "Assemble bowls by arranging all ingredients beautifully.",
      "Drizzle with tahini dressing and serve immediately."
    ],
    nutrition: {
      calories: 380,
      protein: "15g",
      carbs: "52g", 
      fat: "14g"
    }
  },
  {
    id: 2,
    name: "Grilled Salmon Delight",
    image: grilledSalmon,
    cookTime: "20 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    category: ["Seafood", "High Protein", "Keto"],
    description: "Perfectly grilled salmon with herbs, served with steamed broccoli and quinoa for a complete meal.",
    ingredients: [
      "4 salmon fillets (6oz each)",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 lemon, juiced and zested",
      "2 tbsp fresh dill",
      "1 tbsp fresh parsley",
      "4 cups broccoli florets",
      "2 cups cooked quinoa",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat grill to medium-high heat.",
      "Mix olive oil, garlic, lemon juice, and herbs in a bowl.",
      "Season salmon fillets with salt and pepper.",
      "Brush salmon with herb mixture and let marinate for 10 minutes.",
      "Grill salmon for 4-5 minutes per side until cooked through.",
      "Steam broccoli until tender-crisp, about 5 minutes.",
      "Serve salmon over quinoa with steamed broccoli on the side."
    ],
    nutrition: {
      calories: 420,
      protein: "35g",
      carbs: "28g",
      fat: "18g"
    }
  },
  {
    id: 3,
    name: "Garden Fresh Pasta",
    image: veggiePasta,
    cookTime: "15 min", 
    servings: 3,
    difficulty: "Easy",
    rating: 4.7,
    category: ["Vegetarian", "Quick", "Italian"],
    description: "Light and fresh pasta with cherry tomatoes, basil, and parmesan cheese - perfect for a quick dinner.",
    ingredients: [
      "12oz whole wheat pasta",
      "2 cups cherry tomatoes, halved",
      "3 cloves garlic, minced",
      "1/4 cup olive oil",
      "1/2 cup fresh basil leaves",
      "1/2 cup grated parmesan",
      "2 tbsp pine nuts",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook pasta according to package instructions until al dente.",
      "Heat olive oil in a large skillet over medium heat.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Add cherry tomatoes and cook for 3-4 minutes until softened.",
      "Drain pasta and add to the skillet with tomatoes.",
      "Toss with fresh basil, parmesan, and pine nuts.",
      "Season with salt and pepper, serve immediately."
    ],
    nutrition: {
      calories: 340,
      protein: "12g",
      carbs: "58g",
      fat: "8g"
    }
  },
  {
    id: 4,
    name: "Green Smoothie Bowl",
    image: smoothieBowl,
    cookTime: "10 min",
    servings: 1,
    difficulty: "Easy", 
    rating: 4.6,
    category: ["Vegan", "Breakfast", "Healthy"],
    description: "A nutritious and refreshing smoothie bowl topped with fresh fruits, nuts, and seeds.",
    ingredients: [
      "1 frozen banana",
      "1/2 cup spinach",
      "1/2 avocado",
      "1/2 cup almond milk",
      "1 tbsp almond butter",
      "1 tsp honey or maple syrup",
      "Toppings: berries, granola, coconut flakes, chia seeds"
    ],
    instructions: [
      "Blend frozen banana, spinach, avocado, and almond milk until smooth.",
      "Add almond butter and honey, blend again.",
      "Pour into a bowl.",
      "Arrange toppings beautifully on top.",
      "Serve immediately while cold."
    ],
    nutrition: {
      calories: 320,
      protein: "8g", 
      carbs: "42g",
      fat: "16g"
    }
  },
  {
    id: 5,
    name: "Avocado Toast Supreme", 
    image: avocadoToast,
    cookTime: "8 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    category: ["Vegetarian", "Breakfast", "Quick"],
    description: "Elevated avocado toast with cherry tomatoes, microgreens, and everything seasoning.",
    ingredients: [
      "2 slices sourdough bread",
      "1 large ripe avocado", 
      "1 cup cherry tomatoes, halved",
      "2 tbsp microgreens",
      "1 tsp everything seasoning",
      "1 tbsp olive oil",
      "1 tsp lemon juice",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Toast bread slices until golden brown.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread avocado mixture on toast.",
      "Top with cherry tomatoes and microgreens.",
      "Drizzle with olive oil and sprinkle everything seasoning.",
      "Serve immediately."
    ],
    nutrition: {
      calories: 280,
      protein: "8g",
      carbs: "32g", 
      fat: "14g"
    }
  },
  {
    id: 6,
    name: "Chicken Stir Fry",
    image: chickenStirfry,
    cookTime: "18 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    category: ["High Protein", "Asian", "Quick"],
    description: "Colorful chicken stir fry with fresh vegetables and a savory sauce, served over brown rice.",
    ingredients: [
      "1 lb chicken breast, sliced thin",
      "2 cups mixed stir fry vegetables",
      "2 tbsp sesame oil",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "3 tbsp soy sauce",
      "1 tbsp honey",
      "1 tsp cornstarch", 
      "2 cups cooked brown rice",
      "2 green onions, sliced"
    ],
    instructions: [
      "Heat sesame oil in a large wok or skillet over high heat.",
      "Add chicken and cook until golden, about 5 minutes.",
      "Add garlic and ginger, cook for 1 minute.",
      "Add vegetables and stir fry for 3-4 minutes.",
      "Mix soy sauce, honey, and cornstarch in a small bowl.",
      "Pour sauce over chicken and vegetables, cook until thickened.",
      "Serve over brown rice, garnish with green onions."
    ],
    nutrition: {
      calories: 380,
      protein: "28g",
      carbs: "35g",
      fat: "12g" 
    }
  }
];

const categories = ["All", "Vegetarian", "Vegan", "Seafood", "High Protein", "Quick", "Healthy", "Keto"];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === "All" || recipe.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (recipeId: number) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fresh-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
            Recipe Collection
          </h1>
          <p className="text-xl text-white/90 slide-up">
            Discover delicious and healthy recipes tailored to your preferences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "hero-gradient" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="food-card overflow-hidden">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover recipe-image"
                  loading="lazy"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(recipe.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(recipe.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{recipe.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {recipe.category.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.category.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{recipe.category.length - 2}
                    </Badge>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full hero-gradient">
                      View Recipe
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <ChefHat className="h-5 w-5 text-primary" />
                        <span>{recipe.name}</span>
                      </DialogTitle>
                      <DialogDescription>
                        {recipe.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-64 object-cover rounded-lg"
                        loading="lazy"
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-accent/50 p-3 rounded-lg">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-sm font-medium">{recipe.cookTime}</p>
                          <p className="text-xs text-muted-foreground">Cook Time</p>
                        </div>
                        <div className="bg-accent/50 p-3 rounded-lg">
                          <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-sm font-medium">{recipe.servings}</p>
                          <p className="text-xs text-muted-foreground">Servings</p>
                        </div>
                        <div className="bg-accent/50 p-3 rounded-lg">
                          <Star className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-sm font-medium">{recipe.rating}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="bg-accent/50 p-3 rounded-lg">
                          <p className="text-sm font-medium">{recipe.nutrition.calories}</p>
                          <p className="text-xs text-muted-foreground">Calories</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Ingredients</h4>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Instructions</h4>
                        <ol className="space-y-3">
                          {recipe.instructions.map((step, index) => (
                            <li key={index} className="flex space-x-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </span>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Nutrition Information</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">{recipe.nutrition.calories}</p>
                            <p className="text-xs text-muted-foreground">Calories</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">{recipe.nutrition.protein}</p>
                            <p className="text-xs text-muted-foreground">Protein</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">{recipe.nutrition.carbs}</p>
                            <p className="text-xs text-muted-foreground">Carbs</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">{recipe.nutrition.fat}</p>
                            <p className="text-xs text-muted-foreground">Fat</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more recipes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;