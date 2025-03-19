import hash from "@/helpers/hash";
import db from "@/lib/db";

export async function PUT(req, { params }, res) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, password } = body;
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const hashPassword = await hash(password);
    const data = await db.update(id, name, hashPassword, formattedDate);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("🚀 ~ PUT ~ error", error);
  }
}

export async function DELETE(req, { params }, res) {
  const { id } = params;
  console.log("🚀 ~ DELETE ~ id:", id);
  try {
    const data = await db.delete(id);
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error", error);
  }
}
