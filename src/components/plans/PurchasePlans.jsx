import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from "@clerk/clerk-react";

const PurchasePlans = () => {
  const { user } = useUser();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    fetchPlans();
    checkActiveSubscription();
  }, []);

  const checkActiveSubscription = async () => {
    try {
      const response = await GlobalApi.checkActiveSubscription({
        data: {
          userEmail: user.primaryEmailAddress.emailAddress
        }
      });
      setHasActiveSubscription(response.data.hasActiveSubscription);
      if (response.data.hasActiveSubscription) {
        toast.info("You already have an active subscription!");
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

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
      if (hasActiveSubscription) {
        toast.error("You already have an active subscription!");
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
      
      // Redirect to Stripe checkout
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
        Choose Your Plan
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Select the perfect plan for your needs
      </Typography>

      {hasActiveSubscription && (
        <Box sx={{ mb: 4, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
          <Typography align="center" color="info.dark">
            You currently have an active subscription. You can manage your subscription from your account settings.
          </Typography>
        </Box>
      )}

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
                ...(selectedPlan === plan.id && {
                  border: (theme) => `2px solid ${theme.palette.primary.main}`,
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
                  disabled={processingPayment || hasActiveSubscription}
                  sx={{
                    py: 1.5,
                    position: 'relative',
                  }}
                >
                  {processingPayment && selectedPlan === plan.id ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : hasActiveSubscription ? (
                    'Already Subscribed'
                  ) : (
                    'Purchase Plan'
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PurchasePlans; 