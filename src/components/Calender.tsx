
// <CalendarPicker
// disabledDates={date => {
//   const inputYear = date.getFullYear();
//   const inputMonth = date.getMonth();
//   const inputDay = date.getDate();
//   console.log(inputMonth + 1);
//   return enableDates.some((item: any) => {
//     console.log('Month', item.getFullYear());
//     console.log(inputYear);
//     if (item.getFullYear() != inputYear) return true;

//     return (
//       item.getMonth() != inputMonth + 1 && item.getDate() != inputDay
//     );
//     return false;
//   });
//   return true;
//   // return enableDates.some(
//   //   (item: any) =>
//   //     item.getFullYear() != inputYear &&
//   //     item.getMonth() != inputMonth &&
//   //     item.getDate() != inputDay,
//   // );
// }}
// />