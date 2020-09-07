export default function validateTime(
  inHour: number,
  inMinute: number
): { Hour: number; Minute: number } {
  let hourMinuteDif = 0;

  let outputMinute = inMinute;
  while (outputMinute >= 60) {
    outputMinute -= 60;
    hourMinuteDif += 1;
  }
  while (outputMinute < 0) {
    outputMinute = 60 + outputMinute;
    hourMinuteDif -= 1;
  }

  let outputHour = inHour + hourMinuteDif;
  while (outputHour >= 24) {
    outputHour = outputHour - 24;
  }
  while (outputHour < 0) {
    outputHour = 24 + outputHour;
  }

  return {
    Hour: outputHour,
    Minute: outputMinute
  };
}
