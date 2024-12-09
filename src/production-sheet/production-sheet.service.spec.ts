import { Test, TestingModule } from '@nestjs/testing';
import { ProductionSheetService } from './production-sheet.service';

describe('ProductionSheetService', () => {
  let service: ProductionSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionSheetService],
    }).compile();

    service = module.get<ProductionSheetService>(ProductionSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
