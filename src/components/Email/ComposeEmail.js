import React, { useState, useEffect } from 'react';
import { Button, Modal, Container } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';

const ComposeEmail = (props) => {

    const dispatch = useDispatch();
    const [mailBody, setMailBody] = useState("");

    const { email, subject, body } = useSelector((state) => state.email);

    // const token = localStorage.getItem('token');
    const senderEmail = localStorage.getItem('email');
    const endpoint = localStorage.getItem('endpoint');

    const handleEmailChange = (e) => {
        dispatch(emailActions.setEmail(e.target.value));
    };

    const handleSubjectChange = (e) => {
        dispatch(emailActions.setEmailSubject(e.target.value));
    };

    const handleEditorStateChange = (editorState) => {

        dispatch(emailActions.setEmailBody(editorState));
    };
    //so we will need to change the editor content into plain content 
    useEffect(() => {

        setMailBody(body.getCurrentContent().getPlainText());
    }, [body])
    const url = 'https://remail-341c0-default-rtdb.firebaseio.com';
    const sendEmail = async () => {
        // const url='https://remail-341c0-default-rtdb.firebaseio.com';
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
        };
        const formattedDate = formatDate(new Date());
        const sentEmailData = {
            to: email,
            subject: subject,
            body: mailBody,
            time: formattedDate,
            read: false,
            recieve: false,
            send: true,
            sender: senderEmail
        }

        try {
            const response = await fetch(`${url}/sent/${endpoint}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sentEmailData),
            });

            if (response.ok) {
                console.log('Email sent successfully.');
                dispatch(emailActions.resetEmailComposition());
               
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
        props.handleClose();
    };


    const deleteEmail = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this email?');
        if (confirmDelete) {
            // Implement email deletion logic here
            console.log('Email deleted.');
        }
        // Close the modal
        props.handleClose();
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg" className='mt-5 py-5'>
            <Modal.Header closeButton>
                <Modal.Title>Compose Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <input
                        type='email'
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='To Email'
                        className="form-control my-2"
                    />
                    <input
                        type='text'
                        value={subject}
                        onChange={handleSubjectChange}
                        placeholder='Subject'
                        className="form-control my-2"
                    />
                    <Editor
                        size='lg'
                        editorState={body}
                        onEditorStateChange={handleEditorStateChange}
                        placeholder='Write your Email here'
                    />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteEmail}>Delete</Button>
                <Button onClick={sendEmail} variant="primary">Send Email</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ComposeEmail;