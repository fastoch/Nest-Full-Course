import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

// This is the data we should receive when requesting for a new user
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["ADMIN", "ENGINEER", "INTERN"], {
    message: 'Valid role required' // this 2nd parameter is in case they don't provide one of the enum values
  })
  role: "ADMIN" | "ENGINEER" | "INTERN";
}
// we create the id after we receive the above data