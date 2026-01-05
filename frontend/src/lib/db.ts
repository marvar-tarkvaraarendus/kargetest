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

// Contact Info types and operations
export interface ContactInfoData {
  id: string;
  phone: string;
  email: string;
  updatedAt: Date;
}

export async function getContactInfo(): Promise<ContactInfoData | null> {
  const info = await prisma.contactInfo.findUnique({
    where: { id: "default" },
  });
  return info as ContactInfoData | null;
}

export async function updateContactInfo(data: {
  phone: string;
  email: string;
}): Promise<ContactInfoData> {
  const info = await prisma.contactInfo.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  return info as ContactInfoData;
}

// About Story types and operations
export interface AboutStoryData {
  id: string;
  title: MultiLang;
  content: MultiLang;
  updatedAt: Date;
}

export async function getAboutStory(): Promise<AboutStoryData | null> {
  const story = await prisma.aboutStory.findUnique({
    where: { id: "default" },
  });
  return story as AboutStoryData | null;
}

export async function updateAboutStory(data: {
  title: MultiLang;
  content: MultiLang;
}): Promise<AboutStoryData> {
  const story = await prisma.aboutStory.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  return story as AboutStoryData;
}
