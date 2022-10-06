const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((sum, likes) => sum + likes, 0);
};
module.exports = {
  dummy,totalLikes
};
