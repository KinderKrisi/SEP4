import { MovieSeat } from './movieSeat';

export class Movie {
    Id?: number;
    name: string;
    length: number;
    language: string;
    startTimeMill?: number;
    startTime? = new Date(this.startTimeMill);
    endTimeMill?: number;
    endTime? = new Date(this.endTimeMill);
    price: Number;
    seats?: MovieSeat[];
}