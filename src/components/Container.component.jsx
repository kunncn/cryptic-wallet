const ContainerComponent = ({ className = "", children }) => {
  return (
    <div className={`${className} mx-auto max-w-[1350px]`}>{children}</div>
  );
};

export default ContainerComponent;
