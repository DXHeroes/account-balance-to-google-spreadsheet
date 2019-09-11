import { Test, TestingModule } from '@nestjs/testing';
import { CsasService } from './csas.service';

describe('CsasService', () => {
  let service: CsasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsasService],
    }).compile();

    service = module.get<CsasService>(CsasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
