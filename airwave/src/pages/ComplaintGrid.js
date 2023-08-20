import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import '../App.css';

const ComplaintGrid = () => {
  const [dataFetch, setData] = useState([]);
  const fetchdata = async () => {
    try {
      const response = await axios.get("/resolvedComp");
      setData(response.data.data);
    } catch (error) {
      console.log("error while fetching the data");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const [searchItem, setSearchItem] = useState('');
  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredData = dataFetch.filter((row) => {
    const rowValues = Object.values(row).join('').toLowerCase();
    const isRowMatchingSearch = rowValues.includes(searchItem.toLowerCase());

    const rowDate = new Date(row.date);
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    const isDateInRange =
      (!startDateObj || rowDate >= startDateObj) &&
      (!endDateObj || rowDate <= endDateObj);

    return isRowMatchingSearch && isDateInRange;
  });

  return (
    <>
      <Navbar />
      <div>
        <div className='tbContainer '>
          <div className='filterConatiner'>
          <input
            type='text'
            value={searchItem}
            onChange={handleSearch}
            placeholder='Search...'
          />

          <input
            type='date'
            value={startDate}
            onChange={handleStartDateChange}
            placeholder='Start Date'
          />
          <input
            type='date'
            value={endDate}
            onChange={handleEndDateChange}
            placeholder='End Date'
          />
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {filteredData.length === 0 ? (
      <tr>
        <td colSpan="6" style={{textAlign:'center'}}>No Data Available</td>
      </tr>
    ) : (
      filteredData.map((row) => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.mobile}</td>
          <td>{row.category}</td>
          <td>{row.description}</td>
          <td>{new Date(row.date).toDateString()}</td>
          <td>{row.status}</td>
        </tr>
      ))
    )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComplaintGrid;
