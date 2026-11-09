import React from 'react';
import { FigmaAdminViews, FigmaAdminViewsProps } from './FigmaAdminViews';

export const FigmaAdminDashboard: React.FC<FigmaAdminViewsProps> = (props) => {
  return <FigmaAdminViews {...props} />;
};

export type { FigmaAdminViewsProps as FigmaAdminDashboardProps } from './FigmaAdminViews';
export default FigmaAdminDashboard;
