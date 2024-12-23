import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import GlobalApi from "./../../service/GlobalApi";
import { useNavigate } from "react-router-dom";

const AdminPlans = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    getAllAdminPlans();
  }, []);

  const getAllAdminPlans = async () => {
    try {
      const response = await GlobalApi.getAdminPlans();
      const formattedPlans = response.data.data.map(plan => ({
        id: plan.id,
        ...plan.attributes,
        features: plan.attributes.features?.list || []
      }));
      setPlans(formattedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    // You can implement edit functionality here
  };

  const handleDeletePlan = async (planId) => {
    // Implement delete functionality
    try {
      setLoading(true);
      // await GlobalApi.deletePlan(planId);
      await getAllAdminPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewPlan = () => {
    navigate("/admin/plans/create");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)', // Subtract AppBar height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Left side - Plan Creation Form */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 2,
              position: 'sticky',
              top: '80px', // Account for AppBar height
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Create New Plan
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleAddNewPlan}
            >
              Add New Plan
            </Button>
            {selectedPlan && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Selected Plan Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedPlan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${selectedPlan.price}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right side - Plans List */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Available Plans
            </Typography>
            {plans.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No Plans Available! Please create one.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {plans.map((plan) => (
                  <Grid item xs={12} sm={6} key={plan.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          boxShadow: theme.shadows[4],
                        },
                        border: selectedPlan?.id === plan.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {plan.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          gutterBottom
                        >
                          ${plan.price}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          {plan.features.map((feature, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              • {feature}
                            </Typography>
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditPlan(plan)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          color="error"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPlans;
