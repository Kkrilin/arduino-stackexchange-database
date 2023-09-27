// 3. Which day of the week has most questions answered within an hour?

const client = require("./database");

const problem3 = async () => {
  await client.connect();
  const query = `select to_char(p1.creationdate,'day') as nameofday, count(*)  
  from posts p1
  inner join posts p2
  on p1.parentid = p2.id
  where p1.parentid is not null and p1.posttypeid = 2 
  and DATE_PART('year', p1.creationdate) - DATE_PART('year', p2.creationdate) = 0
  AND DATE_PART('month', p1.creationdate) - DATE_PART('month', p2.creationdate) = 0
  and DATE_PART('day', p1.creationdate) - DATE_PART('day', p2.creationdate) = 0
  and DATE_PART('hour', p1.creationdate) - DATE_PART('hour', p2.creationdate) = 0
  group by nameofday
  order by count desc
  limit 1;`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem3();
