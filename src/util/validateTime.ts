export default function validateTime(
  inHour: number,
  inMinute: number
): { Hour: number; Minute: number } {
  let hourMinuteDif = 0;

  let outputMinute = inMinute;
  while (outputMinute < 0) {
    outputMinute = 60 + outputMinute;
    hourMinuteDif -= 1;
  }
  hourMinuteDif += Math.floor(outputMinute / 60);
  outputMinute = outputMinute % 60;

  let outputHour = inHour + hourMinuteDif;
  while (outputHour < 0) {
    outputHour = 24 + outputHour;
  }
  outputHour = outputHour % 24;

  return {
    Hour: outputHour,
    Minute: outputMinute
  };
}
