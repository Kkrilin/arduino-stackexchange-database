// 2. List the top 10 users who have the most reputation

const client = require("./database");

const problem2 = async () => {
  await client.connect();
  const query = `select id ,  reputation , displayname
  from users
  order by reputation desc
  limit 10;`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem2();
