import ICity from "./ICity";
import IInstruction from "./IInstruction";
import IInstructor from "./IInstructor";
import ISubject from "./ISubject";
import IUser from "./IUser";
import ITerm from "./ITerm";
import IStudent from "./IStudent";
import { ChannelEntity, UserEntity } from "@pubnub/react-chat-components";
import IMaterial from "./IMaterial";
import IFolder from "./IFolder";
import IMaterialStudent from "./IMaterialStudent";
import IStudentsMaterial from "./IStudentsMaterial";

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
  publishKey?: string;
  subscribeKey?: string;
  users?: UserEntity[];
  channels?: ChannelEntity[];
  materials?: IMaterial[];
  folders?: IFolder[];
  materials_students?: IMaterialStudent[];
  currentStudentMaterials?: IStudentsMaterial[];
}
