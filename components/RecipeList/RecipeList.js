import RecipePost from '../RecipePost/RecipePost'; 


const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <RecipePost key={recipe.id} {...recipe} />
      ))}
    </>
  );
};

export default RecipeList;
