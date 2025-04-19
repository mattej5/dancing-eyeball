import { useEffect, useState } from 'react';
import EntertainerList from '../components/EntertainerList';
import { EntertainerBookingSummary } from '../types/entertainer';
import './Entertainers.css';
import { fetchEntertainerBookings } from '../api';
import { useNavigate } from 'react-router-dom';

const Entertainers = () => {
    const [entertainers, setEntertainers] = useState<EntertainerBookingSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadEntertainers = async () => {
        try {
          const data = await fetchEntertainerBookings();
          setEntertainers(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch entertainers.");
        } finally {
          setLoading(false);
        }
      };
  
      loadEntertainers();
    }, []);
  
    if (loading) return <p className="text-center">Loading entertainers...</p>;
    if (error) return <p className="text-danger text-center">Error: {error}</p>;

    return (
        <div className="entertainers-page d-flex flex-column min-vh-100">
          <div className="flex-grow-1">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="d-flex justify-content-center">
                    <EntertainerList entertainers={entertainers} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );      
};

export default Entertainers;
