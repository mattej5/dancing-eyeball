import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/entertainers');
  };

  return (
    <div className="home-hero d-flex justify-content-center align-items-center">
      <div className="home-content text-center text-white p-5 rounded">
        <h1 className="display-4 fw-bold">Welcome to Jones Entertainment Agency</h1>
        <p className="lead mt-3">
          Bringing unforgettable performances to your stage. From jazz to country, solos to full ensembles — we have the right talent for your next event.
        </p>

        <div className="cta-button mt-4" onClick={handleClick}>
          View Entertainers <span className="arrow ms-2">→</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
