"use server";
import { createClient } from "@/utils/supabase/server";

export async function whatsappData() {
  const supabase = createClient();
  const { data: chats, error } = await (await supabase)
    .from("whatsapp")
    .select("*")
    .order("sent_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return chats?.map((item) => ({
    userId: item.userId,
    userName: item.userName,
    sent_at: item.sent_at, // Convert Date to string
    received_at: item.received_at, // Convert Date to string
    message_sent: item.message_sent,
    message_received: item.message_received,
  }));
  // return JSON.parse(JSON.stringify(chats))
}

export async function whatsappStats() {
  const supabase = createClient();
  const { data, error, count } = await (await supabase)
    .from("whatsapp")
    .select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    const uniqueRecipients = new Set<string>();
    const recipientMessageCount: Record<string, number> = {};
    const recipientNames: Record<string, string> = {};
    const messagesByMonth: Record<string, number> = {};
  const messagesByHour: Record<string, number> = {};

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

    data.forEach((message) => {
      uniqueRecipients.add(message.userId);
      recipientMessageCount[message.userId as any] =
        Number(recipientMessageCount[message.userId as any] || 0) + 1;
      recipientNames[message.userId] = message.userName;

      const date = new Date(message.sent_at);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const monthName = localDate.toLocaleString('default', { month: 'long' });
      messagesByMonth[monthName] = (messagesByMonth[monthName] || 0) + 1;

      const hour = localDate.getHours(); // Get the hour (0-23)
      messagesByHour[hour] = (messagesByHour[hour] || 0) + 1;
    });

    const recipientMessageCountArray = Object.entries(recipientMessageCount)
      .map(([key, value]) => ({
        key: key,
        value: value,
        name: recipientNames[key],
      }))
      .sort((a, b) => b.value - a.value);

    return {
      uniqueUsers: uniqueRecipients.size,
      totalMessages: data.length,
      recipientMessageCountArray,
      messagesByMonth,
      messagesByHour
    };
  }
}