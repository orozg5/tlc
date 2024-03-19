import ICity from "./ICity";
import IInstruction from "./IInstruction";
import IInstructor from "./IInstructor";
import ISubject from "./ISubject";
import IUser from "./IUser";
import ITerm from "./ITerm";
import IStudent from "./IStudent";

export default interface IUserProps {
  userData?: IUser;
  userInstructions?: IInstruction[];
  cities?: ICity[];
  subjects?: ISubject[];
  allInstructions?: IInstruction[];
  instructors?: IInstructor[];
  myTerms?: ITerm[];
  students?: IStudent[];
  terms?: ITerm[];
}
