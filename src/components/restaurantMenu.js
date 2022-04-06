import react, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

export function RestaurantMenu(props) {

    return (
        <section>
            <AboutRestaurant
                restaurantId={props.restaurantId}
            />
            <Menu
                restaurantId={props.restaurantId}
            />
        </section>
    )
}

function AboutRestaurant(props) {
    const [restaurant, setRestaurant] = react.useState([]);

    react.useEffect(() => {
        getRestaurant()
    }, [])

    const getRestaurant = async () => {
        const toArray = []
        try {
            const res = await axios.get(`http://challange.goomer.com.br/restaurants`)
            toArray.push(res.data)
            setRestaurant(toArray)
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="max-w-screen-xl mx-auto"
        >
            {restaurant.map((data, key) => {
                // console.log(data[props.restaurantId])
                return (
                    <div
                        className="flex w-2/4 gap-2"
                        key={key}
                    >
                        <img
                            className="w-[150px]"
                            src={data[props.restaurantId].image}
                        />
                        <div>
                            <h1 className="text-2xl">
                                {data[props.restaurantId].name}
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            {data[props.restaurantId].hours.map((days, keyss) => {
                                return (
                                    <div className="text-xs" key={keyss}>
                                        <WorkDays
                                            days={days}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function WorkDays(props) {
    const [workDay, setWorkDay] = react.useState([])

    react.useEffect(() => {
        setDays()
    }, [])
    
    const setDays = () => {
        if (props.days.days.includes(1 && 6 && 7)) {
            setWorkDay(`Sexta à Domingo: ${props.days.from} ás ${props.days.to}`)
        } else if (props.days.days.every(e => e >=2 && e <= 5)) {
            setWorkDay(`Segunda à Quinta: ${props.days.from} ás ${props.days.to}`)
        } else if (props.days.days.every(e => e >=2 && e <= 6)) {
            setWorkDay(`Segunda à Sexta: ${props.days.from} ás ${props.days.to}`)
        }
    }
    



    return (
        <p
            className="flex gap-2">
            {workDay}
        </p>
    )
}

function Menu(props) {
    const [restaurant, setRestaurant] = react.useState([]);
    const router = useRouter()
    const restId = router.query.restaurant

    react.useEffect(() => {
        getMenu()
    }, [])

    const getMenu = async () => {
        const toArray = []
        try {
            const res = await axios.get(`http://challange.goomer.com.br/restaurants/${restId}/menu`)
            toArray.push(res.data)
            setRestaurant(...toArray)
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="grid grid-cols-2 gap-5">
            {restaurant.map((data, key) => {
                return (
                    <div
                        className="flex gap-4 shadow-md rounded-[4px] items-center"
                    >
                        <img
                            className="w-[100px] h-[100px] rounded-[4px]"
                            src={data.image}
                        />
                        <div>
                            <h2 className="font-semibold">
                                {data.name}
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            </p>
                            <p className="flex gap-4">
                                {data.sales === undefined ? '' : data.sales.map((salePrice, o) => {
                                    return (
                                        <span className="text-bluePrimary font-bold">
                                            R$:{salePrice.price}
                                        </span>
                                    )
                                })}
                                <span className={`${data.sales === undefined ? 'text-bluePrimary font-bold' : 'text-black line-through'}`}>
                                    R$: {data.price}
                                </span>  
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}