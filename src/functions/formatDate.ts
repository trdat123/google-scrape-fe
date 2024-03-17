function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Format the date
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Add suffix to day
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
    } else if (day === 2 || day === 22) {
        suffix = "nd";
    } else if (day === 3 || day === 23) {
        suffix = "rd";
    }

    return `${month} ${day}${suffix} - ${hours}:${minutes}`;
}

export default formatDate;
