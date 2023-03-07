const withLogging = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    console.log("Debug log: ", props);
    return <WrappedComponent {...props} />;
  };
};

export default withLogging;
