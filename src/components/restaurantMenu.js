import react, { useState } from "react";
import Image from 'next/image'
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import seachIcon from './img/search.png'

export function RestaurantMenu(props) {

    return (
        <section className="border-t-[75px] border-bluePrimary">
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
            className="max-w-screen-xl mx-auto py-5 px-2"
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
                            {data[props.restaurantId].hours === undefined ? '' : data[props.restaurantId].hours.map((days, keyss) => {
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
        } else if (props.days.days.every(e => e >= 2 && e <= 5)) {
            setWorkDay(`Segunda à Quinta: ${props.days.from} ás ${props.days.to}`)
        } else if (props.days.days.every(e => e >= 2 && e <= 6)) {
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
    const restId = parseFloat(router.query.restaurant) + 1
    const [seachFood, setSeachFood] = react.useState('')

    react.useEffect(() => {
        getMenu()
    },[])

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
        <div className="max-w-screen-xl mx-auto py-5 px-2">
            <form
                onSubmit={(e)=> e.preventDefault()}
                className="w-full flex justify-between items-center rounded-full font-bold shadow-md my-5"
            >
                <input
                    type={'Text'}
                    className="w-5/6 px-7 py-3 rounded-full"
                    placeholder="Buscar estabelecimento"
                    onChange={e => setSeachFood(e.target.value)}
                />
                <button
                    className="w-1/6 font-bold">
                    Buscar no cardápio
                </button>
            </form>
            <div className="grid grid-cols-2 gap-5">
                {restaurant.filter((val) => {
                    if (seachFood === '') {
                        return val
                    } else if (val.name.toLowerCase().includes(seachFood.toLowerCase())) {
                        return val
                    }
                }).map((data, key) => {
                    return (
                        <div
                            key={key}
                            className="flex gap-4 shadow-lg rounded-[4px] items-center"
                        >
                            <img
                                className="w-[150px] h-[150px] rounded-[4px]"
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
                                    {data.sales === undefined ? '' : data.sales.map((salePrice, i) => {
                                        return (
                                            <span
                                                key={i}
                                                className="text-bluePrimary font-bold">
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
        </div>
    )
}