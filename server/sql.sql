"message": "execute s40: INSERT integerO \"public\".\"posts\" (\"slug\",\"count\") VALUES ($1,$2) ON CONFLICT (\"slug\") DO UPDATE SET \"count\" = (\"public\".\"posts\".\"count\" + $3) WHERE (\"public\".\"posts\".\"slug\" = $4 AND 1=1) RETURNING \"public\".\"posts\".\"id\", \"public\".\"posts\".\"slug\", \"public\".\"posts\".\"count\"",
"detail": "parameters: $1 = '2022', $2 = '1', $3 = '1', $4 = '2022'",
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on tables from authenticated;
alter default privileges in schema public revoke all on functions from anon;
alter default privileges in schema public revoke all on functions from authenticated;

revoke select on all tables in schema public from anon;
revoke select on all tables in schema public from authenticated;
revoke usage on all sequences in schema public from anon;
revoke usage on all sequences in schema public from authenticated;
revoke execute on all functions in schema public from anon;
revoke execute on all functions in schema public from authenticated;

INSERT integerO
    "public"."posts" ("slug", "count")
VALUES ($1, $2) ON CONFLICT ("slug")
DO
UPDATE
SET
    "count" = ("public"."posts"."count" + $3)
WHERE (
        "public"."posts"."slug" = $4
        AND 1 = 1
    ) RETURNING "public"."posts"."id",
    "public"."posts"."slug",
    "public"."posts"."count"
    
INSERT integerO
    "public"."User" ("name", "isAdmin", "image")
VALUES ($1, $2, $3) RETURNING "public"."User"."id",
    "public"."User"."name",
    "public"."User"."email",
    "public"."User"."emailVerified",
    "public"."User"."isAdmin",
    "public"."User"."image" 
    $1 = 'Kyle',
    $2 = 'f',
    $3 = 'https://shorturl.at/chJK1' 
    
INSERT integerO
    "public"."User" ("name", "isAdmin", "image")
VALUES ($1, $2, $3) RETURNING "public"."User"."id",
    "public"."User"."name",
    "public"."User"."email",
    "public"."User"."emailVerified",
    "public"."User"."isAdmin",
    "public"."User"."image" 2023 -08 -08 19: 35: 21.027 + 08 [8743] DETAIL: parameters: $1 = 'Sally',
    $2 = 'f',
    $3 = 'https://shorturl.at/chJK1' 2023 -08 -08 19: 35: 21.028 + 08 [8743] LOG:
execute s7:
INSERT integerO
    "public"."posts" ("slug", "count")
VALUES ($1, $2) RETURNING "public"."posts"."id",
    "public"."posts"."slug",
    "public"."posts"."count" 2023 -08 -08 19: 35: 21.028 + 08 [8743] DETAIL: parameters: $1 = '2022',
    $2 = '1' 2023 -08 -08 19: 35: 21.030 + 08 [8743] LOG:
execute s8:
INSERT integerO
    "public"."comments" (
        "text",
        "createdAt",
        "updatedAt",
        "uid",
        "slug"
    )
VALUES ($1, $2, $3, $4, $5) RETURNING "public"."comments"."id",
    "public"."comments"."text",
    "public"."comments"."createdAt",
    "public"."comments"."updatedAt",
    "public"."comments"."uid",
    "public"."comments"."parentId",
    "public"."comments"."slug" 2023 -08 -08 19: 35: 21.030 + 08 [8743] DETAIL: parameters: $1 = 'I am a root comments',
    $2 = '2023-08-08 19:35:21.028+08',
    $3 = '2023-08-08 19:35:21.03+08',
    $4 = '0n3ZsC8Qht9I1UYj',
    $5 = '2022' 2023 -08 -08 19: 35: 21.031 + 08 [8743] LOG:
execute s9:
INSERT integerO
    "public"."comments" (
        "text",
        "createdAt",
        "updatedAt",
        "uid",
        "parentId",
        "slug"
    )
VALUES ($1, $2, $3, $4, $5, $6) RETURNING "public"."comments"."id",
    "public"."comments"."text",
    "public"."comments"."createdAt",
    "public"."comments"."updatedAt",
    "public"."comments"."uid",
    "public"."comments"."parentId",
    "public"."comments"."slug" 2023 -08 -08 19: 35: 21.031 + 08 [8743] DETAIL: parameters: $1 = 'I am a nested comments',
    $2 = '2023-08-08 19:35:21.031+08',
    $3 = '2023-08-08 19:35:21.031+08',
    $4 = 'jLbpUwLpTlVfOcPœ',
    $5 = 'œU7MZGci6cdOe5Km',
    $6 = '2022' 
    
---->    
INSERT integerO
    "public"."comments" (
        "text",
        "createdAt",
        "updatedAt",
        "uid",
        "slug"
    )
VALUES ($1, $2, $3, $4, $5) RETURNING "public"."comments"."id",
    "public"."comments"."text",
    "public"."comments"."createdAt",
    "public"."comments"."updatedAt",
    "public"."comments"."uid",
    "public"."comments"."parentId",
    "public"."comments"."slug" 2023 -08 -08 19: 35: 21.032 + 08 [8743] DETAIL: parameters: $1 = 'I am a mothafuckin hustla',
    $2 = '2023-08-08 19:35:21.031+08',
    $3 = '2023-08-08 19:35:21.032+08',
    $4 = 'jLbpUwLpTlVfOcPœ',
    $5 = '2022'
DELETE FROM
    "public"."comments"
WHERE (
        "public"."comments"."id" IN ($1)
        AND (
            "public"."comments"."id" = $2
            AND 1 = 1
        )
    ) $1 = '8QgyEcF6e∑1xjuAn',
    $2 = '8QgyEcF6e∑1xjuAn'
    
    
SELECT
    "public"."comments"."id",
    "public"."comments"."slug",
    "public"."comments"."text",
    "public"."comments"."parentId",
    "public"."comments"."createdAt",
    "public"."comments"."uid",
    "aggr_selection_0_Like"."_aggr_count_likes"
FROM "public"."comments"
    LEFT JOIN (
        SELECT
            "public"."Like"."commentId",
            COUNT(*) AS "_aggr_count_likes"
        FROM "public"."Like"
        WHERE 1 = 1
        GROUP BY
            "public"."Like"."commentId"
    ) AS "aggr_selection_0_Like" ON (
        "public"."comments"."id" = "aggr_selection_0_Like"."commentId"
    )
WHERE
    "public"."comments"."slug" IN ($1)
ORDER BY
    "public"."comments"."createdAt" DESC
OFFSET $2

SELECT
    "public"."User"."id",
    "public"."User"."name",
    "public"."User"."image"
FROM "public"."User"
WHERE
    "public"."User"."id" IN ($1)
OFFSET $2
SELECT
    "public"."Like"."uid",
    "public"."Like"."commentId"
FROM "public"."Like"
WHERE (
        "public"."Like"."uid" = $1
        AND "public"."Like"."commentId" IN ($2)
    )
OFFSET $3

SELECT 1
SELECT
    "public"."Session"."id",
    "public"."Session"."sessionToken",
    "public"."Session"."uid",
    "public"."Session"."expires"
FROM "public"."Session"
WHERE (
        "public"."Session"."sessionToken" = $1
        AND 1 = 1
    )
LIMIT $2
OFFSET $3
SELECT
    "public"."User"."id",
    "public"."User"."name",
    "public"."User"."email",
    "public"."User"."emailVerified",
    "public"."User"."role",
    "public"."User"."image"
FROM "public"."User"
WHERE
    "public"."User"."id" IN ($1)
OFFSET $2

SELECT
    "public"."posts"."id",
    "public"."posts"."count",
    "public"."posts"."slug",
    "aggr_selection_0_comments"."_aggr_count_commentss"
FROM "public"."posts"
    LEFT JOIN (
        SELECT
            "public"."comments"."slug",
            COUNT(*) AS "_aggr_count_commentss"
        FROM
            "public"."comments"
        WHERE 1 = 1
        GROUP BY
            "public"."comments"."slug"
    ) AS "aggr_selection_0_comments" ON (
        "public"."posts"."slug" = "aggr_selection_0_comments"."slug"
    )
WHERE (
        "public"."posts"."slug" = $1
        AND 1 = 1
    )
LIMIT $2
OFFSET $3


SELECT
    "public"."comments"."id",
    "public"."comments"."slug",
    "public"."comments"."text",
    "public"."comments"."parentId",
    "public"."comments"."createdAt",
    "public"."comments"."uid",
    "aggr_selection_0_Like"."_aggr_count_likes"
FROM "public"."comments"
    LEFT JOIN (
        SELECT
            "public"."Like"."commentId",
            COUNT(*) AS "_aggr_count_likes"
        FROM "public"."Like"
        WHERE 1 = 1
        GROUP BY
            "public"."Like"."commentId"
    ) AS "aggr_selection_0_Like" ON (
        "public"."comments"."id" = "aggr_selection_0_Like"."commentId"
    )
WHERE
    "public"."comments"."slug" IN ($1)
ORDER BY
    "public"."comments"."createdAt" DESC
OFFSET $2
SELECT
    "public"."User"."id",
    "public"."User"."name",
    "public"."User"."image"
FROM "public"."User"
WHERE
    "public"."User"."id" IN ($1)
OFFSET $2
SELECT
    "public"."Like"."uid",
    "public"."Like"."commentId"
FROM "public"."Like"
WHERE (
        "public"."Like"."uid" = $1
        AND "public"."Like"."commentId" IN ($2)
    )
OFFSET $3

----->

drop view if exists "asUserVotes", "ascommentsThreads", "asVoteTally", "asFlatMap", "UserComments" cascade;

drop function if exists handle_new_user cascade;
drop table if exists "posts", "profiles", "comments", "votes" cascade;

-- VIEWCOUNTER
CREATE TABLE posts (
  id serial primary key not null,
  slug text UNIQUE NOT NULL,
  counter integer DEFAULT 1 NOT NULL,
  last_count timestamp with time zone default timezone('utc'::text, now()) not null

);


CREATE OR REPLACE FUNCTION pagecounter(page_slug TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT FROM posts WHERE slug = page_slug) THEN
        UPDATE posts
        SET counter = counter + 1    
        WHERE slug = page_slug;
    ELSE
        INSERT into posts(slug) VALUES (page_slug);
    END IF;
END;
$$;

-- Create a table for Public profiles
create table profiles (
  "uid" uuid primary key not null references auth.users,
  last_sign_in timestamp with time zone default timezone('utc'::text, now()) not null,
  "name" text unique,
  mugshot text,
  email text unique

);

alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for
select using (true);
create policy "Users can insert their own profiles." on profiles for
insert with check (auth.uid() = "uid");
create policy "Users can update own profiles." on profiles for
update using (auth.uid() = "uid");

-- Create a trigger to sync profiles and auth.users
create or replace function public.handle_new_user() returns trigger as $$ begin
insert into public.profiles ("uid", "name", mugshot, email)
values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'email'
  );
return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();


-- Create a table for postss
create table comments (
    "cid" serial primary key not null,
    slug text not null references posts (slug),
    "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
    "updatedAt" timestamp with time zone default timezone('utc'::text, now()) null,
    body text not null check (length(body) between 1 and 2000),
    "uid" uuid not null references profiles ("uid"),
    "parentId" integer null references comments ("cid"),
    "isPinned" boolean default false not null,
    "isDeleted" boolean default false not null

);


-- for fast look-up by each comment's slug
create index comments_slug_idx on comments (slug);
-- optimize finding by parent comment
create index comments_parent_idx on comments ("parentId");

-- Create a table for votes
create table votes (
    "cid" integer not null references comments ("cid"),
    "uid" uuid not null references profiles ("uid"),
    "value" integer not null,
    primary key ("cid", "uid"),
    constraint vote_quantity check (value <= 1 and value >= -1)
);

alter table votes enable row level security;

create policy "Votes are viewable by everyone"
    on votes for select
    using ( true );

create policy "Users can vote as themselves"
    on votes for insert
    with check (auth.uid() = "uid");

create policy "Users can update their own votes"
    on votes for update
    using ( auth.uid() = "uid" );
    
--tests    

---> WORKS
create or replace function "commentTree"(
  "cid" int
) returns json as $$
  select json_build_object(
    
    --- NOTE!!: Double-quoted strings must still be used iunside of single-quote constants
    '"cid"', c."cid",
    '"user"', json_build_object(
      '"name"', u."name",
      '"mugshot"', u.mugshot,
      '"uid"', u."uid"
    ),
    '"body"', body,
    '"createdAt"', c."createdAt",
    '"replies"', replies
  )
  from comments c
    left join profiles u using("uid"),
    lateral (
      select
        coalesce(json_agg(
          "commentTree"(comments."cid")
          order by "createdAt" asc
        ), '[]') as replies
      from comments
      where "parentId" = c."cid"
    ) as get_replies
  where
    c."cid" = "commentTree"."cid"
$$ language sql stable;



create function "threadedComments"(
  slug text
) returns json as $$
  select
    coalesce(json_agg(
      "commentTree"("cid")
      order by c."createdAt" desc
    ), '[]') as comments
  from comments c
  where c."parentId" is null
    and c.slug = "threadedComments".slug
$$ language sql stable;

---> WORKS| JSONB
create or replace function "commentTreeJSONB"(
  "cid" int
) returns jsonb as $$
  select jsonb_build_object(
    
    --- NOTE!!: Double-quoted strings must still be used iunside of single-quote constants
    '"cid"', c."cid",
    '"user"', jsonb_build_object(
      '"name"', u."name",
      '"mugshot"', u.mugshot,
      '"uid"', u."uid"
    ),
    '"body"', body,
    '"createdAt"', c."createdAt",
    '"replies"', replies
  )
  from comments c
    left join profiles u using("uid"),
    lateral (
      select
        coalesce(jsonb_agg(
          "commentTreeJSONB"(comments."cid")
          order by "createdAt" asc
        ), '[]') as replies
      from comments
      where "parentId" = c."cid"
    ) as get_replies
  where
    c."cid" = "commentTreeJSONB"."cid"
$$ language sql stable;

create or replace function "threadedCommentsJSONB"(
  slug text
) returns jsonb as $$
  select
    coalesce(jsonb_agg(
      "commentTreeJSONB"("cid")
      order by c."createdAt" desc
    ), '[]') as comments
  from comments c
  where c."parentId" is null
    and c.slug = "threadedCommentsJSONB".slug
$$ language sql stable;

create or replace view "totalViews" as
select sum(view_count)
from posts
;

create or replace function "viewsBySlug" returns table(slug text, total_views int) as $$
  select
    slug,
    sum(view_count) as total_views,
  from posts
  group by slug
  order by total_views desc
$$ language sql stable;

---=>

drop view if exists "asUserVotes";
drop view if exists "ascommentsThreads";
drop view if exists "asVoteTally";
drop view if exists "asFlatMap";
drop view if exists "UserComments";

create view "UserComments" as
    select
        c."cid",
        c.slug,
        c."createdAt",
        c."updatedAt",
        c.body,
        c."uid",
        c."parentId",
        c."isPinned",
        c."isDeleted",
        to_jsonb(u) as author
    from
        comments c
        inner join profiles u on c."uid" = u.uid;

create view "asFlatMap" as
    select
        root_c.*,
        to_jsonb(parent_c) as parent,
        coalesce(json_agg(replies_c) filter (where replies_c.id is not null), '[]') as replies
    from
        "UserComments" root_c
        inner join "UserComments" parent_c on root_c."parentId" = parent_c.id
        --inner join sites s1 on s1.id = root_c.
        left join "UserComments" replies_c on replies_c."parentId" = root_c.id
    group by
        root_c.id,
        root_c.slug,
        root_c."createdAt",
        root_c."updatedAt",
        root_c.body,
        root_c."uid",
        root_c."parentId",
        root_c."isPinned",
        root_c."isDeleted",
        root_c.author,
        parent_c.*;

create or replace view "asVoteTally" as
    select
        c.id,
        c.slug,
        c."createdAt",
        c."updatedAt",
        c.body,
        c."uid",
        c."parentId",
        c."isPinned",
        c."isDeleted",
        c."author",
        coalesce (
            sum (v.value) over w,
            0
        ) as "votes",
        sum (case when v.value > 0 then 1 else 0 end) over w as "upvotes",
        sum (case when v.value < 0 then 1 else 0 end) over w as "downvotes"
        -- (select case when auth.uid() = v."uid" then v.value else 0 end) as "userVoteValue"
    from
        "UserComments" c
        left join votes v on c.id = v."commentId"
    window w as (
        partition by v."commentId"
    );

create recursive view "ascommentsThreads" (
    id,
    slug,
    "createdAt",
    "updatedAt",
    body,
    "uid",
    "parentId",
    "isPinned",
    "isDeleted",
    "author",
    "votes",
    "upvotes",
    "downvotes",
    "depth",
    "path",
    "pathVotesRecent",
    "pathLeastRecent",
    "pathMostRecent"
) as
    select
        id,
        slug,
        "createdAt",
        "updatedAt",
        body,
        "uid",
        "parentId",
        "isPinned",
        "isDeleted",
        "author",
        "votes",
        "upvotes",
        "downvotes",
        0 as depth,
        array[id] as "path",
        array[id] as "pathVotesRecent",
        array[id] as "pathLeastRecent",
        array[id] as "pathMostRecent"
    from
        "asVoteTally"
    where
        "parentId" is null
           -- and id = "asThreadsBySlug".slug
    union
    select
        c1.id,
        c1.slug,
        c1."createdAt",
        c1."updatedAt",
        c1.body,
        c1."uid",
        c1."parentId",
        c1."isPinned",
        c1."isDeleted",
        c1."author",
        c1."votes",
        c1."upvotes",
        c1."downvotes",
        c2.depth + 1 as depth,
        c2."path" || c1.id::biginteger as "path",
        c2."pathVotesRecent" || -c1."votes"::biginteger || -extract(epoch from c1."createdAt")::biginteger || c1.id as "pathVotesRecent",
        c2."pathLeastRecent" || extract(epoch from c1."createdAt")::biginteger || c1.id as "pathLeastRecent",
        c2."pathMostRecent" || -extract(epoch from c1."createdAt")::biginteger || c1.id as "pathMostRecent"
    from
        "asVoteTally" c1
        join "ascommentsThreads" c2 on c1."parentId" = c2.id
        group by c2 on c1.slug = c2.slug;
        
create or replace view "asUserVotes" as
    select distinct on (id)
        id,
        slug,
        "createdAt",
        "updatedAt",
       body,
        "uid",
        "parentId",
        "isPinned",
        "isDeleted",
        "author",
        "votes",
        "upvotes",
        "downvotes",
        "depth",
        "path",
        "pathVotesRecent",
        "pathLeastRecent",
        "pathMostRecent",
        coalesce(
            (
                select
                    v."value"
                from
                    votes v
                where
                    auth.uid() = v."uid" and v."commentId" = id
            ),
            0
        ) as "userVoteValue"
    from "ascommentsThreads"
    
    
    
    
    
    create or replace view recursive_view as
    select distinct on (slug)
        id,
        slug,
        "createdAt",
        "updatedAt",
        title,
        content,
        "isPublished",
        "uid",
        "parentId",
        live,
        "siteId",
        "isPinned",
        "isDeleted",
        "isApproved",
        "author",
        "votes",
        "upvotes",
        "downvotes",
        "depth",
        "path",
        "pathVotesRecent",
        "pathLeastRecent",
        "pathMostRecent",
        coalesce(
            (
                select
                    v."value"
                from
                    votes v
                where
                    auth.uid() = v."uid" and v."postsId" = id
            ),
            0
        ) as "userVoteValue"
    from commentss_thread