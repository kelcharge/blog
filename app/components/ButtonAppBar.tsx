import * as Remix from "@remix-run/react";

/*** Providers ***/
import { SocialsProvider } from "remix-auth-socials";

/*** Components ***/
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const ButtonAppBar = ({ user }: { user: Record<string, any> }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#334155" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component={Remix.Link}
              to="/"
              sx={{ px: 2 }}
            >
              Home
            </Typography>
            <Typography variant="h6" component={Remix.Link} to="/blog">
              Blogs
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
