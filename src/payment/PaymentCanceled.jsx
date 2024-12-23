import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { toast } from 'sonner';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show canceled message
    toast.error('Payment was canceled');
    
    // Redirect to dashboard after 3 seconds
    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-4">Your payment was canceled.</p>
        <p className="text-gray-500">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default PaymentCanceled; 