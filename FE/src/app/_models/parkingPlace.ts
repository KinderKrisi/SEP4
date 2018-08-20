import { User } from './user';

export class ParkingPlace {
    id : Number;
    userId: number;
    reserved: Boolean;
    startTimeMill?: number;
    startDate? = new Date(this.startTimeMill);
    endTimeMill?: number;
    endDate? = new Date(this.endTimeMill);

}