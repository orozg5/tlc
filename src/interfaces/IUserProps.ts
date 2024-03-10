import IInstruction from "./IInstruction";
import IUser from "./IUser";

export default interface IUserProps {
  userData?: IUser;
  userInstructions?: IInstruction[];
}
