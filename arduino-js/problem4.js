// 4. Find the top 10 posts with the most upvotes in 2015?

const client = require("./database");

const problem4 = async () => {
  await client.connect();

  // this query give postid and upvotecount
  const query = `select postid as id , count(*) as vote_count
  from votes
  where votetypeid = 2 and DATE_PART('year',creationdate) = 2015
  group by postid
  order by vote_count DESC
  limit 10;`;

  // this query give all the information related to post
  const query1 = `select * from posts natural join (select postid as id , count(*) as vote_count
  from votes
  where votetypeid = 2 and DATE_PART('year',creationdate) = 2015
  group by postid
   order by vote_count DESC
  limit 10);`;
  const { rows: answer } = await client.query(query1);
  console.log(answer);
  await client.end();
};

problem4();
