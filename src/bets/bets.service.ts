import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { StoreBetInput } from './dto/store-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betsRepository: Repository<Bet>,
  ) {}

  async findAll() {
    return await this.betsRepository.find({
      relations: ['user', 'game'],
    });
  }

  async findOne(id: number) {
    return await this.betsRepository.findOne(id, {
      relations: ['user', 'game'],
    });
  }

  async findAllFromUser(user: User) {
    return await this.betsRepository.find({
      where: { user_id: user.id },
      relations: ['user', 'game'],
    });
  }

  async storeMany(user: User, data: StoreBetInput[]) {
    const bets = data.map((bet) => ({ ...bet, user }));
    const savedBets = await this.betsRepository.save(bets);

    return savedBets;
  }
}
