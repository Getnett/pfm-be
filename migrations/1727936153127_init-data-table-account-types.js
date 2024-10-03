/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO account_types (account_type)  
    VALUES 
      ('default'),
      ('cash'),
      ('debit_card'),
      ('investment'),
      ('credit_card'),
      ('virtual_account')
 `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(
    `DELETE FROM account_types 
     WHERE account_type IN 
     (
     'default',
     'cash',
     'debit_card',
     'investment',
     'credit_card',
     'virtual_account'
     )
     `
  );
};
