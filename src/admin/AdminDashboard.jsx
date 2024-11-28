import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import SideDrawer from "./SideDrawer";
import {
  Box,
  Divider,
  Drawer,
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Toolbar } from "react-simple-wysiwyg";
import { InboxIcon, List, MailIcon } from "lucide-react";

// 1. Users Table - Name - Last Name - email - Subsciption plan - Status

const columns = [
  { field: "index", headerName: "Index", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "subscriptionPlan", headerName: "Subsciption Plan", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

const rows = [
  {
    index: 1,
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 2,
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 3,
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 4,
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 5,
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 6,
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 7,
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 8,
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    subscriptionPlan: "paid",
    status: "active",
  },
  {
    index: 9,
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    subscriptionPlan: "paid",
    status: "active",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ width: '100%' }}
    />
  );
}

const AdminDashboard = () => {
  return (
    <Grid2 container size={12} gap={6} display={"flex"}>
        <SideDrawer />
        <Grid2 size={{lg: 8, sm: 8}}>
          <DataTable />
        </Grid2>
    </Grid2>
  );
};

export default AdminDashboard;
