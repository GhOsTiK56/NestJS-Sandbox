import { Injectable } from '@nestjs/common'

export interface createCatRequest {
  name: string
  age: number
  breed: string
}

export interface Cat {
  id: number
  name: string
  age: number
  breed: string
}

@Injectable()
export class CatsService {
  private cats: Cat[] = []
  private id = 1

  public create(data: createCatRequest): Cat {
    const newCat: Cat = {
      id: this.id++,
      ...data
    }

    this.cats.push(newCat)

    return newCat
  }

  public findAll(): Cat[] {
    return this.cats
  }

  public findWithId(id: number): Cat | undefined {
    return this.cats.find((cat) => cat.id === id)
  }

  public findAllWhere(age?: number, breed?: string): Cat[] {
    return this.cats.filter((cat) => {
      const matchAge = age !== undefined ? cat.age === age : true
      const matchBreed = breed !== undefined ? cat.breed === breed : true

      return matchAge && matchBreed
    })
  }
}
