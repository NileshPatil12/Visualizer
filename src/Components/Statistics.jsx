import React, { useState, useEffect } from 'react';
import transaction from './product.json';

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('June'); // Default month
  const [totalSale, setTotalSale] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const data=transaction;
  // Calculate statistics when the selected month or data changes
  
  useEffect(() => {
    const calculateStatistics = () => {
      let sale = 0;
      let sold = 0;
      let notSold = 0;

      // Handle "All" months selection:
      if (selectedMonth === "All") {
        data.forEach((item) => { // Iterates through ALL items when "All" is selected
            sale += item.price;
            item.sold ? sold++ : notSold++;
        });
      } else { // Filter by selected month:
        data.forEach((item) => {
          const saleDate = new Date(item.dateOfSale);
          const saleMonth = saleDate.toLocaleString('default', { month: 'long' });

          if (saleMonth === selectedMonth) { // Only includes items from selected month
            sale += item.price;
            item.sold ? sold++ : notSold++;
          }
        });
      }

      setTotalSale(sale);
      setTotalSoldItems(sold);
      setTotalNotSoldItems(notSold);
    };

    calculateStatistics();
  }, [selectedMonth, data]); // Add 'data' to the dependency array

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Statistics - {selectedMonth}</h2>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
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
          <option value={"All"}>
                All
            </option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700">Total Sale</h3>
          <p className="text-lg font-bold">${totalSale.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700">Total Sold Items</h3>
          <p className="text-lg font-bold">{totalSoldItems}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700">Total Not Sold Items</h3>
          <p className="text-lg font-bold">{totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;