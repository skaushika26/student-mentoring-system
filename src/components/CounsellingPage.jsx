import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CounsellingPage() {
  const mentorId = localStorage.getItem('mentorId') || 'testMentorId'; // Change as per your auth logic

  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newPlace, setNewPlace] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch existing counselling data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/counselling/${mentorId}`);
        if (res.data && res.data.dates) {
          setDates(res.data.dates);
        } else {
          setDates([]);
        }
      } catch (err) {
        console.error('Error fetching counselling data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [mentorId]);

  // Save all dates back to backend
  const saveDates = async (updatedDates) => {
    try {
      await axios.post('/api/counselling/set', {
        mentorId,
        dates: updatedDates,
      });
      setDates(updatedDates);
    } catch (err) {
      console.error('Error saving counselling dates:', err);
    }
  };

  // Add new counselling date + place
  const addNewDate = () => {
    if (!newDate || !newPlace) {
      alert('Please fill in both Date and Place');
      return;
    }
    const updatedDates = [...dates, { date: newDate, place: newPlace, description: '' }];
    saveDates(updatedDates);
    setNewDate('');
    setNewPlace('');
  };

  // Update opinion description for a specific date index
  const updateOpinion = async (index, description) => {
    try {
      await axios.post('/api/counselling/add-opinion', {
        mentorId,
        index,
        description,
      });
      // Update locally for better UX
      const updatedDates = [...dates];
      updatedDates[index].description = description;
      setDates(updatedDates);
    } catch (err) {
      console.error('Error updating opinion:', err);
    }
  };

  // Delete opinion for a specific date index (clear description)
  const deleteOpinion = async (index) => {
    try {
      await axios.post('/api/counselling/delete-opinion', {
        mentorId,
        index,
      });
      // Update locally
      const updatedDates = [...dates];
      updatedDates[index].description = '';
      setDates(updatedDates);
    } catch (err) {
      console.error('Error deleting opinion:', err);
    }
  };

  if (loading) return <div>Loading counselling data...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Counselling Sessions</h2>

      {/* Add new date */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Add New Counselling Date</h3>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border p-2 rounded mr-4"
        />
        <input
          type="text"
          placeholder="Place"
          value={newPlace}
          onChange={(e) => setNewPlace(e.target.value)}
          className="border p-2 rounded mr-4"
        />
        <button
          onClick={addNewDate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* List existing counselling dates */}
      {dates.length === 0 && <p>No counselling sessions found. Add one above!</p>}

      {dates.map((item, idx) => (
        <div key={idx} className="mb-6 border rounded p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <div>
              <strong>Date:</strong> {item.date} <br />
              <strong>Place:</strong> {item.place}
            </div>
          </div>

          <textarea
            placeholder="Write your opinion here..."
            value={item.description || ''}
            onChange={(e) => updateOpinion(idx, e.target.value)}
            className="w-full border rounded p-2 mb-2 min-h-[80px]"
          />

          {item.description && (
            <button
              onClick={() => deleteOpinion(idx)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete Opinion
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CounsellingPage;
