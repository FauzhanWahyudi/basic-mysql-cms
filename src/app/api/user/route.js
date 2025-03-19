import { comparePassword } from "@/helpers/hash";
import db from "@/lib/db";

export async function GET(req, res) {
  const data = await db.select("*");
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req, res) {
  const body = await req.json();
  let message = "";
  console.log("🚀 ~ POST ~ body:", body);
  const { name, password } = body;
  const [data] = await db.select("*", `tu.Username = '${name}'`);
  const [user] = data;

  console.log("🚀 ~ POST ~ user:", user);
  if (!user) {
    return new Response(JSON.stringify({ message: "LOGIN GAGAL" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const compare = await comparePassword(password, user.Password);
  if (!compare) {
    return new Response(JSON.stringify({ message: "LOGIN GAGAL" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "LOGIN SUKSES" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
