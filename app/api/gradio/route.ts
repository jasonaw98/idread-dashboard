import { NextResponse } from 'next/server';
import { Client } from "@gradio/client";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const client = await Client.connect(
      process.env.NEXT_ZYGY_GRADIO_URL!
    );
    const result = await client.predict("/chat", { message });
    
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error('Gradio API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
