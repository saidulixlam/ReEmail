import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';

const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

function useMailAPI(mailType) {
  const [mailData, setMailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const endpoint = localStorage.getItem('endpoint');

  const dispatch = useDispatch();

  const fetchDataAndUpdateStore = async () => {
    setLoading(true);

    try {
      let apiUrl;
      if (mailType === 'sent') {
        apiUrl = `${url}/sent/${endpoint}.json`;
        console.log(apiUrl);
      } else if (mailType === 'inbox') {
        apiUrl = `${url}/inbox/${endpoint}.json`;
        console.log(apiUrl);
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const newDataWithKeys = {};

        Object.keys(responseData).forEach((key) => {
          newDataWithKeys[key] = responseData[key];
          newDataWithKeys[key].id = key;
        });

        const newArray = Object.values(newDataWithKeys);
        setMailData(newArray);

        if (mailType === 'sent') {
          dispatch(emailActions.setSentEmails(newArray));
        } else if (mailType === 'inbox') {
          dispatch(emailActions.setInboxEmails(newArray));
        }
      } else {
        console.error('Failed to retrieve data.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchDataAndUpdateStore();
    } else {
      setMailData([]);
    }
  }, [token, mailType]);

  return { mailData, loading, fetchDataAndUpdateStore };
}

export default useMailAPI;
