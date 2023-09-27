// 5. Find the top 5 tags associated with the most number of posts

const client = require("./database");

const problem5 = async () => {
  await client.connect();
  const query = `select DISTINCT tagname, count
  from tags
  order by count  DESC
  limit 5;;`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem5();
