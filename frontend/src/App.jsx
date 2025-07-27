import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Snackbar,
  Alert,
  Box
} from '@mui/material';

const initialForm = {
  itemName: '',
  description: '',
  location: '',
  contactInfo: ''
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await axios.get('http://localhost:5000/api/lost-items');
      setItems(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to fetch items', severity: 'error' });
    }
    setFetching(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return (
      form.itemName.trim() &&
      form.description.trim() &&
      form.location.trim() &&
      form.contactInfo.trim()
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/lost-items', form);
      setSnackbar({ open: true, message: 'Item reported successfully!', severity: 'success' });
      setForm(initialForm);
      fetchItems();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to report item.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Lost &amp; Found
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 500,
          mx: 'auto',
          mb: 4,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Report Lost Item
        </Typography>
        <TextField
          label="Item Name"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          multiline
          minRows={2}
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contact Info"
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Report'}
        </Button>
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        Lost Items
      </Typography>
      {fetching ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {items.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No lost items found.
              </Typography>
            </Grid>
          )}
          {items.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Location:</b> {item.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Contact:</b> {item.contactInfo}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                  <Typography variant="caption" color="text.disabled">
                    Reported on {new Date(item.dateLost || item.createdAt || Date.now()).toLocaleString()}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
