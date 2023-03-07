import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials';

const handleSocialAuthCallback = async ({ profile }: any) => {
    return profile;
}


export const authenticator = new Authenticator(sessionStorage);


authenticator.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile"],
    callbackURL: `${process.env.AUTH_DOMAIN}/auth/${SocialsProvider.GOOGLE}/callback`
},
handleSocialAuthCallback));