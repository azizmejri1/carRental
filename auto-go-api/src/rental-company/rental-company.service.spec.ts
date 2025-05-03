import { Test, TestingModule } from '@nestjs/testing';
import { RentalCompanyService } from './rental-company.service';

describe('RentalCompanyService', () => {
  let service: RentalCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalCompanyService],
    }).compile();

    service = module.get<RentalCompanyService>(RentalCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
