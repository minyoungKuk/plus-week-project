import { useEffect, useState } from "react";
import { fetchCountries } from "../api/fetchCountries";
import { supabase } from "../config/supabase";
import { Country, PostCountryProps } from "../types/country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countryList, setCountryList] = useState<PostCountryProps[]>([]);
  const [favoriteList, setFavoriteList] = useState<PostCountryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries(
      (countries: Country[]) => {
        const formattedCountries = countries.map((country) => ({
          id: country.id,
          name: country.name.common,
          capital:
            country.capital && country.capital.length > 0
              ? country.capital[0]
              : "",
          flag_url: country.flags.png,
        }));
        setCountryList(formattedCountries);
      },
      setFavoriteList,
      setErrorMessage,
      setIsLoading
    );
  }, []);

  const handleAddCountry = async (selectedCountry: PostCountryProps) => {
    try {
      const { error } = await supabase
        .from("favorite_countries")
        .insert(selectedCountry);

      if (error) throw error;

      setFavoriteList((prevList) => [...prevList, selectedCountry]);

      setCountryList(
        countryList.filter((list) => list.id !== selectedCountry.id)
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleRemoveCountry = async (selectedCountry: PostCountryProps) => {
    try {
      const { error } = await supabase
        .from("favorite_countries")
        .delete()
        .eq("id", selectedCountry.id);

      if (error) throw error;

      setFavoriteList(
        favoriteList.filter((list) => list.id !== selectedCountry.id)
      );

      if (!countryList.some((country) => country.id === selectedCountry.id)) {
        setCountryList((prevList) => {
          const newCountryList = [...prevList, selectedCountry];
          return newCountryList.sort((a, b) => a.id - b.id);
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleCountryClick = (
    country: PostCountryProps,
    isFavorite: boolean
  ) => {
    if (isFavorite) {
      handleRemoveCountry(country);
    } else {
      handleAddCountry(country);
    }
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
              onClick={() => handleCountryClick(country, true)}
              isFavorite={true}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="py-4 text-3xl font-bold text-center mb-8">Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countryList.map((country) => {
            return (
              <CountryCard
                key={country.id}
                country={country}
                onClick={() => handleCountryClick(country, false)}
                isFavorite={false}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default CountryList;
