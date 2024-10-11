# Progress Log

## Day 0: September 14, 2024

**Today's Progress**: 
Made the createPost work. It now creates a post, with link to media upload. It also links the author to his/hers coresponding auth data.

**Thoughts**: 
Love making stuff.

__________________________________________________

## Day 1: September 17, 2024

**Today's Progress**: 
- Made sure that when a recipe is created, it is not only being posted to the recipes collection in the db, but also to the posts array in the user document to the authoring user.
- Began displaying posts on profile page to authenticated user.

**Thoughts**: 
Firestore is great to work with!
Had fun.

__________________________________________________

## Day 2: September 18, 2024

**Today's Progress**: 
- Started fetching and displaying data for the discover page. It fetches all recipes from the collection. This should be paginated later on.
- Initial styling of the discover page.

**Thoughts**: 
Making progress. Slow but steady.


__________________________________________________

## Day 3: September 19, 2024

**Today's Progress**: 
- Refactor discover page and split code into components.
- Handle click to profile when clicking on name in a post (discover page so far)
- Set up dynamic route for click to profile

**Thoughts**: 
Grinding. Sleepy but holding on.


__________________________________________________

## Day 4: September 20, 2024

**Today's Progress**: 
- Fixed the navbar - made the href attributes absolute
- When you click on a post's content, you get sent the the recipe[id] page
- Rendering the raw data of the recipe

**Thoughts**: 
Motivated

__________________________________________________

## Day 5: September 21, 2024

**Today's Progress**: 
- Did some needed refactoring
- Startet on a component for displaying userData in a Bio

**Thoughts**: 

__________________________________________________

## Day 6: September 22, 2024

**Today's Progress**: 
- Refactoring
- Follow and unfollow functionality

**Thoughts**: 
👍
__________________________________________________

## Day 7: September 23, 2024

**Today's Progress**: 
- Display following and follwers count
- Refactor
- Began work on editing a recipe if you are the one who made it. But I need to rename 'user' in the recipe collection (user is the author of the recipe), to chef.
This is because I need to compare user(chef) with the user from the authContext and they can not have the same name...

**Thoughts**: 

__________________________________________________


## Day 8: September 25, 2024

**Today's Progress**: 
- Added margin to bottom of grid, to ensure that you can scroll the last row into view (before this, it was hid behind the navbar)
- Refactoring to use Next Image

**Thoughts**: 
They say its better...

__________________________________________________


## Day 9: Oktober 25, 2024

**Today's Progress**: 
- Worked on the editing functionality of a recipe. On a button click, a modal opens, and the user can edit his/hers recipe.
- Still a lot to do here. Next up is to not include empty strings, and add validation upon adding new elements.

**Thoughts**: 
Fall vacation
Forgot to log for a week or so, after vacation.



