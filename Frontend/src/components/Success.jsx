import { useLocation, useParams } from "react-router-dom";


const Success = (props) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const payment_id = searchParams.get('payment_id')
  
  const url = location.pathname;
  console.log(url.split('/')) 

  return (
    <div>
      <p style={{color: 'white'}} >ID: {payment_id}</p>
      <p style={{color: 'white'}} >type: {url.split('/')[1]}</p>
    </div>
  )
}

export default Success;
