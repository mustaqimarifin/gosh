drop function if exists "asCommentTree";
create function "asCommentTree"(
  id int
) returns json as $$
  select json_build_object(
    'id', c.id,
    'profile', json_build_object(
      'username', u.username,
      'mugshot', u.mugshot,
      'id', u.id
    ),
    'body', body,
    'created_at', c.created_at,
    'children', children
  )
  from comment c
    left join profile u using(u.id),
    lateral (
      select
        coalesce(json_agg(
          "asCommentTree"(comment.id)
          order by created_at asc
        ), '[]') as children
      from comment
      where "parentId" = c.id
    ) as get_children
  where
    c.id = "asCommentTree".id
$$ language sql stable;

create function "asThreadsBySlug"(
  slug text
) returns json as $$
  select
    coalesce(json_agg(
      "asCommentTree"(id)
      order by c.created_at desc
    ), '[]') as comments
  from comments c
  where c.parent_id is null
    and c.slug = "asThreadsBySlug".slug
$$ language sql stable;

create function "stats"() returns jsonb as $$
  select
    coalesce(jsonb_object(
      array_agg(slug),
      array_agg(counter)
    ), '{}')
  from (
    select
      slug,
      count(slug)
    from comments
    group by slug
  ) as get_counts
$$ language sql stable;
grant execute on function comments_stats to anon;
grant execute on function comments_stats to authenticated;

create schema if not exists hidden;
grant all privileges on schema hidden to anon;

create or replace function "totalViews"(post text) returns jsonb as $$
declare
  total int;
  
  select jsonb_build_object(
 select sum(counter) into total

  )
  from
    posts
  where slug = post
$$ language sql stable;

create table hidden.likes (
  id text not null default current_setting('request.headers', true)::json->>'cf-connecting-ip',
  slug text not null,
  votes int not null,
  primary key (id, slug)
);

grant select, insert, update on hidden.likes to anon;

create or replace function get_likes(post text) returns json as $$
  select json_build_object(
    'total', coalesce(sum(votes), 0),
    'available', 15 - coalesce((
      select votes
      from hidden.likes
      where slug = post
        and id = current_setting('request.headers', true)::json->>'cf-connecting-ip'
    ), 0)
  )
  from
    hidden.likes
  where likes.slug = post
$$ language sql stable;

drop function if exists like_post;
create or replace function like_post(post text, requested_votes int default 1) returns json as $$
declare
  score int;
  ip text;
  likes json;
begin
  if (requested_votes not between 1 and 15) then
    raise exception 'Votes must be between 1 and 15';
  end if;

  select current_setting('request.headers', true)::json->>'cf-connecting-ip' into ip;

  select sum(votes) into score
  from hidden.likes
  where slug = post and id = ip;

  if score >= 15 then
    raise exception 'Maximum likes reached';
  end if;

  insert into hidden.likes (id, slug, votes)
  values (ip, post, requested_votes)
  on conflict (id, slug) do update set votes = requested_votes;

  select get_likes(post) into likes;
  return likes;
end;
$$ language plpgsql volatile;

grant execute on function like_post to anon;
grant execute on function get_likes to anon;

drop function if exists top_likes();

create or replace function "viewsBySlug"() returns table(slug text, total_views int) as $$
  select
    slug,
    sum(counter) as total_views,
  from posts
  group by slug
  order by total_views desc
$$ language sql stable;

create or replace view "viewsBySlug"() as
  select
    slug,
    sum(counter) as total_views,
  from posts
  group by slug
  order by total_views desc
  ;
$$ language sql stable;
grant execute on function top_likes to anon;