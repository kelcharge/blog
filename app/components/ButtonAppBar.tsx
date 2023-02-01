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

const ButtonAppBar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
          <Typography
            variant="h6"
            component={Remix.Link}
            to={
              isAuthenticated
                ? `/auth/logout`
                : `/auth/${SocialsProvider.GOOGLE}`
            }
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
