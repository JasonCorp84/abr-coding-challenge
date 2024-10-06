import FishItem from './FishItem';
import calculateAverageCalories from '../utils/calculateAverageByProperties';
import './Region.css'


const Region = ({region, regionData }) => {
  const averageCalories = calculateAverageCalories(regionData, 'Calories');
  const averageTotalFat = calculateAverageCalories(regionData, 'FatTotal')
  return (
    <div style={{padding: '3%'}}>
      <h2>{region} Region</h2>
      <p><strong>Average Calories</strong> per Serving in the {region} Region: {averageCalories}</p>
      <p><strong>Average Total Fat</strong> per Serving in the {region} region: {averageTotalFat}</p>
      <div className='region-container'>
        {regionData.map(fish => {     
          const {SpeciesName} = fish;
          return (
              <FishItem key={SpeciesName} fishInfo={fish}/>
            )
        }
        )}
      </div>
    </div>
  );
};

export default Region;
