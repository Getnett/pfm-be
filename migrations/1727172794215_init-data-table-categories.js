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
    INSERT INTO categories (category_name)
    VALUES
    ('telephone'),
    ('entertainment'),
    ('education'),
    ('beauty'),
    ('sport'),
    ('soical'),
    ('transporation'),
    ('clothing'),
    ('car'),
    ('liquor'),
    ('electronics'),
    ('travel'),
    ('health'),
    ('pet'),
    ('repair'),
    ('housing'),
    ('home'),
    ('gift'),
    ('donate'),
    ('lottery'),
    ('snacks'),
    ('child'),
    ('vegetable'),
    ('fruit');
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
       DELETE FROM categories
       WHERE category_name IN (
             'telephone',
             'entertainment',
             'education',
             'beauty',
             'sport',
             'soical',
             'transporation',
             'clothing',
             'car',
             'liquor',
             'electronics',
             'travel',
             'health',
             'pet',
             'repair',
             'housing',
             'home',
             'gift',
             'donate',
             'lottery',
             'snacks',
             'child',
             'vegetable',
             'fruit'
);
`);
};
