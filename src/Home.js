import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import calculateAverageCalories from './utils/calculateAverageByProperties';
import './Home.css';

function Home({ error, regions }) {
  const [sortOption, setSortOption] = useState('calories'); // Default sort option

  const sortedRegions = Object.keys(regions).sort((a, b) => {
    const averageCaloriesA = calculateAverageCalories(regions[a], 'Calories');
    const averageCaloriesB = calculateAverageCalories(regions[b], 'Calories');
    const averageFatA = calculateAverageCalories(regions[a], 'FatTotal');
    const averageFatB = calculateAverageCalories(regions[b], 'FatTotal');

    if (sortOption === 'calories') {
      return averageCaloriesA - averageCaloriesB; 
    } else {
      return averageFatA - averageFatB;
    }
  });

  return (
    <div className="home-container">
      <h2>Welcome to the Regions</h2>
      <div className="sort-options">
        <button onClick={() => setSortOption('calories')}>Sort by Calories</button>
        <button onClick={() => setSortOption('fat')}>Sort by Total Fat</button>
      </div>
      {error && <div>Please don't forget to add your API key to your environment variable, error status: {error}</div>}
      <ul className="region-list">
        {sortedRegions.map(region => {
          const regionData = regions[region];
          const averageCalories = calculateAverageCalories(regionData, 'Calories');
          const averageTotalFat = calculateAverageCalories(regionData, 'FatTotal');
          return (
            <li key={region} className="region-item">
              <NavLink 
                to={`/${region}`} 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {region}
              </NavLink>
              <p><strong>Average Calories</strong> per Serving: <strong>{averageCalories}</strong></p>
              <p><strong>Average Total Fat</strong> per Serving: <strong>{averageTotalFat}</strong></p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
