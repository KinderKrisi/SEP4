import { User } from './user';

export class MovieSeat {
    id?: number;
    reserved: boolean;
    row: number;
    seatNumber: number;
    user: User;

}