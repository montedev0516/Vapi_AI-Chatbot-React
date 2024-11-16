import { Test, TestingModule } from '@nestjs/testing';
import { BvpnController } from './bvpn.controller';

describe('BvpnController', () => {
  let controller: BvpnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BvpnController],
    }).compile();

    controller = module.get<BvpnController>(BvpnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
