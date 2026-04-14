import { redirect } from "next/navigation";

// El sign-up se maneja exclusivamente vía modal desde el Header.
// Cualquier navegación directa a /sign-up vuelve al inicio.
export default function Page() {
  redirect("/");
}
