import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PageSpin from '../../components/elements/Spin/PageSpin';
import { ImagePage } from '.';

export const ImagePageRoute: RouteObject = {
  path: 'image',
  element: (
    <Suspense fallback={<PageSpin />}>
      <ImagePage />
    </Suspense>
  ),
};
