import Header from "@/components/custom/Header"
import { Grid2 } from "@mui/material"
import { Outlet } from "react-router-dom"

const AdminHome = () => {
  return (
    <Grid2 container size={12} spacing={2}>
      <Grid2 size={12} spacing={2}>
        <Header />
      </Grid2>
      <Grid2 size={12}>
        <Outlet />
      </Grid2>
    </Grid2>
    
  )
}

export default AdminHome