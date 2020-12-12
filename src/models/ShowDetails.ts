import ShowType from './ShowType';
import Language from './Language';
import ShowGenre from './ShowGenre';
import ShowStatus from './ShowStatus';
import Rating from './Rating';
import Image from './Image';
import ShowLinks from './ShowLinks';

interface ShowDetails {
  id: number;
  url: string;
  name: string;
  type: ShowType | string;
  language: Language | string;
  genres: ShowGenre[] | string[];
  status: ShowStatus | string;
  premiered: string;
  officialSite: string;
  rating: Rating;
  image: Image | null;
  summary: string;
  updated: number;
  _links: ShowLinks;
}

export default ShowDetails;
