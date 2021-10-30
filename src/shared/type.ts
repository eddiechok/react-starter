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
  title: string;
  value: string;
};

export type FormInput = {
  name: string;
  msgLabel?: string;
  label?: string;
};
