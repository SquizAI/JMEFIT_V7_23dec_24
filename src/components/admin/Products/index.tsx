import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import DigitalProductManager from './DigitalProductManager';

const ProductManager = () => {
  const [activeTab, setActiveTab] = useState('digital');

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="digital">Digital Products</TabsTrigger>
        </TabsList>

        <TabsContent value="digital">
          <DigitalProductManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManager;