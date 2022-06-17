import React from 'react';
import { DemoInterface } from '../../demo/Interface/DemoInterface';

export interface TestWrapperProps {
  children?: React.ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  const DemoContent: React.FC = () => {
    return <>{children || null}</>;
  };

  return <DemoInterface demoComponent={DemoContent} />;
};
