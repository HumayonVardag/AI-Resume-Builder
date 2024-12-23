import { Box, AppBar, Toolbar, Typography, Avatar, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useUser } from "@clerk/clerk-react";

const AdminHome = () => {
  const theme = useTheme();
  const { user } = useUser();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            AI Resume Builder
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              {user?.fullName || user?.username}
            </Typography>
            <Avatar 
              src={user?.imageUrl} 
              alt={user?.fullName || user?.username}
              sx={{ 
                width: 40, 
                height: 40,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 }, // Add padding top to account for AppBar
          minHeight: '100vh',
          backgroundColor: theme.palette.grey[50]
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminHome;