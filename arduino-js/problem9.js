// 9. Find the top 5 users who have performed the most number of actions in terms of creating posts, comments, votes. Calculate the score in the following way:
//     1. Each post carries 10 points
//     2. Each upvote / downvote carries 1 point
//     3. Each comment carries 3 points
const client = require("./database");

const problem8 = async () => {
  await client.connect();
  const query = `select u.id, (u.upvotes + u.downvotes) + a.score as score 
  from users u
  inner join( SELECT p.owneruserid ,c.score+p.score as score FROM (select owneruserid, count(*) * 10  as score 
                                                                   from posts
                                                                   GROUP by owneruserid) p
             inner join (SELECT userid, count(*) * 3 as score
                        from comments
                        where userid is not null
                        GROUP by userid) c
             on p.owneruserid = c.userid
                                          ) a
  on u.id = a.owneruserid
  where u.id <> -1 
  order by score
  desc limit 5`;

  const { rows: answer } = await client.query(query);
  console.log(answer);
  await client.end();
};

problem8();
