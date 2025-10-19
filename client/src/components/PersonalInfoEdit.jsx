import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const PersonalInfoEdit = () => {
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    profileImage: ''
  });

  // Initialize form data when userdata changes
  useEffect(() => {
    if (userdata) {
      setFormData({
        username: userdata.username || '',
        email: userdata.email || '',
        firstName: userdata.firstName || '',
        lastName: userdata.lastName || '',
        bio: userdata.bio || '',
        profileImage: userdata.profileImage || ''
      });
    }
  }, [userdata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    try {
      const toBase64 = (f) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(f);
      });
      const dataUrl = await toBase64(file);
      setFormData(prev => ({ ...prev, profileImage: dataUrl }));
      toast.success('Image ready to upload');
    } catch (err) {
      console.error('Image load error', err);
      toast.error('Failed to read image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await response.json();
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        // The userdata will be updated through the auth context
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original userdata
    if (userdata) {
      setFormData({
        username: userdata.username || '',
        email: userdata.email || '',
        firstName: userdata.firstName || '',
        lastName: userdata.lastName || '',
        bio: userdata.bio || '',
        profileImage: userdata.profileImage || ''
      });
    }
    setIsEditing(false);
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      whileHover={{ y: -4 }}
      className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
        isDark 
          ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
          : 'from-blue-50 to-indigo-50 border border-light-border'
      }`}
    >
      {/* Animated border on hover */}
      <motion.div 
        className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
        whileHover={{ 
          width: "3px",
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
        whileHover={{ 
          height: "3px",
          transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-righteous tracking-wide ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Personal Information
        </h3>
        {!isEditing && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <FaEdit className="text-sm" />
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-primary text-2xl" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs hover:bg-primary-dark transition-colors"
              >
                <FaCamera />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Profile Picture
              </p>
              <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Click to upload a new image
              </p>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:border-primary' 
                  : 'bg-white border-light-border text-light-text-primary focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:border-primary' 
                  : 'bg-white border-light-border text-light-text-primary focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:border-primary' 
                  : 'bg-white border-light-border text-light-text-primary focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:border-primary' 
                  : 'bg-white border-light-border text-light-text-primary focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
          </div>

          {/* Bio */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us about yourself..."
              className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                isDark 
                  ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:border-primary' 
                  : 'bg-white border-light-border text-light-text-primary focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </motion.button>
            <motion.button
              type="button"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleCancel}
              className="px-4 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Profile Display */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {userdata?.profileImage ? (
                <img 
                  src={userdata.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-primary text-xl" />
              )}
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                {userdata?.firstName && userdata?.lastName 
                  ? `${userdata.firstName} ${userdata.lastName}`
                  : userdata?.username || 'User'
                }
              </h4>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {userdata?.email || 'No email provided'}
              </p>
            </div>
          </div>

          {/* User Info Display */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FaUser className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`} />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Username
                </p>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {userdata?.username || 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`} />
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Email
                </p>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {userdata?.email || 'Not set'}
                </p>
              </div>
            </div>

            {userdata?.bio && (
              <div>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Bio
                </p>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {userdata.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalInfoEdit;
