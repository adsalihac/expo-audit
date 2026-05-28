import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Auth.js endpoint scaffolded. Wire provider configuration in production.",
      provider: "authjs",
    },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Auth.js endpoint scaffolded. Wire provider configuration in production.",
      provider: "authjs",
    },
    { status: 501 },
  );
}
