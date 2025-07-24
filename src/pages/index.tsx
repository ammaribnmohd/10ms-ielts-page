// src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomeRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/en');
  }, [router]);
  return null; // Render nothing while redirecting
};

export default HomeRedirect;