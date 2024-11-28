import { Grid2 } from "@mui/material";
import SideDrawer from "./SideDrawer";

const AdminAnalytics = () => {
  return (
    <Grid2 container size={12} gap={6} display={"flex"}>
        <SideDrawer />
        <Grid2 size={{lg: 8, sm: 8}}>
          Hello !! Please contact DADA for functionality implementation
          @ zodiacknight@gmail.com
        </Grid2>
    </Grid2>
  );
};

export default AdminAnalytics