import React, { useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

const AmeerTheme = createTheme({
  palette: {
    primary: {
      main: "#26a69a",
    },
  },
});

const settings = ["Myvacations", "Logout"];
const pages = ["Home", "About"];
export default function Header() {
  // The material UI
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = React.useCallback((e: any) => {
    setAnchorElNav(e.currentTarget);
  }, []);

  const handleOpenUserMenu = React.useCallback((e: any) => {
    setAnchorElUser(e.currentTarget);
  }, []);

  const handleCloseNavMenu = React.useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleUserMenuClick = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  // -------routing---------
  const navigate = useNavigate();
  const travelTo = (dest: string) => {
    navigate("/" + dest);
  };

  const logout = async () => {
    const response = await fetch("http://localhost:4000/users/logout", {
      method: "delete",
      credentials: "include",
    });
    const data = await response.json();
    if (data.err) {
      alert(data.err);
    } else {
      localStorage.clear();
      navigate("/login");
    }
    console.log(data);
  };

  return (
    <div className="header">
      <ThemeProvider theme={AmeerTheme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  cursor: "pointer",
                  display: { xs: "none", md: "flex" },
                }}
                onClick={() => travelTo("")}
              >
                Ameer Emran
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        travelTo(page);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                Ameer Emran
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => travelTo(page)}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                Hello{" "}
                {
                  JSON.parse(
                    localStorage.getItem("user") || '{ "firstName": "" }'
                  ).firstName
                }
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Uemy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleUserMenuClick}
                >
                  {localStorage.getItem("user") ? (
                    settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleUserMenuClick();
                          if (setting === "Logout") {
                            logout();
                          } else {
                            travelTo(setting);
                          }
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  ) : (
                    <div>
                      <MenuItem onClick={handleUserMenuClick}>
                        <Typography onClick={() => travelTo("login")}>
                          Login{" "}
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleUserMenuClick}>
                        <Typography onClick={() => travelTo("register")}>
                          Register{" "}
                        </Typography>
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
