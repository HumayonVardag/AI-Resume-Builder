import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react';

const PaymentSuccess = () => {
  const user = useUser()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log('------- searchParams ----- ', searchParams)
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) {
          toast.error('Invalid session');
          navigate('/dashboard');
          return;
        }

        // Verify the payment with your Strapi backend
        const response = await GlobalApi.confirmPayment({
          params: { sessionId: sessionId, userEmail: user?.primaryEmailAddress.emailAddress }
        });

        if (response.data.success) {
          toast.success('Payment completed successfully!');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          toast.error('Payment verification failed');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Payment verification failed');
        navigate('/dashboard');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h1>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
        <p className="text-gray-500">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess; 