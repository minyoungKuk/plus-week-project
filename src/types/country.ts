export type Country = {
  flags: {
    png: string;
  };
  capital: string[];
  id: number;
  name: {
    common: string;
  };
};

export interface countryProps {
  country: Country;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isFavorite: boolean;
}
