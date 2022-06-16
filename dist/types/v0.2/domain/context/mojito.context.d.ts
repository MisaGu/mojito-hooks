import React from 'react';
export declare enum EUrlParams {
  collectionSlug = 0,
  collectionItemSlug = 1,
}
export interface MojitoHooksProviderProps {
  children: React.ReactNode;
  authToken?: any;
  urlPatterns?: any;
  onRouterChange?: () => void;
  onError?: () => void;
}
export declare const MojitoHooksProvider: React.FC<MojitoHooksProviderProps>;
