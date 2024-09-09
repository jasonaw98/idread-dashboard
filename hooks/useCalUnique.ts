import { data, cleanedData } from "@/data/output";

interface Message {
    Account: string;
    Sender: string;
    Channel: string;
    Status: string;
    Recipient: string;
    Country: string;
    "Local Time": string;
    Direction: string;
    Content: string;
    "Part Number": number;
    "Total Parts": number;
}
export function calculateMessageStats() {
    const uniqueRecipients = new Set<string>();
    const recipientMessageCount: Record<string, number> = {};

    data.forEach((message) => {
        uniqueRecipients.add(message.Recipient);
        recipientMessageCount[message.Recipient as any] = Number(recipientMessageCount[message.Recipient as any] || 0) + 1;
    });
    const recipientMessageCountArray = Object.entries(recipientMessageCount).map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);

    return {
        uniqueUsers: uniqueRecipients.size,
        totalMessages: data.length,
        cleaned: cleanedData.length,
        recipientMessageCountArray
    };
}

export function calculateMessagesByMonth() {
    const messagesByMonth: Record<string, number> = {};
    const messagesByHour: Record<string, number> = {};

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    data.forEach((message) => {
        const date = new Date(message["Local Time"]);

        const month = monthNames[date.getMonth()]; // Get the month name
        const year = date.getFullYear();
        const monthYear = `${month}`; // Combine month name and year
        messagesByMonth[monthYear] = (messagesByMonth[monthYear] || 0) + 1;

        const hour = date.getHours(); // Get the hour (0-23)
        const hourString = `${hour}`; // Format hour as "HH:00 - HH:59"
        messagesByHour[hourString] = (messagesByHour[hourString] || 0) + 1;
    });

    return {messagesByMonth, messagesByHour};
}

