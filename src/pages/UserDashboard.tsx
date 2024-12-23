@@ .. @@
-import React from 'react';
+import React, { useEffect } from 'react';
 import { motion } from 'framer-motion';
 import { Activity, Calendar, Book, Settings } from 'lucide-react';
 import MainLayout from './layouts/MainLayout';
+import { useNavigate } from 'react-router-dom';
+import { useAuth } from '../contexts/AuthContext';
 
 const UserDashboard = () => {
+  const { user } = useAuth();
+  const navigate = useNavigate();
+
+  useEffect(() => {
+    if (!user) {
+      navigate('/login');
+    }
+  }, [user, navigate]);
+
   return (
     <MainLayout>
-      <div className="container mx-auto px-4 py-8">
+      <div className="container mx-auto px-4 py-20">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-6xl mx-auto"
         >