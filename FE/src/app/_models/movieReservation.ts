import { User } from './user';
import { ParkingPlace } from './parkingPlace';

export class MovieReservation {
    movieId: Number;
    seatId: Number;
    userId: Number;
    startDate: Date;
    endDate: Date;
    wantParking: Boolean;
    parkingPlaces? : ParkingPlace[]; 
}