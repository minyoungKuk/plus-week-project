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

export interface countryCardProps {
  country: PostCountryProps;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isFavorite: boolean;
}

export interface PostCountryProps {
  id: number;
  name: string;
  flag_url: string;
  capital: string;
}
