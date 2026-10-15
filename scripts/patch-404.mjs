// The exported 404.html comes from Next's root not-found, outside the locale layout. Add a tiny
// redirect so links to products added after the last build open their live page instead of a 404.
import { readFileSync, writeFileSync } from "node:fs";
const file = new URL("../out/404.html", import.meta.url);
const tag = `<script>(function(){var m=location.pathname.match(/^\\/(ar|en)\\/products\\/([^/?#]+)/);if(m)location.replace("/"+m[1]+"/p?h="+m[2]);})();</script>`;
const html = readFileSync(file, "utf8");
if (!html.includes("/p?h=")) writeFileSync(file, html.replace("<head>", "<head>" + tag));
