import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import SideDrawer from "./SideDrawer";
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Chip
} from "@mui/material";

const columns = [
  { field: "index", headerName: "Index", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { 
    field: "subscriptionPlan", 
    headerName: "Subscription Plan", 
    width: 150,
    renderCell: (params) => {
      const colors = {
        paid: {
          bg: 'rgba(46, 125, 50, 0.1)',
          text: '#2E7D32',
          border: 'rgba(46, 125, 50, 0.2)'
        },
        free: {
          bg: 'rgba(198, 40, 40, 0.1)',
          text: '#C62828',
          border: 'rgba(198, 40, 40, 0.2)'
        }
      };
      const style = colors[params.value] || colors.free;
      
      return (
        <Box>
        <Chip sx={{
          backgroundColor: style.text,
          color: style.black,
          border: `1px solid ${style.border}`,
          fontSize: '0.875rem',
          fontWeight: 200,
          textTransform: 'capitalize',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '5px'
        }}
        label={params.value}
        />
        </Box>
      );
    }
  },
  { 
    field: "status", 
    headerName: "Status", 
    width: 130,
    renderCell: (params) => {
      const colors = {
        active: {
          bg: 'rgba(21, 101, 192, 0.1)',
          text: '#1565C0',
          border: 'rgba(21, 101, 192, 0.2)'
        },
        inactive: {
          bg: 'rgba(198, 40, 40, 0.1)',
          text: '#C62828',
          border: 'rgba(198, 40, 40, 0.2)'
        }
      };
      const style = colors[params.value] || colors.inactive;

      return (
        <Box>
          <Chip sx={{
            backgroundColor: style.text,
            color: style.black,
            border: `1px solid ${style.border}`,
            fontSize: '0.875rem',
            fontWeight: 200,
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '5px'
          }}
          label={params.value}
          />
        </Box>
      );
    }
  },
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

function DataTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: 400, 
        width: '100%', 
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.grey[50],
            borderBottom: `2px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          }
        }}
        density={isMobile ? "compact" : "standard"}
      />
    </Paper>
  );
}

const AdminDashboard = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3 },
        backgroundColor: theme.palette.grey[100],
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            mt: 2,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Users Dashboard
        </Typography>
        <DataTable />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
