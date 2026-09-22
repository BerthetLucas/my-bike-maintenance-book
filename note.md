22/09/2026

# Struggle

## ENV management

Issues on the .env file to be read correctly, I forgot the `ConfigModule` pass some heavy minutes to understand my DB connection was not working because the process.env.PORT was not read correctly.

I had to add the `ConfigModule` to the imports of the AppModule, and I had to pass the `process.env.PORT` to the AppModule.

## Testing

Quickly found out that the main controller test was not working, I had to add the `AppRepository` to the providers of the `AppService` to be able to test it.

## Drizzle

Hard to find a centralized documentation to implement Drizzle by hand, I still have some doubt about the file namming espacially the `index.ts` file. It's a mix of content I found on the internet, Youtube and the documentation. Very glad I found this drizzle studio which will be very useful for me in the future.

## Miscellaneous

Small type issues because of the missing type config on the `tsconfig.json` file.
