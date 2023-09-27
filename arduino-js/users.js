const readFile = require("./readfile");
const client = require("./database.js");

async function users() {
  const responseUsers = await readFile(
    "../arduino-stackexchange-data/Users.xml",
    "users"
  );
  client.connect();
  client.query(`CREATE TABLE IF NOT EXISTS users
  (
    id integer,
    reputation integer,
    creationdate timestamp without time zone,
    displayname character varying(255),
    lastaccessdate timestamp without time zone,
    websiteurl character varying(255),
    location character varying(255),
    aboutme text,
    views integer,
    upvotes integer,
    downvotes integer,
    profileimageurl character varying(255),
    accountid integer,
    emailhash "char"
  )`);

  for (const user of responseUsers) {
    const {
      Id = null,
      Reputation = null,
      CreationDate = null,
      DisplayName = null,
      LastAccessDate = null,
      WebsiteUrl = null,
      Location = null,
      AboutMe = null,
      Views = null,
      UpVotes = null,
      DownVotes = null,
      ProfileImageUrl = null,
      EmailHash = null,
      AccountId = null,
    } = user.$;
    const query = {
      text: "INSERT INTO users(id, reputation, creationDate , displayName , lastAccessDate, websiteUrl , location , aboutMe, views , upVotes , downVotes , profileImageUrl , emailHash , accountId ) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
      values: [
        Id,
        Reputation,
        CreationDate,
        DisplayName,
        LastAccessDate,
        WebsiteUrl,
        Location,
        AboutMe,
        Views,
        UpVotes,
        DownVotes,
        ProfileImageUrl,
        EmailHash,
        AccountId,
      ],
    };

    await client.query(query);
  }
  client.end();
}

users();
