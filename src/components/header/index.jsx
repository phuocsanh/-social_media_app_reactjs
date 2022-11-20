import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/HomeSharp";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import styles from "./header.module.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";

import { getDataAPI } from "../../utils/fetchData";
import { display } from "@mui/system";
const settings = ["Drak mode"];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function ResponsiveAppBar() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state?.authReducer?.auth);
  // console.log("🚀 ~ file: index.jsx ~ line 70 ~ ResponsiveAppBar ~ auth", auth);
  const [users, setUsers] = React.useState([]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickSettings = (type) => {
    handleCloseNavMenu();
    if (type === "discover") {
    }
  };
  const handleClickUser = (type) => {
    handleCloseUserMenu();
    if (type === "Logout") {
      dispatch(logout());
    }
  };
  useEffect(() => {
    let delayDebounceFn;
    if (search) {
      delayDebounceFn = setTimeout(() => {
        getDataAPI(`search?userName=${search}`, auth?.token)
          .then((res) => setUsers(res.data.user))
          .catch((error) => {
            alert("Error: " + error);
          });
      }, [2000]);
    }
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search, auth?.token, dispatch]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                fontSize: "2rem",
              }}
            />
          </Link>

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
              <div style={{ padding: "0px 10px" }}>
                <Link
                  onClick={handleCloseNavMenu}
                  to="/discover"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    sx={{ height: 20, color: "black" }}
                    textAlign="center"
                  >
                    {"Discover"}
                  </Typography>
                </Link>
              </div>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              onClick={handleCloseNavMenu}
              to="/discover"
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{ height: 20, color: "white" }}
                textAlign="center"
              >
                {"Discover"}
              </Typography>
            </Link>
          </Box>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/message"
          >
            <IconButton
              style={{ marginLeft: -10 }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/notification"
          >
            <IconButton
              style={{ marginLeft: -10, marginRight: 10 }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase().replace(/ /g, ""));
              }}
            />

            <div
              className={styles["users-search"]}
              style={
                users.length === 0 || search.length === 0
                  ? { display: "none" }
                  : {}
              }
            >
              {users?.map((user, index) => {
                return (
                  <Link
                    to={{
                      pathname: "/profile",
                      state: { fromDashboard: true, id: user._id },
                    }}
                    onClick={() => {
                      setSearch("");
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.5rem",
                        }}
                        src={user?.avatar}
                      />
                      <span style={{ color: "blue" }}>{user?.userName}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="avatar"
                src={
                  auth?.user?.avatar
                    ? auth?.user?.avatar
                    : "/static/images/avatar/2.jpg"
                }
              />
            </IconButton>

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
              onClose={handleCloseUserMenu}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={{
                  pathname: `/profile`,
                  state: { fromDashboard: true, id: "haha" },
                }}
              >
                <MenuItem>
                  <Typography textAlign="center">{"Profile"}</Typography>
                </MenuItem>
              </Link>

              <MenuItem onClick={() => handleClickUser("Logout")}>
                <Typography textAlign="center">{"Logout"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
