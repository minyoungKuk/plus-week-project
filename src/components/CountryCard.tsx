import { countryProps } from "../types/country";

const CountryCard = ({ country, onClick, isFavorite }: countryProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-red rounded-lg shadow-md hover:shadow-lg border transition-transform transform ${
        isFavorite ? "border-green-600" : "border-transparent"
      }`}
    >
      <img
        className="w-20 h-auto mx-auto mb-4"
        src={country.flags.png}
        alt={`${country.name.common} flag image`}
      />
      <h3 className="text-xl font-semibold mb-2"> {country.name.common} </h3>
      <p className="text-gray-600"> {country.capital} </p>
    </div>
  );
};

export default CountryCard;
