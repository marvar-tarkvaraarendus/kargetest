import prisma from "./prisma";
import { type MultiLang } from "./utils";

// Types
export interface CookieData {
  id: string;
  slug: string;
  price: string;
  imagePath: string;
  name: MultiLang;
  description: MultiLang;
  ingredients: MultiLang;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpeningTimesData {
  id: string;
  content: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  updatedAt: Date;
}

// Cookie operations
export async function getAllCookies(): Promise<CookieData[]> {
  const cookies = await prisma.cookie.findMany({
    orderBy: { createdAt: "desc" },
  });
  return cookies as CookieData[];
}

export async function getCookieBySlug(slug: string): Promise<CookieData | null> {
  const cookie = await prisma.cookie.findUnique({
    where: { slug },
  });
  return cookie as CookieData | null;
}

export async function getCookieById(id: string): Promise<CookieData | null> {
  const cookie = await prisma.cookie.findUnique({
    where: { id },
  });
  return cookie as CookieData | null;
}

export async function createCookie(data: {
  slug: string;
  price: string;
  imagePath: string;
  name: MultiLang;
  description: MultiLang;
  ingredients: MultiLang;
}): Promise<CookieData> {
  const cookie = await prisma.cookie.create({
    data,
  });
  return cookie as CookieData;
}

export async function updateCookie(
  id: string,
  data: Partial<{
    slug: string;
    price: string;
    imagePath: string;
    name: MultiLang;
    description: MultiLang;
    ingredients: MultiLang;
  }>
): Promise<CookieData> {
  const cookie = await prisma.cookie.update({
    where: { id },
    data,
  });
  return cookie as CookieData;
}

export async function deleteCookie(id: string): Promise<void> {
  await prisma.cookie.delete({
    where: { id },
  });
}

// Opening Times operations
export async function getOpeningTimes(): Promise<OpeningTimesData | null> {
  const times = await prisma.openingTimes.findUnique({
    where: { id: "default" },
  });
  return times as OpeningTimesData | null;
}

export async function updateOpeningTimes(
  content: OpeningTimesData["content"]
): Promise<OpeningTimesData> {
  const times = await prisma.openingTimes.upsert({
    where: { id: "default" },
    update: { content },
    create: { id: "default", content },
  });
  return times as OpeningTimesData;
}
