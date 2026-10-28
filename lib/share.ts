export interface ShareLink {
  service: "x" | "facebook" | "line";
  /** aria-label 用（「〇〇でシェア」） */
  label: string;
  /** ホバーで出す吹き出し */
  tooltip: string;
  href: string;
}

/** 記事を SNS でシェアするリンク */
export function getShareLinks(title: string, url: string): ShareLink[] {
  return [
    {
      service: "x",
      label: "Twitter",
      tooltip: "Xでシェア",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      service: "facebook",
      label: "Facebook",
      tooltip: "Facebookでシェア",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`,
    },
    {
      service: "line",
      label: "LINE",
      tooltip: "LINEでシェア",
      href: `https://line.me/R/msg/text/?${encodeURIComponent(
        `${title} ${url}`,
      )}`,
    },
  ];
}
