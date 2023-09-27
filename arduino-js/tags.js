const readFile = require("./readfile");
const client = require("./database.js");

async function tags() {
  const responseTags = await readFile(
    "../arduino-stackexchange-data/Tags.xml",
    "tags"
  );
  client.connect();
  client.query(`CREATE TABLE IF NOT EXISTS tags
  (
      id integer,
      tagname character varying(255),
      count integer,
      excerptpostid integer,
      wikipostid integer
  )`);

  for (const tag of responseTags) {
    const { Id, TagName, Count, ExcerptPostId, WikiPostId } = tag.$;
    const query = {
      text: "INSERT INTO tags(id, tagname, count, excerptPostId, wikiPostId) VALUES($1, $2, $3, $4, $5)",
      values: [Id, TagName, Count, ExcerptPostId, WikiPostId],
    };

    await client.query(query);
  }
  client.end();
  console.log(responseTags);
}

tags();
