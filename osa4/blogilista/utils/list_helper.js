const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((b) => b.likes).reduce((sum, likes) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
