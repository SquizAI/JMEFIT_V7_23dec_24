import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import OnlineCoaching from '../components/OnlineCoaching';
import Transformations from '../components/Testimonials';
import Packages from '../components/Packages';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <OnlineCoaching />
      <Transformations />
      <Packages />
      <Blog />
      <FAQ />
    </MainLayout>
  );
};

export default Home;