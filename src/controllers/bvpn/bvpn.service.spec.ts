import { Test, TestingModule } from '@nestjs/testing';
import { BvpnService } from './bvpn.service';

describe('BvpnService', () => {
  let service: BvpnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BvpnService],
    }).compile();

    service = module.get<BvpnService>(BvpnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
