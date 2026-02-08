import { createContext, useEffect } from "react";
import { fetchUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useFetch } from "@/hooks/useFetch";
import { setLatestArticles, setLatestVideos } from "@/slices/contentSlice";
import { setBusinessStores, setStoreData, setSuggestedStores } from "@/slices/StoreSlice";
import { setAllProducts, setCategoryProducts, setProductData, setStoreProducts, setSuggestedProducts } from "@/slices/productSlice";

export const AppContext = createContext<any>({});

const AppContextProvider = (props:any)=>{
    const dispatch = useDispatch<AppDispatch>();

    // fetch the data for the homepage
    const fetchHomePageData = async () =>{
        const {data:latest_articles,
            success:article_success} = await useFetch("/api/v1/content/latest-articles");

        const {data:latest_videos,
            success:videos_success
        } = await useFetch("/api/v1/content/latest-videos");

        const {data:suggested_products,
            success:suggested_success
        } = await useFetch("/api/v1/product/suggested");

        if(article_success){dispatch(setLatestArticles(latest_articles))}
        if(videos_success){dispatch(setLatestVideos(latest_videos))}
        if(suggested_success){dispatch(setSuggestedProducts(suggested_products))}
    }

    // fetch the data for the seller's dashboard
    const fetchSellerDashboardData = async ()=>{
        const {data:seller_stores,
            success:seller_success
        } = await useFetch('/api/v1/store/business');
        if(seller_success){
            dispatch(setBusinessStores(seller_stores))
        }
    }

    // fetch the stores for the business owner
    const fetchBusinessSores = async ()=>{
        const {data,success} = await useFetch('/api/v1/store/business');
        if(success){dispatch(setBusinessStores(data))}
    }

    // fetch the suggested stores
    const fetchSuggestedStores = async ()=>{
        const {data,success} = await useFetch('/api/v1/store/latest');
        if(success){dispatch(setSuggestedStores(data))}
    }

    //fetch single product Data
    const fetchProductData = async (product_id:any)=>{
        const {data,success} = await useFetch(`/api/v1/product/product/${product_id}`);
        if(success){dispatch(setProductData(data))}
    }

    // fetch signle store
    const fetchStoreData = async (store_id:string) =>{
        const {data,success} = await useFetch(`/api/v1/store/fetch/${store_id}`);
        if(success){dispatch(setStoreData(data))}
    }

    const fetchStoreProducts = async (store_id:string,skip:number,limit:number)=>{
        const {data,success} = await useFetch(
        `/api/v1/product/from-store?storeId=${store_id}&skip=${skip}&limit=${limit}`);
        if(success){dispatch(setStoreProducts(data))}
    }

    const fetchCategoryProducts = async (category:string,skip:number,limit:number)=>{
        const {data,success} = await useFetch(
        `/api/v1/product/category/${category}?skip=${skip}&limit=${limit}`);
        if(success){dispatch(setCategoryProducts(data))}
    }

    const fetchAllProducts = async (skip:number,limit:number)=>{
        const {data,success} = await useFetch(
        `/api/v1/product/fetch?skip=${skip}&limit=${limit}`);
        if(success){dispatch(setAllProducts(data))}
    }

    // call the APIs
    useEffect(()=>{
    dispatch(fetchUser());
    },[]);

    const context_value = {
        fetchHomePageData,
        fetchBusinessSores,
        fetchSuggestedStores,
        fetchProductData,
        fetchStoreData,
        fetchAllProducts,
        fetchStoreProducts,
        fetchCategoryProducts,
        fetchSellerDashboardData
    };

    return(
        <AppContext.Provider value={context_value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;