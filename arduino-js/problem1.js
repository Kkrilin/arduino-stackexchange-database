// 1. What is the percentage of posts that have at least one answer?

const client = require("./database");


const problem1 = async () => {
  await client.connect();
  const query = `select (count(posttypeid) * 100 / (select count(posttypeid) from posts where posttypeid = 1)) as percentage
    from posts 
    where answercount >= 1;`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem1();
