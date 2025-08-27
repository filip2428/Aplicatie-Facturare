import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GhostButton({
  children,
  href,
  textSize,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  textSize: string;
}) {
  return (
    <Button variant="ghost" asChild className={`text-${textSize}`} {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
