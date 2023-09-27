const readFile = require("./readfile");
const client = require("./database.js");

async function votes() {
  const responseVotes = await readFile(
    "../arduino-stackexchange-data/Votes.xml",
    "votes"
  );
  await client.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS votes
  (
      id integer,
      postid integer,
      votetypeid integer,
      creationdate timestamp without time zone
  )`);

  for (const vote of responseVotes) {
    const { Id, PostId, VoteTypeId, CreationDate } = vote.$;
    const query = {
      text: "INSERT INTO votes(id, postId, VoteTypeId, CreationDate) VALUES($1, $2, $3, $4)",
      values: [Id, PostId, VoteTypeId, CreationDate],
    };

    await client.query(query);
  }
  client.end();
}

votes();
