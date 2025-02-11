"use server"; // 🚀 서버 액션임을 명시

import { revalidateTag } from "next/cache";

export async function revalidateMeetupTag() {
  revalidateTag("meetup");
}
