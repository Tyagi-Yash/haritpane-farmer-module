const IntegerInput = ({
  value,
  onChange,
  allowNegative = false,
  className = "",
  placeholder = "",
  name,
  ...rest
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange("");
      return;
    }

    const regex = allowNegative ? /^-?\d*$/ : /^\d*$/;

    if (regex.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default IntegerInput;
