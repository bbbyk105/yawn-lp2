"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";

const COPIED_MESSAGE_MS = 2000;

export default function CopyLinkButton({
  url,
  className,
  tooltipClassName,
}: {
  url: string;
  className: string;
  tooltipClassName: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), COPIED_MESSAGE_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`${className} hover:bg-zinc-200`}
      aria-label="リンクをコピー"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
      <span className={tooltipClassName}>
        {isCopied ? "コピーしました" : "リンクをコピー"}
      </span>
    </button>
  );
}
