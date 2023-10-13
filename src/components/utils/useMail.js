import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';

const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

function useMailAPI() {
  const [mailData, setMailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const endpoint = localStorage.getItem('endpoint'); // Moved endpoint inside the hook

  // Assuming you have access to a dispatch function for Redux actions
  const dispatch = useDispatch();

  const fetchDataAndUpdateStore = async () => {
    setLoading(true); // Set loading to true when fetching data

    try {
      const response = await fetch(`${url}/sent/${endpoint}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const newDataWithKeys = {};

        Object.keys(responseData).forEach((key) => {
          newDataWithKeys[key] = responseData[key];
          newDataWithKeys[key].id = key;
        });

        const newArray = Object.values(newDataWithKeys);
        setMailData(newArray);
        dispatch(emailActions.setEmails(newArray));
      } else {
        console.error('Failed to retrieve data.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  }

  useEffect(() => {
    if (token) {
      fetchDataAndUpdateStore();
    } else {
      setMailData([]); // Clear the previous user's data
    }
  }, [token]); // Include token in the dependency array

  return { mailData, loading, fetchDataAndUpdateStore };
}

export default useMailAPI;
