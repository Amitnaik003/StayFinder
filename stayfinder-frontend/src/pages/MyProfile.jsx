import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/users/me'); // adjust endpoint if your API uses /auth/me or /profile
        if (mounted) {
          const data = res?.data ?? res;
          setProfile(data);
          setForm({
            name: data?.name ?? '',
            email: data?.email ?? '',
            phone: data?.phone ?? ''
          });
        }
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || err.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const saveProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put('/users/me', form); // adjust if different
      setProfile(res?.data ?? res);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      if (axios.defaults && axios.defaults.headers) delete axios.defaults.headers.common['Authorization'];
    } catch (_) {}
    navigate('/login');
  };

  if (loading) return <div className="p-4">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!profile) return <div className="p-4">No profile found.</div>;

  return (
    <div className="p-4 max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">Name</label>
        {editing ? (
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" />
        ) : (
          <div className="py-2">{profile.name ?? '—'}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">Email</label>
        <div className="py-2">{profile.email ?? '—'}</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">Phone</label>
        {editing ? (
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" />
        ) : (
          <div className="py-2">{profile.phone ?? '—'}</div>
        )}
      </div>

      {editing ? (
        <div className="flex gap-2">
          <button onClick={saveProfile} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button onClick={() => { setEditing(false); setForm({ name: profile.name, phone: profile.phone, email: profile.email }); }} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-green-600 text-white rounded">Edit Profile</button>
          <button onClick={handleLogout} className="px-4 py-2 border rounded">Logout</button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;