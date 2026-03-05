const DecimalInput = ({
  value,
  onChange,
  maxDecimals = 2,
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

    const regex = allowNegative
      ? new RegExp(`^-?\\d*(\\.\\d{0,${maxDecimals}})?$`)
      : new RegExp(`^\\d*(\\.\\d{0,${maxDecimals}})?$`);

    if (regex.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DecimalInput;
