import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class SubmitFormDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 30, { message: 'Độ dài tên từ 0-30 ký tự!' })
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // @Length(0, 50, { message: 'Độ dài email từ 0-50 ký tự!' })
  // email: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 50, { message: 'Độ dài đơn vị từ 0-50 ký tự!' })
  unit: string;

  @IsOptional()
  @IsNumber()
  @Length(0, 50, { message: 'Độ dài đơn vị từ 0-50 ký tự!' })
  number: number;
}