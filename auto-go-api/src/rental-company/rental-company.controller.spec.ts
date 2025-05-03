import { Test, TestingModule } from '@nestjs/testing';
import { RentalCompanyController } from './rental-company.controller';

describe('RentalCompanyController', () => {
  let controller: RentalCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalCompanyController],
    }).compile();

    controller = module.get<RentalCompanyController>(RentalCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
