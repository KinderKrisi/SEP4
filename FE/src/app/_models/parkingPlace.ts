import { User } from './user';

export class ParkingPlace {
    id : Number;
    startDate : Date;
    endDate : Date;
    user: User;
    reserved: Boolean;

}