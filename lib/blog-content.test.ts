import { describe, expect, it } from "vitest";
import { processBlogContent } from "./blog-content";

const HOST = "hinokifragrance.com";

describe("processBlogContent", () => {
  describe("画像", () => {
    it("microCMS の画像に幅・WebP・画質の指定を付け、遅延読み込みにする", () => {
      const { html } = processBlogContent(
        '<p><img src="https://images.microcms-assets.io/assets/abc/photo.jpg" alt="ヒノキの森"></p>',
        HOST,
      );
      expect(html).toContain(
        'src="https://images.microcms-assets.io/assets/abc/photo.jpg?w=1200&fm=webp&q=80"',
      );
      expect(html).toContain('loading="lazy"');
      expect(html).not.toContain("aria-hidden");
    });

    it("w の指定がすでにある画像の URL は変えない", () => {
      const src = "https://images.microcms-assets.io/assets/abc/photo.jpg?w=600";
      const { html } = processBlogContent(`<img src="${src}" alt="a">`, HOST);
      expect(html).toContain(`src="${src}"`);
    });

    it("microCMS 以外の画像の URL は変えない", () => {
      const src = "https://example.org/photo.jpg";
      const { html } = processBlogContent(`<img src="${src}" alt="a">`, HOST);
      expect(html).toContain(`src="${src}"`);
      expect(html).toContain('loading="lazy"');
    });

    it("alt が空の画像は読み上げ対象から外す", () => {
      const { html } = processBlogContent(
        '<img src="https://example.org/a.jpg" alt="">',
        HOST,
      );
      expect(html).toContain('aria-hidden="true"');
    });
  });

  describe("リンク", () => {
    it("外部サイトへのリンクは別タブで開く", () => {
      const { html } = processBlogContent(
        '<a href="https://www.instagram.com/yawn.nap_">Instagram</a>',
        HOST,
      );
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });

    it("このサイト内へのリンクと相対リンクはそのまま", () => {
      const { html } = processBlogContent(
        `<a href="https://${HOST}/blog/hinoki">記事</a><a href="https://www.${HOST}/">www</a><a href="/blog">一覧</a>`,
        HOST,
      );
      expect(html).not.toContain("target=");
      expect(html).not.toContain("rel=");
    });

    it("ホスト名にこのサイトの名前を含むだけの別サイトは外部リンク", () => {
      const { html } = processBlogContent(
        `<a href="https://not${HOST}/">a</a><a href="https://${HOST}.evil.example/">b</a>`,
        HOST,
      );
      expect(html.match(/target="_blank"/g)).toHaveLength(2);
    });
  });

  describe("表", () => {
    it("表を横スクロール用の div で包む", () => {
      const { html } = processBlogContent(
        "<table><tbody><tr><td>1</td></tr></tbody></table>",
        HOST,
      );
      expect(html).toBe(
        '<div class="table-wrapper"><table><tbody><tr><td>1</td></tr></tbody></table></div>',
      );
    });

    it("すでに包んである表は二重に包まない", () => {
      const input =
        '<div class="table-wrapper"><table><tr><td>1</td></tr></table></div>';
      expect(processBlogContent(input, HOST).html).toBe(input);
    });
  });

  describe("目次", () => {
    it("h2・h3 を出てくる順に目次にし、id が無い見出しには付ける", () => {
      const { html, toc } = processBlogContent(
        '<h2 id="intro">はじめに</h2><p>本文</p><h3>香りの成分</h3><h2>使い方 &amp; 保管</h2>',
        HOST,
      );
      expect(toc).toEqual([
        { id: "intro", text: "はじめに", level: 2 },
        { id: "heading-1", text: "香りの成分", level: 3 },
        { id: "heading-2", text: "使い方 & 保管", level: 2 },
      ]);
      expect(html).toContain('<h3 id="heading-1">');
      expect(html).toContain('<h2 id="heading-2">');
    });

    it("見出しが無ければ目次は空", () => {
      expect(processBlogContent("<p>本文だけ</p>", HOST).toc).toEqual([]);
    });

    it("付けた id が本文の既存の id とぶつかったら、ずらして重複させない", () => {
      const { toc } = processBlogContent(
        '<h2>一つ目</h2><h2 id="heading-0">二つ目</h2><h3 id="dup">三つ目</h3><h3 id="dup">四つ目</h3>',
        HOST,
      );
      const ids = toc.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids[1]).toBe("heading-0");
    });
  });

  it("加工の対象が無い本文は変えない", () => {
    const input = "<p>富士山麓の<strong>ヒノキ</strong>。<br>深呼吸。</p>";
    expect(processBlogContent(input, HOST).html).toBe(input);
  });

  it("本文が未入力（microCMS がフィールドごと返さない）でも落ちずに空を返す", () => {
    expect(processBlogContent(undefined, HOST)).toEqual({ html: "", toc: [] });
  });

  it("閉じ忘れのタグやコメントがあっても中身を落とさない", () => {
    const { html } = processBlogContent(
      "<p>閉じ忘れの<strong>太字<p>次の段落</p><!-- メモ -->",
      HOST,
    );
    expect(html).toContain("<strong>太字");
    expect(html).toContain("<!-- メモ -->");
  });
});
