import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [searchList, setSearchList] = useState<Weather[]>([])
  const [favList,setFavList] = useState<Weather[]>([])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value
    setSearchList(weatherData.filter((item) => item.city.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())))
   };

  const handleClearSearch = () => { };

  const handleUnitChange = () => { 
    setUnit(unit === 'C' ? 'F': 
    'C' )
  };

  const handleAddFavorite = (cityId: number) => { 
    const newItem = weatherData.find((item) => item.id === cityId)
    if(newItem) {
      setFavList([...favList, newItem])
    }
  };

  const handleRemoveFavorite = (cityId: number) => { 
    setFavList(favList.filter((itm) => itm.id !== cityId))

  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchList.map((data) => {
              const isFavorite = favList.findIndex((itm) => itm.id === data.id) > -1
              return <WeatherCard
                key={6}
                weather={data}
                unit={unit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={isFavorite}
              />
            })
}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit === 'C' ? 'Celsius' : 'Fahrenheit'}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {favList.map((data) => {

            return <WeatherCard
              key={6}
              weather={data}
              unit={unit}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={true}
            />
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
