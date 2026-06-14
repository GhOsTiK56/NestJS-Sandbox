import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseNanoIDPipe implements PipeTransform<string, string> {
  private readonly nanoIdRegex = /^[A-Za-z0-9_-]{21}$/;

  public transform(value: string): string {
    if (!value || !this.nanoIdRegex.test(value)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a valid NanoID.`
      );
    }
    return value;
  }
}
