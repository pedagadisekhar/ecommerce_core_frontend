import React, { useState } from 'react';
import axios from "axios";
import { styled } from '@mui/system';
import { Button, TextareaAutosize } from '@mui/material';

const UploadContainer = styled('div')({
  maxWidth: 400,
  margin: 'auto',
  padding: '8px',
});

const FileInput = styled('input')({
  marginBottom: '8px',
  width: '100%',
  padding: '4px',
});

const UploadButton = styled(Button)({
  padding: '4px 8px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
});

function UploadData() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
  var userid = localStorage.getItem('userid');
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('notes', notes);
    formData.append('userid', userid);


    try {
      var token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/Uploaddata/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <UploadContainer>
      <FileInput type="file" onChange={handleFileChange} />
      <TextareaAutosize
        value={notes}
        onChange={handleNotesChange}
        placeholder="Enter notes"
        style={{ marginBottom: '8px', width: '100%', padding: '4px' }}
        minRows={3}
      />
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
    </UploadContainer>
  );
}

export default UploadData;
