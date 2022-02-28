import React from 'react';

export type ToggleProps = {
  isOpen: boolean;
  present?: () => void;
  dismiss?: () => void;
};

export type DateRange = {
  dateFrom?: Date | null;
  dateTo?: Date | null;
};

export type SelectOption = {
  icon?: React.ReactNode;
  img?: string;
  title: string;
  value: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type FormInput = {
  name: string;
  msgLabel?: string;
  label?: string;
};
