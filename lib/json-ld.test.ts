import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "./json-ld";

describe("serializeJsonLd", () => {
  it("記事タイトルに </script> が入っていても script タグを閉じない", () => {
    const html = serializeJsonLd({
      headline: "まとめ</script><script>alert(1)</script>",
    });
    expect(html).not.toContain("</script>");
    expect(html).not.toContain("<");
  });

  it("JSON として読み戻すと元の値に戻る", () => {
    const data = {
      "@context": "https://schema.org",
      headline: "富士ヒノキ <香り> & 森林浴",
    };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });
});
