import { Test, TestingModule } from '@nestjs/testing';
import { DesignationController } from './designation.controller.js';

describe('DesignationController', () => {
  let controller: DesignationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignationController],
    }).compile();

    controller = module.get<DesignationController>(DesignationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
