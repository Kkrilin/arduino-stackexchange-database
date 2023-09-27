const readFile = require("./readfile");
const client = require("./database.js");

async function badges() {
  const responsebadges = await readFile(
    "../arduino-stackexchange-data/Badges.xml",
    "badges"
  );
  //   console.log(client);
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS badges(
        Id integer NOT NULL,
        user_id integer,
        name character varying(255),
        date timestamp without time zone,
        class integer,
        tag_based boolean
     )`);

  for (const badge of responsebadges) {
    const { Id, UserId, Name, Date, Class, TagBased } = badge.$;

    const query = {
      text: "INSERT INTO badges(id, user_id, name, date, class, tag_based) VALUES($1, $2, $3, $4, $5, $6)",
      values: [
        Id,
        UserId,
        Name,
        Date,
        Class,
        TagBased === "True" ? true : false,
      ],
    };

    await client.query(query);
  }
  client.end();
  //   console.log(responsebadges);
}

badges();
