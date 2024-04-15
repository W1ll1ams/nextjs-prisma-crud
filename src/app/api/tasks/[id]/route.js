import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req, { params }) {
  const task = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(task);
}

export async function PUT(req, { params }) {
  const newData = await req.json();
  const updatedTask = await prisma.task.update({
    where: { id: Number(params.id) },
    data: newData,
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(req, { params }) {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
