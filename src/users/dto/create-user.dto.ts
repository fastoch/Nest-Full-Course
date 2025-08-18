import { IsEmail, IsEnum } from "class-validator";

// This is the data we should receive when requesting for a new user
export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["ADMIN", "ENGINEER", "INTERN"], {})
  role: "ADMIN" | "ENGINEER" | "INTERN";
}
// we create the id after we receive the above data