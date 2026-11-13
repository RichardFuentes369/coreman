export const jwtConstants = {
    secretAdmin: process.env.JWT_SECRET_ADMIN || 'SECRETOADMIN1234.',
    secretUser: process.env.JWT_SECRET_USER || 'SECRETOUSER9876.',
    TOKEN_TIME: process.env.JWT_EXPIRATION_MS ? Number(process.env.JWT_EXPIRATION_MS) : '1h',
} as const;