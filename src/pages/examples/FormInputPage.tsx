import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid } from '@mui/material';
import { addDays } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SchemaOf } from 'yup';
import Form from '../../components/hook-form/Form';
import FormDatePicker from '../../components/hook-form/FormDatePicker';
import FormDateRangePicker from '../../components/hook-form/FormDateRangePicker';
import Header from '../../components/layout/Header';
import AppDatePicker from '../../components/ui/AppDatePicker';
import AppDateRangePicker from '../../components/ui/AppDateRangePicker';
import { Yup } from '../../shared/constants';
import { DateRange } from '../../shared/type';

type FormValues = {
  date: Date | null;
  dateFrom: Date | null;
  dateTo: Date | null;
};

const schema: SchemaOf<FormValues> = Yup.object({
  date: Yup.date()
    .nullable()
    .required()
    .min(new Date())
    .max(addDays(new Date(), 7)), // disallow form to submit
  dateFrom: Yup.date()
    .nullable()
    .required()
    .min(new Date())
    .max(addDays(new Date(), 7)), // disallow form to submit
  dateTo: Yup.date()
    .nullable()
    .required()
    .min(new Date())
    .max(addDays(new Date(), 7)) // disallow form to submit
});

const FormInputPage = () => {
  const [date, setDate] = useState<any>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    dateFrom: null,
    dateTo: null
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      date: null, // if default value == undefined, date will show today date
      dateFrom: null,
      dateTo: null
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  console.log(methods.formState.errors, methods.watch());

  return (
    <>
      <Header title="Form Input Page" />
      <Container maxWidth="sm">
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <AppDatePicker
                label="Date without Hook Form"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                minDate={new Date()}
                maxDate={addDays(new Date(), 7)}
                textFieldProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormDatePicker
                name="date"
                label="Date with Hook Form"
                minDate={new Date()}
                maxDate={addDays(new Date(), 7)}
                textFieldProps={{
                  fullWidth: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <AppDateRangePicker
                dateRange={dateRange}
                onChange={setDateRange}
                from={{
                  label: 'Date From without Hook Form',
                  textFieldProps: {
                    fullWidth: true
                  }
                }}
                to={{
                  label: 'Date To without Hook Form',
                  textFieldProps: {
                    fullWidth: true
                  }
                }}
                minDate={new Date()}
                maxDate={addDays(new Date(), 7)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormDateRangePicker
                from={{
                  name: 'dateFrom',
                  label: 'Date From with Hook Form',
                  textFieldProps: {
                    fullWidth: true
                  }
                }}
                to={{
                  name: 'dateTo',
                  label: 'Date To with Hook Form',
                  textFieldProps: {
                    fullWidth: true
                  }
                }}
                minDate={new Date()}
                maxDate={addDays(new Date(), 7)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Container>
    </>
  );
};

export default FormInputPage;
