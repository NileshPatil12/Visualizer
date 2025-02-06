import React, { useState, useEffect } from 'react';
import transactionsData from './product.json';

const Table = () => {
  const [data, setData] = useState([]); // State to store all transactions
  const [filteredData, setFilteredData] = useState([]); // State to store filtered transactions
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state
  const [selectedMonth, setSelectedMonth] = useState('March'); // Selected month state
  const [searchText, setSearchText] = useState(''); // Search text state

  // Load data from the JSON file on component mount
  useEffect(() => {
    setData(transactionsData);
  }, []);

  // Filter data based on selected month and search text
  useEffect(() => {
    const filterData = () => {
      let result = data;

      // Filter by selected month
      
      if (selectedMonth && selectedMonth!=="All") {
        result = result.filter((item) => {
          const saleDate = new Date(item.dateOfSale);
          const saleMonth = saleDate.toLocaleString('default', { month: 'long' });
          return saleMonth === selectedMonth;
        });
      }

      // Filter by search text (title, description, or price)
      if (searchText) {
        result = result.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase()) ||
            item.price.toString().includes(searchText)
          );
        });
      }

      setFilteredData(result);
      setCurrentPage(1); // Reset to the first page after filtering
    };

    filterData();
  }, [data, selectedMonth, searchText]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaction</h2>
        <div className="flex space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search transaction"
            value={searchText}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Month Dropdown */}
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(0, i).toLocaleString('default', { month: 'long' });
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
            <option value={"All"}>All</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Sold</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 text-sm text-gray-700">{row.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${row.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.sold ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <img src={row.image} alt={row.title} className="w-10 h-10 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-700">Page No: {currentPage}</span>
        <div className="flex items-center space-x-4">
          
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">Per Page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;