import React from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface EmailFormProps {
  onFormChange: (values: any) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onFormChange }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
  .email('Invalid email format')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email format'
  )
  .required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: () => {},
  });

  React.useEffect(() => {
    if (formik.isValid && formik.dirty) {
      const { email, subject, message } = formik.values;
      if (email && subject && message) {
        onFormChange(formik.values);
      } else {
        onFormChange(null);
      }
    } else {
      onFormChange(null);
    }
  }, [formik.values, formik.isValid, formik.dirty, onFormChange]);

  return (
    <>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        required
      />
      <TextField
        fullWidth
        id="subject"
        name="subject"
        label="Subject"
        margin="normal"
        value={formik.values.subject}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
        required
      />
      <TextField
        fullWidth
        id="message"
        name="message"
        label="Message"
        margin="normal"
        multiline
        rows={4}
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        required
      />
    </>
  );
};

export default EmailForm;
export{};