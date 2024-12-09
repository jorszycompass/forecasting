import { Util } from '@app/util/util';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient, PoolConfig, QueryResult } from 'pg';

@Injectable()
export class PostgresProvider {
	private writePool: Pool;
	private readPool: Pool;

	private maxRetries = 5; // @TODO: use config configthis.config.getOrThrow<number>('postgres.max_connect_retries');

	constructor(
		private readonly config: ConfigService,
		private readonly logger: Logger,
	) {
		this.writePool = new Pool(this.config.getOrThrow<PoolConfig>('postgres.write'));
		this.readPool = new Pool(this.config.getOrThrow<PoolConfig>('postgres.read'));
	}

	private async getClientWithRetry(
		pool: Pool,
		remainingTries: number = this.maxRetries,
	): Promise<PoolClient> {
		if (remainingTries <= 0) {
			throw new Error('Unable to connect to database.');
		}

		let client: PoolClient;
		try {
			client = await pool.connect();
		} catch {
			const waitTimeMS = 1000 * (this.maxRetries - remainingTries + 1);
			this.logger.error(`Failed to connect to db, retrying in ${waitTimeMS}ms`);

			// Used a stepped wait
			await Util.sleep(waitTimeMS);

			client = await this.getClientWithRetry(pool, remainingTries - 1);
		}

		return client;
	}

	async queryRead(text: string, values?: any[]): Promise<QueryResult> {
		let client: PoolClient | null = null;

		try {
			client = await this.getClientWithRetry(this.readPool);
			const result = await client.query(text, values);
			return result;
		} catch (error) {
			throw new Error(`Postgres read query error: ${error.message}`);
		} finally {
			client?.release();
		}
	}

	async queryWrite(text: string, values?: any[]): Promise<QueryResult> {
		let client: PoolClient | null = null;

		try {
			client = await this.getClientWithRetry(this.writePool);
			const result = await client.query(text, values);
			return result;
		} catch (error) {
			throw new Error(`Postgres write query error: ${error.message}`);
		} finally {
			client?.release();
		}
	}

	async statusCheckRead(): Promise<boolean> {
		let client: PoolClient | null = null;
		try {
			client = await this.readPool.connect();
			await client.query('SELECT 1');
			return true;
		} catch {
			return false;
		} finally {
			client?.release();
		}
	}

	async statusCheckWrite(): Promise<boolean> {
		let client: PoolClient | null = null;
		try {
			client = await this.writePool.connect();
			await client.query('SELECT 1');
			return true;
		} catch {
			return false;
		} finally {
			client?.release();
		}
	}
}
