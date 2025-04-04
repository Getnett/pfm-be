export default function toCamelCase(rows: any[]) {
  return rows.map((row) => {
    const replaced: any = {};
    for (let key in row) {
      const camelCase = key.replace(/[-_][a-z]/gi, ($1) =>
        $1.toUpperCase().replace("_", "")
      );
      replaced[camelCase] = row[key];
    }

    return replaced;
  });
}
