import { Module, Logger } from '@nestjs/common';
import { PostgresProvider } from './postgres.provider';
import { ConfigService } from '@nestjs/config';

@Module({
	providers: [PostgresProvider, Logger, ConfigService],
	exports: [PostgresProvider, Logger, ConfigService],
})
export class SharedModule {}
