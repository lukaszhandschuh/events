import { DateTimePicker } from "@mui/x-date-pickers";
import { FormikErrors } from "formik";
import { DateTime } from "luxon";
import { TEventForm } from "../../models/event";
import FormTextField from "./FormTextField";

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
  fieldProps: {
    name: string;
    error: boolean;
    required?: boolean;
    helperText: string;
    onBlur: {
      (e: React.FocusEvent<any, Element>): void;
      <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
  };
};

function DateTimePickerField(props: TProps) {
  return (
    <DateTimePicker
      label={props.pickerProps.label}
      value={props.pickerProps.value}
      minDate={props.pickerProps.minDate}
      onChange={(value) => props.pickerProps.setFieldValue("date", value)}
      slots={{
        textField: (params, ref) => {
          // TODO console.log(params, ref);

          return <FormTextField {...params} {...props.fieldProps} />;
        },
      }}
      slotProps={{}}
    />
  );
}

export default DateTimePickerField;
