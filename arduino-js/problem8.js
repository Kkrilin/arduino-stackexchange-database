// 8. When did arduino.stackexchange.com have the most usage? Has it declined in usage now? (somewhat open-ended question. Use your own interpretation of the question)

const client = require("./database");

const problem8 = async () => {
  await client.connect();

  //   using union
  const query = `select year, sum(count) as total
  from (
        select DATE_PART('year', v.creationdate) as year,count(*)
         from votes v
         group by year
         union
         select DATE_PART('year', c.creationdate) as year,count(*)
         from comments c
         group by year
         union
         select DATE_PART('year', p.creationdate) as year,count(*)
         from  posts p
         group by year
  )
  group by year
  order by total desc
  limit 1`;

  //    using innner join

  const query1 = `select pcc.year, (pcc.usage + vc.votecount) as totalusage
from (select pc.year, (pc.postcount + cc.commentcount) as usage
      from (select DATE_PART('year', p.creationdate) as year, count(*) as postcount
             from posts p
             group by year) pc
        inner join (select DATE_PART('year', c.creationdate) as year,count(*) as commentcount
                    from comments c
                    group by year) cc
      on pc.year = cc.year		   
      group by pc.year, pc.postcount + cc.commentcount) pcc
inner join (select DATE_PART('year', v.creationdate) as year,count(*) as votecount
            from votes v
            group by year) vc
on pcc.year = vc.year
order by totalusage desc
  limit 1`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem8();
