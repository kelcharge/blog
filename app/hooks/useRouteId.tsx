import { useState, useEffect } from "react";
import { useMatches, RouteMatch } from "@remix-run/react";

const useRouteId = () => {
  const [route, setRoute] = useState<RouteMatch>();
  const matches = useMatches();

  useEffect(() => {
    setRoute(matches[matches.length - 1]);
  }, []);

  return route ? route.id : "";
};

export default useRouteId;
