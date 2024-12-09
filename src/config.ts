export default () => {
	// Ensure environment variables are set or provide defaults.
	const writeHost = process.env.POSTGRES_WRITE_HOST || 'localhost';
	const readHost = process.env.POSTGRES_READ_HOST || 'localhost';
	const database = process.env.POSTGRES_DATABASE || 'postgres';
	const user = process.env.POSTGRES_USERNAME || 'postgres';
	const password = process.env.POSTGRES_PASSWORD || 'secret';
	const port = parseInt(process.env.POSTGRES_PORT || '5432', 10);

	return {
		postgres: {
			max_connect_retries: parseInt(process.env.POSTGRES_MAX_CONNECT_RETRIES || '3', 10),
			write: {
				host: writeHost,
				database,
				user,
				password, // If you want, you can inline the password as a string here.
				port,
				// Other PoolConfig properties, with sensible defaults:
				ssl: undefined,
				min: 1,
				max: 10,
				idle_timeout_millis: 10000,
				connection_timeout_millis: 10000,
				max_uses: 7500,
			},
			read: {
				host: readHost,
				database,
				user,
				password,
				port,
				ssl: undefined,
				min: 1,
				max: 10,
				idle_timeout_millis: 10000,
				connection_timeout_millis: 10000,
				max_uses: 7500,
			},
		},
	};
};
