export function millisecondsToDate(milliseconds) {
  // Convert the milliseconds to a Date object.
  var date = new Date(milliseconds);

  // Format the Date object as a string.
  var dateString = date.toISOString();

  // Return the date string.
  return dateString;
}
