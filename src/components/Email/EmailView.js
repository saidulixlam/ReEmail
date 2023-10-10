import React from 'react';
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const EmailView = (props) => {
  const location = useLocation();
  const emailData = location.state.emailData; // Access the email data from the location state
  const key=emailData.id;
  const endpoint=localStorage.getItem('endpoint');
  console.log(key);
  const history = useHistory();
  const url='https://remail-341c0-default-rtdb.firebaseio.com';
  const updatedData={...emailData,read:true};
  console.log(updatedData);

  useEffect(()=>{
    async function update(){
      try{
        const response = await fetch(`${url}/sent/${endpoint}/${key}.json`, {
          method: 'PUT', // or 'PATCH' depending on your API's requirements
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        
        if (response.ok) {
          // The item was successfully updated
          console.log(`Item at ${endpoint} updated successfully.`);
        } else {
          // Handle the error here
          console.error(`Error updating item at ${endpoint}:`, response.status, response.statusText);
        }
      }catch(err){
        console.log('err',err);
      }
    }
    update();
  },[]);
  // Function to handle closing the modal
  const handleCloseModal = () => {
    // You can use the history object to navigate back to the inbox or any other route
    history.goBack(); // This will navigate back to the previous route (inbox)
    props.onClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Email Subject: {emailData.subject}</h2>
        <button className="btn btn-danger" onClick={handleCloseModal}>
          x
        </button>
      </div>
      <p>To: {emailData.to}</p>
      <p>Body: {emailData.body}</p>
      <p>Time: {emailData.time}</p>
      {/* Add more content as needed */}
    </div>
  );
};

export default EmailView;
