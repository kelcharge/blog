import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { SocialsProvider } from "remix-auth-socials";

export const loader = async ({ request }: LoaderArgs) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
};
