import { MovieSeat } from './movieSeat';

export class Movie {
    Id?: number;
    name: string;
    length: number;
    language: string;
    startTime: Date;
    endTime: Date;
    prize: number;
    seats: MovieSeat[];

}