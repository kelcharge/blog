import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  useOutletContext,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { authenticator } from "./utils/auth.server";
import ButtonAppBar from "./components/ButtonAppBar";

import styles from "./styles/app.css";
import globalStyles from "./styles/globals.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Blog Dot Decamp Dot IO",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStyles },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return user;
};

export default function App() {
  const user = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="mx-auto lg:max-w-[65vw]">
        <ButtonAppBar user={user} />
        <Outlet context={user} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const useUser = () => {
  return useOutletContext<any>();
};
