import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Hero = dynamic(() => import('@/components/Hero'));
const Products = dynamic(() => import('@/components/PubliCard'));



export default function Home () {
  return (
    <div>
      <Suspense fallback={<div className="py-12 text-center text-gray-500">Cargando hero...</div>}>
        <Hero />
      </Suspense>

      <div className="w-full h-[2px] bg-gray-300 mt-2"></div>

      <Suspense fallback={<div className="py-12 text-center text-gray-500">Cargando productos...</div>}>
        <Products />
      </Suspense>
    </div>
  );
};
