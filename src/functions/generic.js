/**
 * Format transit date and time
 */
export const dateTime = (startTime, endTime = "") => {
  /**
   * Time 
   */
  let start = startTime.split(" ")[1];
  let end = endTime.split(" ")[1];

  let end1 = "";
  if (endTime) end1 = parseInt(end.split(":")[0], 10);
  let start1 = parseInt(start.split(":")[0], 10);

  let end2 = "";
  if (endTime) end2 = parseInt(end.split(":")[1], 10);
  let start2 = parseInt(start.split(":")[1], 10);

  let day1 = "";
  let day2 = "";

  // Set am/pm for the start time
  if (start1 > 12) {
    day1 = " PM";

    start = `${start1 - 12}:${start2}`;
  }
  else {
    day1 = " AM";
  }

  // Set am/pm for the end time
  if (end1 > 12) {
    day2 = " PM";

    end = `${end1 - 12}:${end2}`;
  }
  else {
    day2 = " AM";
  }

  // Build string for time
  let time_span = `${start + day1} - ${end + day2}`;

  let time = "";
  if (!endTime) time = `${start + day1}`;

  /**
   * Date
   */
  let month = startTime.split("-")[1];
  let day = startTime.split(" ")[0].split("-")[2];
  let year = startTime.split("-")[0];

  let short_date = month + "/" + day;
  let full_date = month + "/" + day + "/" + year;

  return ({
    time: time,
    time_span: time_span,
    hours: start1,
    short_date: short_date,
    full_date: full_date
  });
}

export const currentDate = () => {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let year = today.getFullYear();

  let full_date = year + '-' + month + '-' + day;

  return ({
    today: today,
    hours: today.getHours(),
    day: day,
    month: month,
    year: year,
    full_date: full_date
  });
}

/**
 * Set app darkmode
 */
export const setColorMode = () => {
  if (!localStorage.getItem("chakra-ui-color-mode"))
    localStorage.setItem("chakra-ui-color-mode", "dark");
  
  if (localStorage.getItem("chakra-ui-color-mode") === "light") 
    localStorage.setItem("chakra-ui-color-mode", "dark");
}
