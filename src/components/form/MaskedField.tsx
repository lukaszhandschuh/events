import { TextField, TextFieldProps } from "@mui/material";
import { Replacement, useMask } from "@react-input/mask";

type TProps = {
  fieldProps: TextFieldProps;
  mask: string;
  replacement: Replacement;
};

function MaskedField({ fieldProps, mask, replacement }: TProps) {
  const inputRef = useMask({
    mask,
    replacement,
    showMask: true,
  });

  return <TextField fullWidth {...fieldProps} inputRef={inputRef} />;
}

export default MaskedField;
