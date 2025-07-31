import classes from "./Input.module.css";

type inputProps = {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  multiple?: boolean;
};

const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple = false,
}: inputProps) => {
  return (
    <div className={classes.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        multiple={multiple}
      />
    </div>
  );
};

export default Input;
