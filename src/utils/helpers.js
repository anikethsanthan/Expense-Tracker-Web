import * as yup from "yup";

export const createDynamicYupValidation = (fields) => {
  const schema = {};
  fields.forEach((field) => {
    if (field.type === "text") {
      schema[field.key] = yup.string();
      if (field.required) {
        schema[field.key] = yup.string().required();
      }
    }
    if (field.type === "number") {
        schema[field.key] = yup
          .number()
          .typeError("Invalid Value") // Message for invalid number format
          .test("is-valid-number", "Invalid Value", (value) => {
            // Ensure the value is a valid number
            return value === null || value === undefined || !isNaN(value);
          });
      
        if (field.required) {
          schema[field.key] = schema[field.key].required("Number is required"); // Message for required number
        }
      }
    if (field.type === "date") {
      schema[field.key] = yup
        .date()
        .typeError("Invalid date format")
        .test("is-valid-date", "Invalid date", (value) => {
          return value instanceof Date && !isNaN(value);
        });

      if (field.required) {
        schema[field.key] = schema[field.key].required("Date is required");
      }
    }
  });
  return yup.object().shape(schema);
};

export const validate = (data, schema) => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return {};
  } catch (error) {
    return error.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }
};
