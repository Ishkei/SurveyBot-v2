import { CategoryType } from "../types/Profile";

const categoryOrder = (process.env.CATGEGORY_ORDER || "About You,Home,Work,Food & Drinks,Leisure,Health,Technology,Media,Gaming,Automotive,Travel,Shopping").split(",");

const sortByCategory = (categoryList: CategoryType[]) =>{
  return categoryList.sort((a,b) => {
    if(!a.category) return 1;
  
    for(let i = 0; i< categoryOrder.length; i++){
      const category = categoryOrder[i];

      if(a.category === category) return -1;
      if(b.category === category) return 1;    
    }

    return 0;
  })
}

export { sortByCategory }