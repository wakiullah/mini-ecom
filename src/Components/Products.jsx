import useHttp from '../Hooks/useHttp'
import MealItem from './MealItem'

const initialObj = {};

export default function Products() {
    const { data,
        isLoading,
        error
    } = useHttp('https://dummyjson.com/products', initialObj, [])

    if (isLoading) {
        return <p className='text-white text-center font-bold text-2xl mt-11'>Loading data!</p>
    }

    if (!data.products) {
        return <p className='text-white text-center font-bold text-2xl mt-11'>no data</p>
    }
    if (error) {
        return <p className='text-white text-center font-bold text-2xl mt-11'>Something Error</p>
    }


    return (
        <div className='grid grid-cols-3 gap-3 gap-y-10 mt-10'>
            {data.products.map((item, i) => (
                <MealItem key={i} item={item} />
            ))}
        </div>
    )
}
