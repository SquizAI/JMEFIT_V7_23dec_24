import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import MealManager from './MealManager';
import WorkoutManager from './WorkoutManager';
import OutfitManager from './OutfitManager';
import NutritionAdviceManager from './NutritionAdviceManager';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('meals');

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="meals">Meals & Snacks</TabsTrigger>
          <TabsTrigger value="workouts">Workout Splits</TabsTrigger>
          <TabsTrigger value="outfits">Outfits</TabsTrigger>
          <TabsTrigger value="advice">Nutrition Advice</TabsTrigger>
        </TabsList>

        <TabsContent value="meals">
          <MealManager />
        </TabsContent>

        <TabsContent value="workouts">
          <WorkoutManager />
        </TabsContent>

        <TabsContent value="outfits">
          <OutfitManager />
        </TabsContent>

        <TabsContent value="advice">
          <NutritionAdviceManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;