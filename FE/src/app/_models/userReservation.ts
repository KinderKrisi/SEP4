import { MovieSeat } from "./movieSeat";
import { ParkingPlace } from "./parkingPlace";
import { Movie } from "./movie";

export class UserReservation {
    UserId: Number;
    ReservedSeats: MovieSeat[];
    ReservedParkingPlaces: ParkingPlace[];
    ReservedMovies: Movie[];
}