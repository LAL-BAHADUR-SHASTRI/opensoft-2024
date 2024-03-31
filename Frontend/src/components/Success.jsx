import { useLocation, useNavigate, useParams } from "react-router-dom";


const Success = (props) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const payment_id = searchParams.get('payment_id')
  
  const url = location.pathname;
  console.log(url.split('/')) 
  
  const user_id = localStorage.getItem('userId')

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BHOST}/payment/create`,{
      method: 'POST',
      headers: {},
      body: {
        user_id : user_id,
        payment_id: payment_id
      }
    })
      .then(response => response.json())
      .then(data => {
        navigate('/')
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        Toast.error('Error');
      });
  }, []);

  return (
    <div>
      <p style={{color: 'white'}} >ID: {payment_id}</p>
      <p style={{color: 'white'}} >type: {url.split('/')[1]}</p>
    </div>
  )
}

export default Success;
