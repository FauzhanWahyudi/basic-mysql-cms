import hash from "@/helpers/hash";
import db from "@/lib/db";

export async function POST(req, res) {
  const body = await req.json();
  let message = "";
  console.log("🚀 ~ POST ~ body:", body);
  const { name, password } = body;
  try {
    const hashPassword = await hash(password);
    const result = await db.insert([name, hashPassword, new Date()]);
    console.log("🚀 ~ POST ~ result:", result);
    return new Response(JSON.stringify({ message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
  }
}
