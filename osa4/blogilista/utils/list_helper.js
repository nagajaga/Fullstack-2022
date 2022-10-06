const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((b) => b.likes).reduce((sum, likes) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
};

const mostBlogs = (blogs) => {
  const authors = new Map();
  for (const blog of blogs) {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + 1);
    } else {
      authors.set(blog.author, 1);
    }
  }
  const mostblogged = Array.from(authors.entries()).reduce((prev, current) =>
    prev[1] > current[1] ? prev : current
  );

  return { author: mostblogged[0], blogs: mostblogged[1] };
};

const mostLikes = (blogs) => {
  const authors = new Map();
  for (const blog of blogs) {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + blog.likes);
    } else {
      authors.set(blog.author, blog.likes);
    }
  }
  const mostblogged = Array.from(authors.entries()).reduce((prev, current) =>
    prev[1] > current[1] ? prev : current
  );

  return { author: mostblogged[0], likes: mostblogged[1] };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
