import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Check, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from "@clerk/clerk-react";

const PurchasePlans = () => {
  const { user } = useUser();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const checkActiveSubscription = useCallback(async () => {
    if(!user) return;

    try {
      const response = await GlobalApi.checkActiveSubscription({        
        userEmail: user.primaryEmailAddress.emailAddress
      });
      if (response.data.hasActiveSubscription) {
        setActiveSubscription(response.data.subscription);
      } else setActiveSubscription(null)
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  }, [user]);

  useEffect(() => {
    if(user) {
      fetchPlans();   
      checkActiveSubscription();
    }
  }, [user, checkActiveSubscription]);

  const fetchPlans = async () => {
    try {
      const response = await GlobalApi.getAdminPlans();
      setPlans(response.data.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (planId) => {
    try {
      if (activeSubscription) {
        toast.error("Please cancel your current subscription first");
        return;
      }

      setProcessingPayment(true);
      setSelectedPlan(planId);

      const response = await GlobalApi.createSubscription({
        data: {
          userEmail: user.primaryEmailAddress.emailAddress,
          planId: planId,
        }
      });
      
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to initiate payment');
    } finally {
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await GlobalApi.cancelSubscription(activeSubscription.id);
      toast.success('Subscription cancelled successfully');
      setShowCancelDialog(false);
      checkActiveSubscription(); // Refresh subscription status
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Subscription Plans
      </Typography>

      {/* Active Subscription Card */}
      {activeSubscription && (
        <Box sx={{ mb: 6 }}>
          <Card sx={{ 
            backgroundColor: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.contrastText,
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Subscription
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body1">
                    Plan: {activeSubscription.metadata?.plan_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body1">
                    Amount: ${activeSubscription.amount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body1">
                    Valid until: {new Date(activeSubscription.end_date).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="warning"
                  onClick={() => setShowCancelDialog(true)}
                >
                  Cancel Subscription
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        {activeSubscription ? 'Available Plans for Upgrade' : 'Select the perfect plan for your needs'}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
                ...(activeSubscription?.admin_plan === plan.id && {
                  border: (theme) => `2px solid ${theme.palette.success.main}`,
                }),
              }}
            >
              {plan.attributes.isPopular && (
                <Chip
                  label="Popular"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                  }}
                />
              )}
              {activeSubscription?.admin_plan === plan.id && (
                <Chip
                  label="Current Plan"
                  color="success"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {plan.attributes.title}
                </Typography>
                <Typography variant="h4" color="primary" align="center" sx={{ my: 2 }}>
                  ${plan.attributes.price}
                </Typography>
                <Box sx={{ mt: 4 }}>
                  {plan.attributes.features?.list?.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        gap: 2,
                      }}
                    >
                      <Check size={20} color="green" />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => handlePurchase(plan.id)}
                  disabled={processingPayment || (activeSubscription?.admin_plan === plan.id)}
                  sx={{
                    py: 1.5,
                    position: 'relative',
                  }}
                >
                  {processingPayment && selectedPlan === plan.id ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : activeSubscription?.admin_plan === plan.id ? (
                    'Current Plan'
                  ) : (
                    activeSubscription ? 'Switch to this Plan' : 'Purchase Plan'
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cancel Subscription Dialog */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mt: 2 }}>
            <AlertTitle>Warning</AlertTitle>
            Are you sure you want to cancel your subscription? This action cannot be undone.
          </Alert>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your subscription will remain active until the end of your current billing period.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>
            Keep Subscription
          </Button>
          <Button 
            onClick={handleCancelSubscription} 
            color="error" 
            variant="contained"
            startIcon={<AlertTriangle size={16} />}
          >
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PurchasePlans; 