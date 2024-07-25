import { TextFieldProps } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormikErrors } from "formik";
import { DateTime } from "luxon";
import { TEventForm } from "../../models/event";

type TProps = {
  pickerProps: {
    label: string;
    value: any;
    minDate?: DateTime;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<FormikErrors<TEventForm>> | Promise<void>;
  };
  fieldProps: TextFieldProps;
};

function DateTimePickerField({ pickerProps, fieldProps }: TProps) {
  return (
    <DateTimePicker
      label={pickerProps.label}
      value={pickerProps.value}
      minDate={pickerProps.minDate}
      onChange={(value) => pickerProps.setFieldValue("date", value)}
      slotProps={{
        textField: {
          ...fieldProps,
          fullWidth: true,
          InputLabelProps: { shrink: true },
        },
      }}
    />
  );
}

export default DateTimePickerField;
