import Link from "next/link";
import SectionLink from "./SectionLink";
import { HeaderShell, MobileMenuButton, MobileMenuPanel } from "./HeaderClient";
import { SHOP_URL } from "@/lib/site";

const SECTION_NAV_ITEMS = [
  { id: "products", label: "Products" },
  { id: "brand-story", label: "Story" },
  { id: "hinoki-story", label: "Hinoki" },
];

export default function Header() {
  return (
    <HeaderShell>
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="font-en-display text-2xl md:text-3xl text-hinoki-gold hover:opacity-80 transition-all duration-300"
          >
            YawnNap
          </Link>

          {/* デスクトップメニュー */}
          <ul className="hidden md:flex items-center gap-8">
            {SECTION_NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <SectionLink
                  sectionId={item.id}
                  className="font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-linear-to-r from-hinoki-gold to-amber-500 text-white font-en-accent text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-hinoki-gold/30 hover:scale-105"
              >
                Shop
              </a>
            </li>
          </ul>

          {/* モバイルメニューボタン */}
          <MobileMenuButton />
        </div>

        {/* モバイルメニュー */}
        <MobileMenuPanel>
          <ul className="space-y-4">
            {SECTION_NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <SectionLink
                  sectionId={item.id}
                  className="block w-full text-left font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="block w-full text-left font-en-accent text-sm tracking-wider uppercase text-zinc-600 hover:text-hinoki-gold transition-colors duration-300"
              >
                Blog
              </Link>
            </li>
            <li className="pt-4">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 bg-linear-to-r from-hinoki-gold to-amber-500 text-white font-en-accent text-xs tracking-wider uppercase rounded-full hover:shadow-lg hover:shadow-hinoki-gold/30 transition-all duration-300"
              >
                Shop
              </a>
            </li>
          </ul>
        </MobileMenuPanel>
      </nav>
    </HeaderShell>
  );
}
