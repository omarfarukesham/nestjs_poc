import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAllCats() {
    return ['Tom', 'Jerry', 'Whiskers'];
  }
}
