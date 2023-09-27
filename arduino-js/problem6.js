// 6. Find the number of questions asked every year

const client = require("./database");

const problem6 = async () => {
  await client.connect();
  const query = `SELECT DATE_PART('year',creationdate)
  as year, count(*) as questionCount
 from posts
 where posttypeid = 1
 group by year
 order by year ASC;`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem6();
