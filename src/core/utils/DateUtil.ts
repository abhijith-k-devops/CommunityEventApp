
const MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

export function formatDate(date: Date): string {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return "";
    }

    const day = date.getDate();
    const month = MONTHS_SHORT[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export function formatTime(dateString: string) {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) {
        return "17:30";
    }
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}