import { Suspense } from 'react';
import { CategoriesSection } from '../sections/categories-section';

interface HomeViewProps {
  categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <Suspense>
        <CategoriesSection categoryId={categoryId} />
      </Suspense>
    </div>
  );
};
