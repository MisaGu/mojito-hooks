import React from 'react';
import { AuthProvider } from '../../../domain/context/auth.context';
import { DemoInterface } from '../../demo/Interface/DemoInterface';
import { DemoProviders } from '../../demo/Provider/DemoProvider';

export interface TestWrapperProps {
  children?: React.ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  const DemoContent: React.FC = () => {
    return <>{children || null}</>;
  };

  return (
    <AuthProvider>
      <DemoInterface demoComponent={DemoContent} />
    </AuthProvider>
  );
};
