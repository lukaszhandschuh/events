import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

type TProps = {
  fieldProps: SelectProps & { label: string };
  items: string[];
  helperText: string;
};

function SelectField({ fieldProps, items, helperText }: TProps) {
  return (
    <FormControl fullWidth>
      <InputLabel
        required={fieldProps.required}
        shrink
        id={`select-label-${fieldProps.name}`}
      >
        {fieldProps.label}
      </InputLabel>
      <Select {...fieldProps} labelId={`select-label-${fieldProps.name}`}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            <FormattedMessage id={item} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default SelectField;
