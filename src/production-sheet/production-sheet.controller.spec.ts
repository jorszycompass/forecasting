import { Test, TestingModule } from '@nestjs/testing';
import { ProductionSheetController } from './production-sheet.controller';

describe('ProductionSheetController', () => {
	let controller: ProductionSheetController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductionSheetController],
		}).compile();

		controller = module.get<ProductionSheetController>(ProductionSheetController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
