import { supabase } from "../config/supabase";
import { Country, PostCountryProps } from "../types/country";
import { countyAPI } from "./country.api";

export const fetchCountries = async (
  setCountryList: (countries: Country[]) => void,
  setFavoriteList: (favorites: PostCountryProps[]) => void,
  setErrorMessage: (message: string | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  try {
    const data = await countyAPI();
    const countryListData = data.map((countryList: Country, index: number) => ({
      ...countryList,
      id: index,
    }));
    setCountryList(countryListData);

    const { data: favoriteData, error } = await supabase
      .from("favorite_countries")
      .select("*");

    if (error) throw error;

    if (favoriteData) {
      setFavoriteList(favoriteData);

      const favoriteIds = new Set(
        favoriteData.map((country: PostCountryProps) => country.id)
      );
      const filteredCountryList = countryListData.filter(
        (country: Country) => !favoriteIds.has(country.id)
      );
      setCountryList(filteredCountryList);
    } else {
      setCountryList(countryListData);
    }

    console.log(favoriteData);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};
