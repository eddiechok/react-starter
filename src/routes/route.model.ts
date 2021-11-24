import { RouteProps } from 'react-router';

export type Guard =
  | 'hasSecondaryPassword'
  | 'hasTradingPassword'
  | 'hasDefaultAddress'
  | 'hasActiveContract'
  | 'hasOtp';

export interface IRoute extends RouteProps {
  name?: string;
  path: string;
  guards?: Guard[];
  component: React.FC;
  isModal?: boolean;
}
