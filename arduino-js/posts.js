const readFile = require("./readfile");
const client = require("./database.js");

async function posts() {
  const responsePosts = await readFile(
    "../arduino-stackexchange-data/Posts.xml",
    "posts"
  );
  client.connect();
  client.query(`CREATE TABLE IF NOT EXISTS posts
  (
    id integer NOT NULL,
    posttypeid integer,
    acceptedanswerid integer,
    parentid integer,
    creationdate timestamp without time zone,
    deletiondate timestamp without time zone,
    score integer,
    viewcount integer,
    body text,
    owneruserid integer,
    ownerdisplayname character varying(255),
    lasteditoruserid integer,
    lasteditordisplayname character varying(255),
    lasteditdate timestamp without time zone,
    lastactivitydate timestamp without time zone,
    title character varying(255),
    tags character varying(255),
    answercount integer,
    commentcount integer,
    favoritecount integer,
    closeddate timestamp without time zone,
    communityowneddate timestamp without time zone,
    contentlicense character varying(50)
  )`);

  for (const post of responsePosts) {
    const {
      Id,
      PostTypeId,
      AcceptedAnswerId,
      ParentId,
      CreationDate,
      DeletionDate,
      Score,
      ViewCount,
      Body,
      OwnerUserId,
      OwnerDisplayName,
      LastEditorUserId,
      LastEditorDisplayName,
      LastEditDate,
      LastActivityDate,
      Title,
      Tags,
      AnswerCount,
      CommentCount,
      FavoriteCount,
      ClosedDate,
      CommunityOwnedDate,
      ContentLicense,
    } = post.$;
    const query = {
      text: "INSERT INTO posts(Id,PostTypeId,AcceptedAnswerId,ParentId,CreationDate,DeletionDate,Score,ViewCount,Body,OwnerUserId,OwnerDisplayName,LastEditorUserId,LastEditorDisplayName,LastEditDate,LastActivityDate,Title,Tags,AnswerCount,CommentCount,FavoriteCount,ClosedDate,CommunityOwnedDate,ContentLicense) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)",
      values: [
        Id,
        PostTypeId,
        AcceptedAnswerId,
        ParentId,
        CreationDate,
        DeletionDate,
        Score,
        ViewCount,
        Body,
        OwnerUserId,
        OwnerDisplayName,
        LastEditorUserId,
        LastEditorDisplayName,
        LastEditDate,
        LastActivityDate,
        Title,
        Tags,
        AnswerCount,
        CommentCount,
        FavoriteCount,
        ClosedDate,
        CommunityOwnedDate,
        ContentLicense,
      ],
    };

    await client.query(query);
  }
  client.end();
//   console.log(responsePosts);
}

posts();
