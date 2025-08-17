// This is the data we should receive when requesting for a new user
export class CreateUserDto {
  name: string;
  email: string;
  role: "ADMIN" | "ENGINEER" | "INTERN";
}
// we create the id after we receive the above data