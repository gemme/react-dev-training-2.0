import React, { ReactElement } from "react";

interface QueryLoader {
  query: any;
  params: Record<string, string>;
  children?: (
    data: any,
    error: Error,
    loading: boolean,
  ) => ReactElement;
  fallback?: ReactElement;
}
// query --> useGetProducts
// params ---> params
// query(params)  --- useGetProducts(params)
// query(params)  --- useGetColections(params)
// undefined()
// name?.prop  ---> 
// name?.()
export const QueryLoader = ({ query, params, children, fallback }: QueryLoader) => {
  const { data, error, isLoading } = query(params);

  if (isLoading) {
    return <>{fallback ? fallback : <div>Loading...</div>}</>
  }

  return <>{children && children(data, error, isLoading)} </>;
};

/*
<QueryLoader query={useGetProducts} params={query}>
{
    (data)=>{
        return <Products products={data}/>
    }
}
</QueryLoader>
*/

// component tests
// DOM - jsdom - fetch - mock fetch

// <Products products={products}/>

/*
  <Componet>
{
    (data)=>{

      return  <div>{data}</div>
    }  

}
   
  </Component>


   <Componet renderProps={ (data)=>{
      return  <div>{data}</div>
    } }/>

*/
