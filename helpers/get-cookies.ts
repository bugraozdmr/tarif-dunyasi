"use server"; // Ensure this is used in a server context

import { cookies } from 'next/headers';

export default async function getCookies() {
  const cookiesList = cookies().getAll();
  return cookiesList;
}
