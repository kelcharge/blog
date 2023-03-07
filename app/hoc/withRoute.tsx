import { useMatches } from "react-router-dom";

const withRoute = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const matches = useMatches();
    return <Component {...props} route={matches[matches.length - 1]} />;
  };
};

export default withRoute;
