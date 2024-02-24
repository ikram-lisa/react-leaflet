export function getColorName(count) {
  switch (true) {
    case count > 500:
      return "pink";
    case count > 300:
      return "orange";
    case count > 200:
      return "yellow";
    case count > 150:
      return "radium";
    case count > 125:
      return "green";
    case count > 100:
      return "lightgreen";
    case count > 75:
      return "aqua";
    case count > 50:
      return "azure";
    case count > 25:
      return "blue";
    case count > 0:
      return "violet";
  }
}
