import { Injectable, NotFoundException } from '@nestjs/common';
import type { Cat, CreateCatData, UpdateCatData } from './interfaces';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];
  private id = 1;

  public create(data: CreateCatData): Cat {
    const newCat: Cat = {
      id: this.id++,
      ...data
    };

    this.cats.push(newCat);

    return newCat;
  }

  public findAll(): Cat[] {
    return this.cats;
  }

  public findWithId(id: number): Cat | undefined {
    return this.cats.find((cat) => cat.id === id);
  }

  public findAllWhere(age?: number, breed?: string): Cat[] {
    return this.cats.filter((cat) => {
      const matchAge = age !== undefined ? cat.age === age : true;
      const matchBreed = breed !== undefined ? cat.breed === breed : true;

      return matchAge && matchBreed;
    });
  }

  public update(id: number, data: UpdateCatData): Cat | undefined {
    const cat = this.cats.find((cat) => cat.id === id);

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    // assign мутирует объект и автоматически добавляет в массив
    Object.assign(cat, data);

    return cat;
  }

  public remove(id: number) {
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return { message: 'ok' };
  }
}
