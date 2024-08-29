import useHttp from '../Hooks/useHttp'
import MealItem from './MealItem'

const initialObj = {};

export default function Products() {
    const { data,
        isLoading,
        error
    } = useHttp('https://dummyjson.com/products', initialObj, [])

    if (isLoading) {
        return <p>Loading data!</p>
    }

    if (!data) {
        return <p>no data</p>
    }

    return (
        <div className='grid grid-cols-3 gap-3 gap-y-10 mt-10'>
            {data.map((item, i) => (
                <MealItem key={i} item={item} />
            ))}
        </div>
    )
}
