import axiosInstance from '../utils/axiosInstance';

export const createEvent = async (formData) => {
  const res = await axiosInstance.post('/api/admin/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getAllEvents = async () => {
  const res = await axiosInstance.get('/api/admin/events/all');
  return res.data;
};

export const updateEvent = async (id, formData) => {
  const res = await axiosInstance.put(`/api/admin/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axiosInstance.delete(`/api/admin/events/${id}`);
  return res.data;
};
