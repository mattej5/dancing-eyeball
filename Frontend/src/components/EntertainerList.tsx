import { useNavigate } from 'react-router-dom';
import { EntertainerBookingSummary } from '../types/entertainer';
import './EntertainerList.css';

interface Props {
  entertainers: EntertainerBookingSummary[];
}

const EntertainerList = ({ entertainers }: Props) => {
  const navigate = useNavigate();
  console.log('Entertainer data:', entertainers);

  return (
    <div className="entertainer-wrapper mx-auto">
      <div className="entertainer-header d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Available Entertainers</h2>
        <button
            className="btn btn-primary"
            onClick={() => navigate('/entertainers/add')}
        >
            Add Entertainer
        </button>
      </div>


      <div className="entertainer-grid-header">
        <div>Stage Name</div>
        <div>Times Booked</div>
        <div>Most Recent</div>
        <div></div>
      </div>

      {entertainers.map((ent) => (
        <div className="entertainer-grid-row" key={ent.entertainerId}>
          <div>{ent.stageName}</div>
          <div>{ent.timesBooked}</div>
          <div>{ent.mostRecentBookingEndDate ?? 'N/A'}</div>
          <div className="text-end">
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => navigate(`/entertainers/${ent.entertainerId}`)}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntertainerList;
