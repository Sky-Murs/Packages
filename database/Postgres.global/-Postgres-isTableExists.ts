export {}

declare global {
    namespace Postgres {
        const isTableExists: (sql: Postgres.Sql, database: string, name: string) => Promise<boolean>
    }
}

namespace module {
    export async function isTableExists(
        sql: Postgres.Sql,
        database: string,
        name: string
    ): Promise<boolean> {
        const [{ exists }] = await sql`
            SELECT EXISTS(
                SELECT *
                FROM information_schema.tables
                WHERE
                    table_catalog = ${database} AND
                    table_name = ${name}
            )
        `

        return exists
    }
}

Object.assign(Postgres, module)
