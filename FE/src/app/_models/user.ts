import { Reservation } from "./reservation";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: String;
    plate: string;
    reservations: Reservation[];
}