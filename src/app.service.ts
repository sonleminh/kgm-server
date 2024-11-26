import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './app.entity';
import { Model } from 'mongoose';
import { SubmitFormDto } from './dto/form.dto';
import { MongoError } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}
  async submitForm(body: SubmitFormDto) {
    try {
      const payload = body;

      let randomNumber: number;

      // Ensure the random number is unique
      let isUnique = false;
      let attempts = 0; // To track how many attempts we make
      const maxAttempts = 2; // Max attempts before throwing error

      while (!isUnique) {
        if (attempts >= maxAttempts) {
          // If we've tried 120 times and haven't found a unique number, throw an error
          throw new Error(
            'No unique numbers available. Maximum submissions reached.',
          );
        }

        randomNumber = Math.floor(Math.random() * 2) + 1;
        const existingForm = await this.formModel.findOne({
          number: randomNumber,
        });

        if (!existingForm) {
          isUnique = true; // If not found, it's unique
        }

        attempts++; // Increment attempts count
      }

      // Add the unique random number to the payload
      payload.number = randomNumber;
      return await this.formModel.create(payload);
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        // Use type assertion to access keyPattern and keyValue
        const mongoError = error as MongoError & {
          keyPattern: Record<string, any>;
          keyValue: Record<string, any>;
        };

        // Handle email duplication error
        if (mongoError.keyPattern && mongoError.keyPattern.email) {
          throw new HttpException(
            `Email ${mongoError.keyValue.email} is already registered.`,
            HttpStatus.BAD_REQUEST,
          );
        }

        // Handle number duplication error
        if (mongoError.keyPattern && mongoError.keyPattern.number) {
          throw new HttpException(
            'The number has already been assigned.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Rethrow other unexpected errors
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
