// Toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  },
};

export default Toast;