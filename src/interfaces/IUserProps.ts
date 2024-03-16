import IAvailability from "./IAvailability";
import ICity from "./ICity";
import IInstruction from "./IInstruction";
import IInstructor from "./IInstructor";
import ISubject from "./ISubject";
import IUser from "./IUser";

export default interface IUserProps {
  userData?: IUser;
  userInstructions?: IInstruction[];
  cities?: ICity[];
  subjects?: ISubject[];
  allInstructions?: IInstruction[];
  instructors?: IInstructor[];
  myAvailability: IAvailability[];
}
