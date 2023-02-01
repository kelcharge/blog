import { ActionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { SocialsProvider } from "remix-auth-socials";

export const loader = ({ request }: ActionArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/blog",
    failureRedirect: "/",
  });
};
