import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const ButtonComponent = ({
  onClick,
  type = "button",
  disabled = false,
  rounded = true,
  className = "",
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      size="small"
      rounded={rounded}
      disabled={disabled}
      className={classNames(
        className + " shadow-none border-none outline-none"
      )}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
