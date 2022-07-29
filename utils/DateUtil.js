export default class DateUtil {
    /* returns the displayed window's width */
    static getFormattedDate(date) {
        try {
            const newDate = new Date(date);
            return newDate.toLocaleString();
        } catch (e) {
            console.warn(`failed to parse the date {${date}}, returning it as-is ...`);
            return date;
        }
    }
}