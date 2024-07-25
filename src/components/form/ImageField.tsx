import { AddAPhoto } from "@mui/icons-material";
import { IconButton, TextFieldProps } from "@mui/material";
import { FormikErrors } from "formik";
import { useRef } from "react";
import styled from "styled-components";
import { TEvent } from "../models/event";
import FormTextField from "./FormTextField";

const ImageInput = styled.input`
  display: none;
`;

type TProps = {
  fieldProps: TextFieldProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<TEvent>> | Promise<void>;
};

function ImageField({ fieldProps, setFieldValue }: TProps) {
  const ref = useRef(null);
  const fileChangedHandle = (event: any) => {
    if (!fieldProps.name || !event?.currentTarget?.files[0]) {
      return;
    }
    const file: File = event.currentTarget.files[0];
    setFieldValue(fieldProps.name, file);
  };
  const iconClickHandle = () => {
    if (!ref.current) {
      return;
    }

    const el: HTMLInputElement = ref.current;
    el.click();
  };

  return (
    <>
      <FormTextField
        {...fieldProps}
        value={(fieldProps.value as any)?.name}
        InputProps={{
          endAdornment: (
            <IconButton onClick={iconClickHandle}>
              <AddAPhoto />
            </IconButton>
          ),
          readOnly: true,
        }}
      />
      <ImageInput
        ref={ref}
        onChange={fileChangedHandle}
        accept="image/png, image/jpeg, image/svg+xml"
        type="file"
      />
    </>
  );
}

export default ImageField;
