//7. For the questions asked in 2014, find any 3 "rare" questions that are associated with the least used tags
const client = require("./database");

const problem7 = async () => {
  await client.connect();
  const query = `select body as questions, tags
  from posts p
  inner join (SELECT tagname
              from tags
              order by count asc
              limit 10) t
  on p.tags like Concat('%', t.tagname, '%')
  where DATE_PART('year',creationdate) = 2014 and posttypeid = 1`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem7();
