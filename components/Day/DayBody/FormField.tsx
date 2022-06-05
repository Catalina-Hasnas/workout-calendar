import { IFormField } from "./types";

const FormField = ({
  as,
  children,
  name,
  label,
  required,
  requiredMessage,
  register,
  errors,
  customId,
}: IFormField) => {
  let FormElement = as;

  let registerProps = register(name);

  if (required) {
    registerProps = register(name, { required: requiredMessage });
  }

  return (
    <>
      <label
        className="tracking-wider text-lg"
        htmlFor={customId ? name + "custom" : name}
      >
        {label}
      </label>
      <FormElement
        className={`p-3 mt-2 mb-3 w-full rounded-sm border ${
          errors[name] &&
          " focus:border-red-500 focus:ring-red-500 border-red-500"
        }`}
        {...registerProps}
        id={customId ? name + "custom" : name}
      >
        {children ?? children}
      </FormElement>
      {errors[name] && (
        <span className="text-sm text-red-500 mb-3">
          {errors[name]?.message}
        </span>
      )}
    </>
  );
};

export default FormField;
