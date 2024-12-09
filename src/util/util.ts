import { v4 as UUid } from 'uuid';

/**
 * Util class
 *
 * Should not be injectable, statically used only.
 */
export class Util {
	static async sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static omit<T, K extends keyof T>(obj: T, key: K): Omit<T, K> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { [key]: _, ...rest } = obj;
		return rest as Omit<T, K>;
	}
}

export function generate_id(): string {
	return UUid().replace(/-/g, '');
}
