import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLoading } from "../components/loadingContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaTrashAlt,
  FaUserShield,
  FaUser,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { MdSearch, MdEmail, MdPhone, MdBadge } from "react-icons/md";
import { motion } from "framer-motion";
function AdminUsers() {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }
    setSortConfig({ key, direction });
  };
  //  variants for animation
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.4 },
    },
  };
  const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };
  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };
  // Get sorted and filtered users
  const getSortedUsers = () => {
    let filteredUsers = [...users];

    // Apply search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
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
    if (sortConfig.direction === "ascending")
      return <FaSortUp className="text-primary" />;
    if (sortConfig.direction === "descending")
      return <FaSortDown className="text-primary" />;
    return <FaSort className="text-gray-400" />;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-righteous flex items-center gap-2">
          <FaUser className="text-primary" />
          User Management
        </h2>
        {/* Search user */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          className="mb-2"
        >
          <div
            className={`relative flex items-center rounded-lg border transition-shadow focus-within:ring-2 focus-within:ring-primary
      ${
        isDark
          ? "bg-dark-bg-tertiary border-dark-border"
          : "bg-light-bg-tertiary border-light-border"
      }
    `}
          >
            {/* Search Icon */}
            <MdSearch
              className={`absolute left-3 text-xl text-primary 
        ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}
      `}
            />

            {/* Input */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-10 py-2 rounded-lg text-lg bg-transparent border-none outline-none
        ${
          isDark
            ? "text-dark-text-primary placeholder-dark-text-secondary"
            : "text-light-text-primary placeholder-light-text-secondary"
        }
      `}
            />

            {/* Clear Button */}
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchTerm("")}
                className={`absolute right-3 p-1 text-primary rounded-full transition-colors
          ${
            isDark
              ? "text-dark-text-secondary hover:text-dark-text-primary"
              : "text-light-text-secondary hover:text-light-text-primary"
          }
        `}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Count of users*/}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
      >
        {[
          { label: "Total Users", value: users.length, icon: FaUsers },

          {
            label: "Admins",
            value: users.filter((user) => user.isAdmin).length,
            icon: FaUserShield,
          },
          {
            label: "Regular Users",
            value: users.filter((user) => !user.isAdmin).length,
            icon: FaUser,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className={`p-6 rounded-2xl shadow-lg backdrop-blur-md ${
              isDark
                ? "bg-gradient-to-br from-dark-bg-secondary to-dark-bg-tertiary border border-dark-border"
                : "bg-gradient-to-br from-light-bg-secondary to-light-bg-tertiary border border-light-border"
            } transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    isDark
                      ? "text-dark-text-primary"
                      : "text-light-text-primary"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
              <stat.icon className="text-3xl text-primary" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Users table */}
      <div className="overflow-x-auto overflow-y-auto  max-h-[600px] rounded-lg border ${isDark ? 'border-dark-border' : 'border-light-border'}">
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="visible"
          className={` rounded-2xl border ${
            isDark ? "border-dark-border" : "border-light-border"
          } backdrop-blur-md`}
        >
          <table className="w-full min-w-full border-collapse divide-y divide-gray-700">
            <thead
              className={`${
                isDark ? "bg-dark-bg-tertiary" : "bg-light-bg-tertiary"
              }`}
            >
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-2 font-medium text-lg"
                    onClick={() => requestSort("username")}
                  >
                    <FaUser className="text-primary size-4" />
                    Username {getSortIcon("username")}
                  </button>
                </th>
                <th className="px-3 py-3 text-left">
                  <button
                    className="flex items-center gap-2 font-medium text-lg"
                    onClick={() => requestSort("email")}
                  >
                    <MdEmail className="text-primary size-5" />
                    Email {getSortIcon("email")}
                  </button>
                </th>
                <th className="px-3 py-3 text-left">
                  <button 
                    className="flex items-center gap-2 font-medium text-lg"
                    onClick={() => requestSort("phone")}
                  >
                    <MdPhone className="text-primary size-5" />
                    Phone {getSortIcon("phone")}
                  </button>
                </th>
                <th className="px-3 py-3 text-center">
                  <div className="flex items-center justify-center gap-2 font-medium text-lg">
                    <MdBadge className="text-primary size-5 " />
                    Role
                  </div>
                </th>
                <th className="px-3 py-3 text-center">
                  <div className="flex items-center justify-center gap-2 font-medium text-lg">
                    <FaTools className="text-primary size-5" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <motion.div
                      variants={noResultsVariants}
                      initial="hidden"
                      animate="visible"
                      className={`text-center py-16 ${
                        isDark
                          ? "bg-dark-bg-secondary"
                          : "bg-light-bg-secondary"
                      }`}
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3
                        className={`text-2xl font-semibold mb-2 ${
                          isDark
                            ? "text-dark-text-primary"
                            : "text-light-text-primary"
                        }`}
                      >
                        No users found
                      </h3>
                      <p
                        className={`text-lg ${
                          isDark
                            ? "text-dark-text-secondary"
                            : "text-light-text-secondary"
                        }`}
                      >
                        {searchTerm
                          ? "Try a different search term."
                          : "No users available yet."}
                      </p>
                    </motion.div>
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user, index) => (
                  <motion.tr
                    key={user._id || user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                              ${
                                index % 2 === 0
                                  ? isDark
                                    ? "bg-dark-bg-secondary"
                                    : "bg-light-bg-secondary"
                                  : isDark
                                  ? "bg-dark-bg-primary"
                                  : "bg-light-bg-primary"
                              }
                              hover:${
                                isDark
                                  ? "bg-dark-bg-tertiary"
                                  : "bg-light-bg-tertiary"
                              } transition-colors duration-300
                            `}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-primary font-semibold  transition-transform duration-300 hover:scale-110 hover:shadow-lg
                            ${
                              isDark
                                ? "bg-dark-bg-tertiary border border-dark-border"
                                : "bg-light-bg-tertiary border border-light-border"
                            }
                              `}
                        >
                          {user.username.charAt(0).toUpperCase()}
                        </div>

                        <span
                          className={`font-normal text-lg ${
                            isDark
                              ? "text-dark-text-primary"
                              : "text-light-text-primary"
                          }`}
                        >
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-lg">{user.email}</td>
                    <td className="px-3 py-2 text-lg">{user.phone}</td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`px-3 py-2 rounded-full text-sm font-medium ${
                          user.isAdmin
                            ? "bg-primary/20 text-primary"
                            : user.isReadOnlyAdmin
                            ? "bg-primary/40 text-primary"
                            : isDark
                            ? "bg-dark-bg-tertiary text-dark-text-secondary"
                            : "bg-light-bg-tertiary text-light-text-secondary"
                        }`}
                      >
                        {user.isAdmin
                          ? "Admin"
                          : user.isReadOnlyAdmin
                          ? "Read Only Admin"
                          : "User"}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/admin/users/${user._id || user.id}/edit`}
                          className={`
                                    p-3 rounded-lg transition-colors duration-300
                                    ${
                                      isDark
                                        ? "bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary"
                                        : "bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary"
                                    }
                                  `}
                          title="Edit user"
                        >
                          <FaEdit className="text-xl text-primary transition-colors duration-300 hover:text-primary" />
                        </Link>
                        <button
                          onClick={() => deleteUser(user._id || user.id)}
                          className={`
                                    p-3 rounded-lg transition-colors duration-300
                                    ${
                                      isDark
                                        ? "bg-dark-bg-tertiary  hover:bg-red-500/20 text-dark-text-primary"
                                        : "bg-light-bg-tertiary  hover:bg-red-500/20 text-light-text-primary"
                                    }
                                  `}
                          title="Delete user"
                        >
                          <FaTrashAlt className="text-xl transition-colors duration-300 text-red-500 " />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminUsers;
