import RecipePost from '../RecipePost/RecipePost'; 


const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <RecipePost key={recipe.postId || recipe.postedAt} {...recipe} />
      ))}
    </>
  );
};

export default RecipeList;
