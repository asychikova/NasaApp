import moment from "moment";

export default function userLocationTime(serverTimer) {
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const correctTime = moment
    .parseZone(serverTimer)
    .local()
    .format("l hh:mm:ss");
  console.log(correctTime);

  return correctTime;
}
