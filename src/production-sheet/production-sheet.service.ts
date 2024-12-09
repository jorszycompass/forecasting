import { Injectable } from '@nestjs/common';
import { PostgresProvider } from '../shared/postgres.provider';
import { generate_id } from '../util/util';

@Injectable()
export class ProductionSheetService {
	constructor(private readonly pg: PostgresProvider) {}

	async createProductionSheet(): Promise<string> {
		const id = generate_id();

		const query = `
      INSERT INTO main.production_sheet (production_sheet_id)
      VALUES ($1)
      RETURNING production_sheet_id;
    `;
		const values = [id];

		const result = await this.pg.queryWrite(query, values);
		const insertedId = result.rows[0].production_sheet_id;

		return insertedId;
	}
}
