import MemberGateway from '@/pages/member-gateway/MemberGateway';
import React from 'react';
import { Route } from 'react-router-dom';
import appRoutes from './app-routes';
import { IRoute } from './route.model';

const publicRoutes: IRoute[] = [
  {
    path: appRoutes.gateway,
    component: MemberGateway
  }
];

export const getDefaultRoutes = () => {
  return publicRoutes.map(({ component: Component, ...route }, index) => {
    return <Route key={index} element={<Component />} {...route} />;
  });
};
