import { PartialType } from '@nestjs/mapped-types';
import { CreateEventguestDto } from './create-eventguest.dto';

export class UpdateEventguestDto extends PartialType(CreateEventguestDto) {}
