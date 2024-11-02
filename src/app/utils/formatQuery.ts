interface PlaceHolder<T> {
  key: string;
  value: T | string | number;
}

export const formatQuery = <T>(
  rawQuery: string,
  placeholders: PlaceHolder<T>[]
) => {
  let _rawQuery = rawQuery;

  placeholders.forEach((placeholder) => {
    _rawQuery = _rawQuery.replace(
      placeholder.key,
      JSON.stringify(placeholder.value)
    );
  });

  _rawQuery = _rawQuery.replace(/"([^(")"]+)":/g, "$1:");

  return _rawQuery;
};
