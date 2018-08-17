import { User } from './user';
import { ParkingPlace } from './parkingPlace';

export class MovieReservation {
    movieId: Number;
    seatId: Number;
    user: User;
    startDate: Date;
    endDate: Date;
    wantReservation: Boolean;
    parkingPlaces? : ParkingPlace[]; 
}