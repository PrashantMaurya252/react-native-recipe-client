import {createContext, ReactNode, useState} from 'react';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy: string;
  createdAt: string;
}

interface RecipeContextData {
  recipes: Recipe[];
  createRecipe: (
    receipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
}

export const RecipeContext = createContext<RecipeContextData>(
  {} as RecipeContextData,
);

export const RecipeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const createRecipe = async () => {};
  return (
    <RecipeContext.Provider value={{createRecipe, recipes}}>
      {children}
    </RecipeContext.Provider>
  );
};
