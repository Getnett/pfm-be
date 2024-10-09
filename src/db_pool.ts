import pg from "pg";

class DbPool {
  #_pool: pg.Pool | null = null;

  connect(connectionString: string) {
    this.#_pool = new pg.Pool({ connectionString: connectionString });
    return this.#_pool.query(`SELECT 1 + 1;`);
  }

  close() {
    if (this.#_pool) {
      return this.#_pool.end();
    }
  }

  query(queryString: string, params: any) {
    return this.#_pool?.query(queryString, params);
  }
}

export default new DbPool();
