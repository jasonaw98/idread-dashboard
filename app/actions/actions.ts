"use server";
import { createClient } from "@/utils/supabase/server";

export async function whatsappData(start: number | 0, end: number | 9) {
  const supabase = createClient();
  const { data: chats, error } = await (await supabase)
    .from("whatsapp")
    .select("*")
    .order("sent_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.error("Error fetching data:", error);
  }

  return chats?.map((item) => ({
    userId: item.userId,
    userName: item.userName,
    sent_at: item.sent_at,
    received_at: item.received_at,
    message_sent: item.message_sent,
    message_received: item.message_received,
  }));
  // return JSON.parse(JSON.stringify(chats))
}

export async function searchFilter(query: string) {
  const supabase = createClient();
  const { data: chats, error } = await (await supabase)
    .from("whatsapp")
    .select("*")
    .order("sent_at", { ascending: false })
    .or(
      `userName.ilike.%${query}%, message_sent.ilike.%${query}%, message_received.ilike.%${query}%`
    );
  // .ilike('userName', '%jason%')

  if (error) {
    console.error("Error fetching data:", error);
  }

  return chats?.map((item) => ({
    userId: item.userId,
    userName: item.userName,
    sent_at: item.sent_at,
    received_at: item.received_at,
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

    data.forEach((message) => {
      uniqueRecipients.add(message.userId);
      recipientMessageCount[message.userId as any] =
        Number(recipientMessageCount[message.userId as any] || 0) + 1;
      recipientNames[message.userId] = message.userName;

      const localDate = new Date(message.sent_at).toLocaleString("en-US", {
        timeZone: "Asia/Kuala_Lumpur",
      });
      const monthName = new Date(localDate).toLocaleString("en-US", {
        month: "long",
      });
      messagesByMonth[monthName] = (messagesByMonth[monthName] || 0) + 1;

      const hour = new Date(localDate).getHours();
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
      messagesByHour,
    };
  }
}

export async function chatbot(message: string) {
  try {
    var formdata = new FormData();
    formdata.append("apikey", process.env.NEXT_ZYGY_API_KEY as string);
    formdata.append(
      "serviceAccount",
      process.env.NEXT_ZYGY_SERVICE_ACCOUNT as string
    );
    formdata.append("keyword", message as string);
    const zygyResponse = await fetch(process.env.NEXT_ZYGY_URL as string, {
      method: "POST",
      body: formdata,
    });

    const responseData = await zygyResponse.json();

    return {
      message: responseData.answer,
      status: "success",
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: "Internal Server Error", status: 500 };
  }
}
