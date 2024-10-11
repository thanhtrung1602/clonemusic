"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { slug } = useParams();
  console.log(slug);
}
