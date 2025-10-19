import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLoading } from "../components/loadingContext";
import { useTheme } from "../context/ThemeContext";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrashAlt, FaUserShield, FaUser, FaUsers, FaCrown } from "react-icons/fa";
import { MdSearch, MdEmail, MdPhone, MdSchedule, MdAdminPanelSettings } from "react-icons/md";

function AdminUsers() {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/admin/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          fetchUsers();
        } else {
          toast.error("User not deleted!");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the user");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered users
  const getSortedUsers = () => {
    let filteredUsers = [...users];
    
    // Apply search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredUsers;
  };

  const sortedUsers = getSortedUsers();

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="text-primary" />;
    if (sortConfig.direction === 'descending') return <FaSortDown className="text-primary" />;
    return <FaSort className="text-gray-400" />;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with grid pattern */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              User Management
            </h1>
            <div className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}></div>
          </div>
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            Manage users, roles, and permissions with comprehensive administrative controls.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          <div className={`relative p-6 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl ${
            isDark 
              ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
              : 'from-blue-50 to-indigo-50 border border-light-border'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                  <FaUsers className="text-primary text-xl" />
                </div>
                <div>
                  <h2 className={`text-xl font-righteous ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    User Management
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Search and manage user accounts
                  </p>
                </div>
              </div>
              
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-white text-light-text-primary border-light-border'
                  } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
                />
                <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: FaUsers,
              label: "Total Users",
              value: users.length,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10"
            },
            {
              icon: FaCrown,
              label: "Administrators",
              value: users.filter(user => user.isAdmin).length,
              color: "text-yellow-500",
              bgColor: "bg-yellow-500/10"
            },
            {
              icon: FaUser,
              label: "Regular Users",
              value: users.filter(user => !user.isAdmin).length,
              color: "text-green-500",
              bgColor: "bg-green-500/10"
            }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative p-6 rounded-2xl shadow-lg bg-gradient-to-br transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
                isDark 
                  ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' 
                  : 'from-blue-50 to-indigo-50 border border-light-border hover:border-primary/50'
              }`}
            >
              {/* Animated border on hover */}
              <div className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl group-hover:w-1 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl group-hover:h-1 transition-all duration-300" />

              <div className="flex items-center">
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <stat.icon className={`${stat.color} text-2xl`} />
                </div>
                
                <div>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    {stat.label}
                  </p>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sorting Controls */}
        {users.length > 0 && (
          <div className={`my-8 p-4 rounded-xl ${isDark
            ? 'bg-gradient-to-br from-dark-bg-tertiary to-dark-bg-primary hover:from-primary/20 hover:to-primary/10'
            : 'bg-gradient-to-br from-light-bg-tertiary to-light-bg-primary hover:from-primary/20 hover:to-primary/10'} ${
            isDark 
              ? 'bg-dark-bg-secondary border border-dark-border' 
              : 'bg-light-bg-secondary border border-light-border'
          }`}>
            <div className="flex flex-wrap items-center gap-4">
              <span className={`text-sm font-medium `}>
                Sort by:
              </span>
              
              {[
                { key: 'username', label: 'Name', icon: FaUser },
                { key: 'email', label: 'Email', icon: MdEmail },
                { key: 'createdAt', label: 'Date', icon: MdSchedule }
              ].map((sortOption) => (
                <button
                  key={sortOption.key}
                  onClick={() => requestSort(sortOption.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sortConfig?.key === sortOption.key
                      ? 'bg-primary text-white shadow-md'
                      : isDark
                        ? 'bg-dark-bg-tertiary text-dark-text-primary hover:bg-dark-bg-primary'
                        : 'bg-light-bg-tertiary text-light-text-primary hover:bg-light-bg-primary'
                  }`}
                >
                  <sortOption.icon className="text-sm" />
                  {sortOption.label}
                  {sortConfig?.key === sortOption.key && getSortIcon(sortOption.key)}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* User Cards */}
        <div className="space-y-6">
          {sortedUsers.length === 0 ? (
            <div className={`relative p-12 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl text-center transition-all duration-300 ${
              isDark 
                ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                : 'from-blue-50 to-indigo-50 border border-light-border'
            }`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}>
                <FaUsers className="text-primary text-3xl" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                No users found
              </h3>
              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {searchTerm ? "Try adjusting your search terms." : "User accounts will appear here."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedUsers.map((user, index) => (
                <div
                  key={user._id}
                  className={`group relative p-6 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
                    isDark 
                      ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                      : 'from-blue-50 to-indigo-50 border border-light-border hover:border-primary/50'
                  }`}
                >
                  {/* Animated border on hover */}
                  <div className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl group-hover:w-1 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl group-hover:h-1 transition-all duration-300" />

                  {/* Header with user info and actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-lg ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                          {user.username}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} truncate`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                        user.isAdmin 
                          ? 'bg-gradient-to-r from-primary to-primary-dark text-white' 
                          : user.isReadOnlyAdmin 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : isDark 
                              ? 'bg-dark-bg-tertiary text-dark-text-secondary' 
                              : 'bg-light-bg-tertiary text-light-text-secondary'
                      }`}>
                        {user.isAdmin ? (
                          <>
                            <FaCrown className="text-xs" />
                            Admin
                          </>
                        ) : user.isReadOnlyAdmin ? (
                          <>
                            <FaUserShield className="text-xs" />
                            Read Only Admin
                          </>
                        ) : (
                          <>
                            <FaUser className="text-xs" />
                            User
                          </>
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/users/${user._id}/edit`}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                            isDark 
                              ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300' 
                              : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 hover:text-blue-600'
                          }`}
                          title="Edit user"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                            isDark 
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300' 
                              : 'bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600'
                          }`}
                          title="Delete user"
                        >
                          <FaTrashAlt className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* User details */}
                  <div className={`p-4 rounded-xl ${
                    isDark 
                      ? 'bg-dark-bg-tertiary/50 border border-dark-border/30' 
                      : 'bg-white/50 border border-light-border/30'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MdEmail className="text-primary text-lg flex-shrink-0" />
                        <span className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                          Email:
                        </span>
                        <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} truncate`}>
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdPhone className="text-primary text-lg flex-shrink-0" />
                        <span className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                          Phone:
                        </span>
                        <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User metadata */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-opacity-20 border-gray-300">
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                        <FaUser className="text-primary" />
                        ID: {user._id.slice(-6)}
                      </span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                      User #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;