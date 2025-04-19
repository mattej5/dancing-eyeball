import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEntertainer, deleteEntertainer, fetchEntertainerById } from '../api';
import { EntertainerCreateDto } from '../types/entertainer';
import './AddEntertainer.css';
import { useParams } from 'react-router-dom';
import { fetchEntertainerBookings, updateEntertainer } from '../api';

const initialState: EntertainerCreateDto = {
  entStageName: '',
  entSsn: '',
  entStreetAddress: '',
  entCity: '',
  entState: '',
  entZipCode: '',
  entPhoneNumber: '',
  entWebPage: '',
  entEmailAddress: '',
  dateEntered: new Date().toISOString().split('T')[0], // yyyy-mm-dd
};

const AddEntertainer = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadExisting = async () => {
      if (!isEditMode) return;
  
      try {
        const data = await fetchEntertainerById(parseInt(id!));
        setFormData(data);
      } catch (err: any) {
        setError('Failed to load entertainer data');
      }
    };
  
    loadExisting();
  }, [id]);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await updateEntertainer(parseInt(id!), formData);
      } else {
        await addEntertainer(formData);
      }
      navigate('/entertainers');
    } catch (err: any) {
      setError(err.message || 'Failed to save entertainer');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!id) return;
  
    const confirmed = confirm('Are you sure you want to delete this entertainer? This cannot be undone.');
    if (!confirmed) return;
  
    try {
      await deleteEntertainer(parseInt(id));
      navigate('/entertainers');
    } catch (err: any) {
      setError('Failed to delete entertainer.');
    }
  };
  

  return (
    <div className="add-entertainer-page">
        <div className="add-entertainer-card card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">
            {isEditMode ? 'Edit Entertainer' : 'Add New Entertainer'}
        </h2>


            <form onSubmit={handleSubmit}>
            {Object.entries(initialState).map(([key]) => (
                <div className="form-row d-flex align-items-center gap-4 mb-5" key={key}>
                    <label htmlFor={key} className="form-label m-0 flex-shrink-0" style={{ minWidth: '130px' }}>
                    {key.replace(/ent|([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                    type={key === 'dateEntered' ? 'date' : 'text'}
                    id={key}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
              
            ))}

            {error && <div className="text-danger text-center mb-3">{error}</div>}

            <div className="d-flex justify-content-center mt-4 button-row">
                <button className="btn btn-primary px-4" type="submit" disabled={submitting}>
                    {submitting
                    ? 'Submitting...'
                    : isEditMode
                        ? 'Update Entertainer'
                        : 'Add Entertainer'}
                </button>

                {isEditMode && (
                    <button
                    type="button"
                    className="btn btn-danger px-3"
                    onClick={handleDelete}
                    >
                    Delete
                    </button>
                )}
            </div>
            </form>
        </div>
    </div>
  );  
};

export default AddEntertainer;
