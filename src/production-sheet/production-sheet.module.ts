import { Module } from '@nestjs/common';
import { ProductionSheetController } from './production-sheet.controller';
import { ProductionSheetService } from './production-sheet.service';
import { SharedModule } from '../shared/shared.module';

@Module({
	imports: [SharedModule],
	controllers: [ProductionSheetController],
	providers: [ProductionSheetService],
})
export class ProductionSheetModule {}
