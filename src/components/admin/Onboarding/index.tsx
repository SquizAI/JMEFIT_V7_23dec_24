import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import QuestionnaireForms from './QuestionnaireForms';
import GroceryListManager from './GroceryListManager';

const OnboardingManager = () => {
  const [activeTab, setActiveTab] = useState('questionnaires');

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
          <TabsTrigger value="grocery">Grocery Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="questionnaires">
          <QuestionnaireForms />
        </TabsContent>

        <TabsContent value="grocery">
          <GroceryListManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnboardingManager;