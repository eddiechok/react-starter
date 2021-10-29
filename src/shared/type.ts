export type ToggleProps = {
  isOpen: boolean;
  present?: () => void;
  dismiss?: () => void;
};

export type DateRange = {
  dateFrom: string;
  dateTo: string;
};

export type SelectOption = {
  title: string;
  value: string;
};

export type FormInput = {
  name: string;
  msgLabel?: string;
  label?: string;
};
