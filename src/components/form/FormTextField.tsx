import { TextField, TextFieldProps } from "@mui/material";

function FormTextField(props: TextFieldProps) {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}

export default FormTextField;
