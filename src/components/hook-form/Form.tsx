import React from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type TFormProps<FormValues> = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  'onSubmit'
> & {
  methods: UseFormReturn<FormValues>;
  onSubmit?: SubmitHandler<FormValues>;
};

const Form = React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<TFormProps<any>>
>(({ children, methods, onSubmit, ...props }, ref) => {
  return (
    <FormProvider {...methods}>
      <form
        ref={ref}
        onSubmit={onSubmit && methods.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
});

export default Form;
