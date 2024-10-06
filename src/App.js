import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation'
import Home from './Home';


const Region = lazy(() => import('./Components/Region'));
const API_KEY = process.env.REACT_APP_API_KEY;




function App() {
  const [fishMap, setFishMap] = useState({});
  console.log("🚀 ~ App ~ fishMap:", fishMap)
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/gofish?apikey=${API_KEY}`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const result = await response.json();
        const newRegionMap = {};
        
        result.forEach((fish, index) => {
          if(!newRegionMap[fish.NOAAFisheriesRegion]) {
            newRegionMap[fish.NOAAFisheriesRegion] = [fish]
          } else {
            newRegionMap[fish.NOAAFisheriesRegion].push(fish)
          }
        })
        setRegions(Object.keys(newRegionMap));
        setFishMap(newRegionMap); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error message to state
      }
    };

    fetchData();
  },[])


  return (
    <Router>
      <div>
        <Navigation regions={regions} />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home error={error} regions={fishMap}/>} />
          {regions.map(region => (
            <Route key={region} path={`/${region}`} element={<Region region={region} regionData={fishMap[region]} />} />
          ))}
          <Route path="/" element={<h2>Select a water region from the navigation.</h2>} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
