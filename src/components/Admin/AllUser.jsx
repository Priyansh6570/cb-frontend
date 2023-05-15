import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userAction'; // Replace with your action file and function
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const AllUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const maxDisplayedPages = 4;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Determine the range of page numbers to display
  const getPageRange = () => {
    let startPage;
    let endPage;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="container mx-auto p-8 px-[50px]">
      <h1 className="text-3xl font-bold mb-14">All Users</h1>
      <table className="min-w-full border-collapse">
      <colgroup>
        <col style={{ width: '8%' }} /> {/* Serial Number */}
        <col style={{ width: '23%' }} /> {/* Name */}
        <col style={{ width: '30%' }} /> {/* Email */}
        <col style={{ width: '12%' }} /> {/* Number */}
        <col style={{ width: '12%' }} /> {/* Role */}
        <col style={{ width: '15%' }} /> {/* Date of Joining */}
      </colgroup>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Serial Number</th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">Name</th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">Number</th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">Role</th>
            <th className="py-2 px-4 border-b border-l border-gray-300">Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-300">{indexOfFirstUser + index + 1}</td>
              <td className="py-2 px-4 border-b border-l border-r border-gray-300 font-medium">{user.name}</td>
              <td className="py-2 px-4 border-b border-l border-r border-gray-300" style={{ width: '30%' }}>{user.email}</td>
              <td className="py-2 px-4 border-b border-l border-r border-gray-300" style={{ width: '10%' }}>{user.mobile}</td>
              <td className="py-2 px-4 border-b border-l border-r border-gray-300" style={{ width: '10%' }}>{user.role}</td>
              <td className="py-2 px-4 border-b border-l border-gray-300">
                {new Date(user.createdAt)
                  .toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(/(\d+)(?:st|nd|rd|th)/, '$1$2')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>
        {getPageRange().map((page, index) =>
          page === '...' ? (
            <span key={index} className="mx-2">
              {page}
            </span>
          ) : (
            <button
              key={index}
              className={`mx-2 ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              } rounded-md p-2`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AllUser;

