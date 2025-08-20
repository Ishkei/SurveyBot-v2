export const getDateFormat = (locale: string) => {
  const options: any = { year: "numeric", month: "2-digit", day: "2-digit" };

  // Check if Intl is not supported for an old browser
  if(!Intl){
    return [{ type: "day", value: "DD" }, {type: "month", value: "MM" }, { type: "year", value: "YYYY" }];
  }

  try {
    return new Intl.DateTimeFormat(locale, options).formatToParts();
  } catch (error) {
    return new Intl.DateTimeFormat("en-US", options).formatToParts();
  }
};

export function getDatePattern(locale: string) {
  const formatter = getDateFormat(locale);

  return formatter
    ?.map(function (e) {
      switch (e?.type) {
        case "month":
          return "MM";
        case "day":
          return "DD";
        case "year":
          return "YYYY";
        default:
          return e?.value;
      }
    })
    .join("");
}

export function getDateOrder(locale: string): string[] {
  const formatter = getDateFormat(locale);

  const order: string[] = [];

  formatter?.forEach(function (e) {
    switch (e?.type) {
      case "month":
        order.push("MM");
        break;
      case "day":
        order.push("DD");
        break;
      case "year":
        order.push("YYYY");
        break;
    }
  });

  return order;
}
