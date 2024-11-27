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

    return NextResponse.json({
      message: responseData.answer,
      status: "success"
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
