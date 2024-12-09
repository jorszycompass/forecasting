import { Controller, Post } from '@nestjs/common';
import { ProductionSheetService } from './production-sheet.service';

@Controller('forecasting/production-sheet')
export class ProductionSheetController {
	constructor(private readonly productionSheetService: ProductionSheetService) {}

	@Post('')
	async generate(): Promise<{ id: string }> {
		const newId = await this.productionSheetService.createProductionSheet();
		return { id: newId };
	}
}
