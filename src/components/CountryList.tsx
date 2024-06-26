import { useEffect, useState } from "react";
import { countyAPI } from "../api/country.api";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [favoriteList, setFavoriteList] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countyAPI();
        const countryListData = data.map(
          (countryList: Country, index: number) => ({
            ...countryList,
            id: index,
          })
        );
        setCountryList(countryListData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleAddCountry = (selectedCountry: Country) => {
    setFavoriteList((prevList) => [...prevList, selectedCountry]);

    setCountryList(
      countryList.filter((list) => list.id !== selectedCountry.id)
    );
  };

  const handleRemoveCountry = (selectedCountry: Country) => {
    setCountryList((prevList) => {
      const newCountryList = [...prevList, selectedCountry];
      return newCountryList.sort((a, b) => a.id - b.id);
    });

    setFavoriteList(
      favoriteList.filter((list) => list.id !== selectedCountry.id)
    );
  };

  if (isLoading) {
    return (
      <div className="text-bold text-3xl m-auto text-center">
        데이터를 불러오고 있습니다.
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-bold text-3xl m-auto text-center">
        {errorMessage}
      </div>
    );
  }

  return (
    <main>
      <div className="container mx-auto p-6">
        <h1 className="py-4 text-2xl font-semibold text-center mt-12">
          Favorite Countries
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteList.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              onClick={() => {
                handleRemoveCountry(country);
              }}
              isFavorite={true}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="py-4 text-3xl font-bold text-center mb-8">Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countryList.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              onClick={() => {
                handleAddCountry(country);
              }}
              isFavorite={false}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CountryList;
