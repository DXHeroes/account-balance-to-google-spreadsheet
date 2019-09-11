import { Test, TestingModule } from '@nestjs/testing';
import { WriteToSpreadsheetService } from './write-to-spreadsheet.service';

describe('WriteToSpreadsheetService', () => {
  let service: WriteToSpreadsheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriteToSpreadsheetService],
    }).compile();

    service = module.get<WriteToSpreadsheetService>(WriteToSpreadsheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
