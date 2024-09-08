import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../header/header';
import BASE_URL from '../../config';

const ProductUpload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [design, setDesign] = useState('');
  const [size, setSize] = useState('');
  const [keyHighlights, setKeyHighlights] = useState('');
  const [FabricMaterial, setFabricMaterial] = useState('');
  const [SleeveType, setSleeveType] = useState('');
  const [Fit, setFit] = useState('');
  const [brand, setBrand] = useState('');
  const [NeckStyle, setNeckStyle] = useState('');
  const [isoffer, setIsOffer] = useState(false);
  const [isfestival, setIsFestival] = useState(false);
  const [isspecial, setIsSpecial] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (event) => setImage(event.target.files[0]);
  const handleImage2Change = (event) => setImage2(event.target.files[0]);
  const handleImage3Change = (event) => setImage3(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('inventory', inventory);
    formData.append('sku', sku);
    formData.append('createdby', 1);
    formData.append('istrending', 1);
    formData.append('imageUrl', image);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('design', design);
    formData.append('size', size);
    formData.append('keyHighlights', keyHighlights);
    formData.append('FabricMaterial', FabricMaterial);
    formData.append('SleeveType', SleeveType);
    formData.append('Fit', Fit);
    formData.append('brand', brand);
    formData.append('NeckStyle', NeckStyle);
    formData.append('isoffer', isoffer ? '1' : '0');
    formData.append('isfestival', isfestival ? '1' : '0');
    formData.append('isspecial', isspecial ? '1' : '0');
    
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]); 
  }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Product uploaded successfully');
    } catch (error) {
      setMessage('Error uploading product');
      console.error('Error uploading product:', error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div style={{ background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h4" style={{ marginBottom: 20 }}>Upload Product</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Price" fullWidth type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Inventory Available" fullWidth type="number" value={inventory} onChange={(e) => setInventory(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="SKU" fullWidth value={sku} onChange={(e) => setSku(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />

            {/* Image Upload */}
            <input type="file" onChange={handleImageChange} style={{ marginBottom: 20 }} />
            <input type="file" onChange={handleImage2Change} style={{ marginBottom: 20 }} />
            <input type="file" onChange={handleImage3Change} style={{ marginBottom: 20 }} />

            {/* New Fields */}
            <TextField label="Design" fullWidth value={design} onChange={(e) => setDesign(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Size" fullWidth value={size} onChange={(e) => setSize(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Key Highlights" fullWidth value={keyHighlights} onChange={(e) => setKeyHighlights(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Fabric Material" fullWidth value={FabricMaterial} onChange={(e) => setFabricMaterial(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Sleeve Type" fullWidth value={SleeveType} onChange={(e) => setSleeveType(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Fit" fullWidth value={Fit} onChange={(e) => setFit(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Brand" fullWidth value={brand} onChange={(e) => setBrand(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            <TextField label="Neck Style" fullWidth value={NeckStyle} onChange={(e) => setNeckStyle(e.target.value)} style={{ marginBottom: 20 }} InputLabelProps={{ shrink: true }} />
            
            {/* Offer, Festival, Special */}
            <TextField label="Offer" fullWidth type="checkbox" checked={isoffer} onChange={(e) => setIsOffer(e.target.checked)} style={{ marginBottom: 20 }} />
            <TextField label="Festival" fullWidth type="checkbox" checked={isfestival} onChange={(e) => setIsFestival(e.target.checked)} style={{ marginBottom: 20 }} />
            <TextField label="Special" fullWidth type="checkbox" checked={isspecial} onChange={(e) => setIsSpecial(e.target.checked)} style={{ marginBottom: 20 }} />

            <Button type="submit" variant="contained" color="primary" style={{ marginBottom: 20, marginRight: 10 }}>Upload</Button>
          </form>
          {message && <Typography>{message}</Typography>}
        </Paper>
      </div>
    </>
  );
};

export default ProductUpload;
