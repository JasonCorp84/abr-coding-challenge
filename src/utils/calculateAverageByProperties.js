function calculateAverageByProperty(regionData, property) {
  const sum = regionData.reduce((acc, curr) => {
      const value = curr[property]?.trim(); // Trim whitespace if the property exists
      const numericValue = value ? parseInt(value.replace(/[^0-9]/g, ''), 10) : 0; // Remove non-numeric characters

      return !isNaN(numericValue) ? acc + numericValue : acc; // Only add if valid number
  }, 0);

  const average = sum / regionData.length;
  return isNaN(average) ? '0.00' : average.toFixed(2);
}

export default calculateAverageByProperty;
