import { Test, TestingModule } from '@nestjs/testing';
import { WhmcsController } from './whmcs.controller';

describe('WhmcsController', () => {
  let controller: WhmcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhmcsController],
    }).compile();

    controller = module.get<WhmcsController>(WhmcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
