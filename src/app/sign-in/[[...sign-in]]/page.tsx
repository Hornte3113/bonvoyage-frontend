import { redirect } from "next/navigation";

// El sign-in se maneja exclusivamente vía modal desde el Header.
// Cualquier navegación directa a /sign-in vuelve al inicio.
export default function Page() {
  redirect("/");
}
