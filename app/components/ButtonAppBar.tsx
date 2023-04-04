import * as Remix from "@remix-run/react";

/*** Providers ***/
import { SocialsProvider } from "remix-auth-socials";

/*** Components ***/
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const ButtonAppBar = ({ user }: { user: Record<string, any> }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#0f58d6" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component={Remix.Link}
              to="/"
              sx={{ px: 2 }}
            >
              Home
            </Typography>
          </Box>
          {user && (
            <Typography variant="h6" sx={{ pr: 2 }}>
              Hello {user.name.givenName}!
            </Typography>
          )}
          <Typography
            variant="h6"
            component={Remix.Link}
            to={user ? `/auth/logout` : `/auth/${SocialsProvider.GOOGLE}`}
          >
            {user ? "Logout" : "Login"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
