export const runtime = 'edge'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
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

    // Create a ReadableStream for streaming the response
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(JSON.stringify({
          message: responseData.answer,
          status: "success"
        }));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 500 });
  }
}
