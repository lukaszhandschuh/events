import { Button, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import DateTimePickerField from "../components/form/DateTimePickerField";
import FormTextField from "../components/form/FormTextField";
import ImageField from "../components/form/ImageField";
import MaskedField from "../components/form/MaskedField";
import SelectField from "../components/form/SelectField";
import { eventTypes, TEventForm } from "../models/event";
import { useSnackbar } from "../providers/AppSnackbar";
import { addEvent } from "../redux/features/eventSlice";
import { AppDispatch } from "../redux/store/store";

const FormWrapper = styled.form`
  padding: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function EventForm() {
  const { showSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<TEventForm>({
    initialValues: {
      title: "",
      date: null,
      image: null,
      description: "",
      address: "",
      email: "",
      phoneNumber: "+(__) ___-___-___",
      type: "sport",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(
          64,
          (value) => `${formatMessage({ id: "invalidMax" })} ${value.max}`
        )
        .required(formatMessage({ id: "required" })),
      date: yup.mixed().required(formatMessage({ id: "required" })),
      description: yup.string().required(formatMessage({ id: "required" })),
      image: yup.mixed().required(formatMessage({ id: "required" })),
      address: yup.string().required(formatMessage({ id: "required" })),
      email: yup
        .string()
        .email(formatMessage({ id: "emailInvalid" }))
        .required(formatMessage({ id: "required" })),
      phoneNumber: yup
        .string()
        .matches(/\+\(\d{2}\) \d{3}-\d{3}-\d{3}/, {
          message: formatMessage({ id: "phoneNumberInvalid" }),
        })
        .required(formatMessage({ id: "required" })),
      type: yup
        .string()
        .oneOf(eventTypes, formatMessage({ id: "invalidEventType" }))
        .required(formatMessage({ id: "required" })),
    }),
    onSubmit: async (values) => {
      if (!values.date || !values.image) {
        return;
      }

      const response = await dispatch(
        addEvent({
          ...values,
          date: values.date.toISO()!,
          image: "https://picsum.photos/400/199",
        })
      );

      if (response.meta.requestStatus === "fulfilled") {
        showSnackbar("eventAdded");
        navigate("/events");
      }
    },
  });

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">
            <FormattedMessage id="addEvent" />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            name="title"
            required
            value={values.title}
            label={formatMessage({ id: "title" })}
            error={!!touched.title && !!errors.title}
            helperText={!!touched.title && !!errors.title ? errors.title : " "}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePickerField
            pickerProps={{
              label: formatMessage({ id: "eventDate" }),
              value: values.date,
              setFieldValue,
              minDate: DateTime.now(),
            }}
            fieldProps={{
              required: true,
              name: "date",
              onBlur: handleBlur,
              error: !!touched.date && !!errors.date,
              helperText:
                !!touched.date && !!errors.date ? (errors.date as string) : " ",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectField
            fieldProps={{
              required: true,
              name: "type",
              value: values.type,
              label: formatMessage({ id: "eventType" }),
              error: !!touched.type && !!errors.type,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            helperText={!!touched.type && !!errors.type ? errors.type : " "}
            items={eventTypes}
          />
          <FormTextField
            style={{ marginTop: 13 }}
            required
            name="address"
            value={values.address}
            label={formatMessage({ id: "address" })}
            error={!!touched.address && !!errors.address}
            helperText={
              !!touched.address && !!errors.address ? errors.address : " "
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            multiline
            rows={5}
            name="description"
            value={values.description}
            label={formatMessage({ id: "description" })}
            error={!!touched.description && !!errors.description}
            helperText={
              !!touched.description && !!errors.description
                ? errors.description
                : " "
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <ImageField
            fieldProps={{
              required: true,
              name: "image",
              value: values.image,
              label: formatMessage({ id: "image" }),
              error: !!touched.image && !!errors.image,
              helperText:
                !!touched.image && !!errors.image ? errors.image : " ",
              onBlur: handleBlur,
            }}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item xs={4}>
          <MaskedField
            fieldProps={{
              required: true,
              name: "phoneNumber",
              value: values.phoneNumber,
              label: formatMessage({ id: "phoneNumber" }),
              error: !!touched.phoneNumber && !!errors.phoneNumber,
              helperText:
                !!touched.phoneNumber && !!errors.phoneNumber
                  ? errors.phoneNumber
                  : " ",
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            mask={"+(__) ___-___-___"}
            replacement={{ _: /\d/ }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextField
            required
            name="email"
            value={values.email}
            label={formatMessage({ id: "email" })}
            error={!!touched.email && !!errors.email}
            helperText={!!touched.email && !!errors.email ? errors.email : " "}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item style={{ textAlign: "center" }} xs={12}>
        <ButtonsWrapper>
          <Button onClick={() => resetForm()} variant="text" type="button">
            <FormattedMessage id="clear" />
          </Button>
          <Button variant="contained" type="submit">
            <FormattedMessage id="save" />
          </Button>
        </ButtonsWrapper>
      </Grid>
    </FormWrapper>
  );
}

export default EventForm;
