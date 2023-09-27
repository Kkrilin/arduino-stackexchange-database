const readFile = require("./readfile");
const client = require("./database.js");

async function comments() {
  const responseComments = await readFile(
    "../arduino-stackexchange-data/Comments.xml",
    "comments"
  );
  console.log(responseComments);
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS comments(
        id integer NOT NULL,
        postid integer,
        score integer,
        text text,
        creationdate timestamp without time zone,
        userdisplayname character varying(255),
        userid integer,
        contentlicense character varying(50)
     );`);

  for (const comment of responseComments) {
    const {
      Id,
      PostId,
      Score,
      Text,
      CreationDate,
      UserDisplayName,
      UserId,
      ContentLicense,
    } = comment.$;

    const query = {
      text: "INSERT INTO comments(id, postid, score, text, creationdate, userdisplayname, userid, contentLicense) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        Id,
        PostId,
        Score,
        Text,
        CreationDate,
        UserDisplayName,
        UserId,
        ContentLicense,
      ],
    };

    await client.query(query);
  }
  client.end();
}

comments();
