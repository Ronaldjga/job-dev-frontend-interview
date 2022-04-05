import react, {useState} from "react";
import axios from "axios";
import { useEffect } from "react"
import Image from "next/image";
import restauranIcon from './img/veganRestaurant.svg'
import seachIcon from './img/search.png'

export function RestaurantList() {

    return (
        <section className="border-t-[75px] border-bluePrimary">
            
            <div className="max-w-screen-xl mx-auto p-2">
                <h1
                    className="text-3xl text-center"
                >
                    Bem-vindo ao Lista Rango
                </h1>
                <Restaurantes/>
            </div>
        </section>
    )
}

function Restaurantes() {
    const [seachRestaurant, setSeachRestaurant] = react.useState('')
    const [restaurantes, setRestaurantes] = react.useState([])

    react.useEffect(() => {
        getRestaurantes()
    }, [])

    const getRestaurantes = async () => {
        const toArray = []
        try {
            const res = await axios.get(`http://challange.goomer.com.br/restaurants`)
            toArray.push(res.data)
            setRestaurantes(...toArray)
            //console.log(res)
        }
        catch(e) {
            console.log(e)
        }
    }
    return (
        <main>
            <form
                onSubmit={(e)=> e.preventDefault()}
                className="w-full flex justify-between rounded-full font-bold shadow-md my-5"
            >
                <input
                    type={'Text'}
                    className="w-full px-7 py-3 rounded-full"
                    placeholder="Buscar estabelecimento"
                    onChange={e => setSeachRestaurant(e.target.value)}
                />
                <button
                    className="w-1/12 relative">
                    <Image
                        className="fill"
                        src={seachIcon}
                        alt='seach icon'
                    />
                </button>
            </form>
            <div className="grid grid-cols-3 gap-12 p-5">
                {restaurantes.filter((val) => {
                    if (seachRestaurant === '') {
                        return val
                    } else if (val.name.toLowerCase().includes(seachRestaurant.toLowerCase())) {
                        return val
                    }
                }).map((data, key) => {
                    return (
                        <div
                            key={key}
                            className="flex items-center bg-white p-2 rounded-[4px] shadow-md"
                        >
                            <div className="w-1/3">
                                <Image
                                    layout="responsive"
                                    src={restauranIcon}
                                    alt="restaurant logo"
                                />
                            </div>
                            <p className="flex flex-col">
                                <span>{data.name}</span>
                                <span>{data.address}</span>
                                
                            </p>
                            <IsOpen
                                IsOpen={data.hours}
                            />
                        </div>
                    )
                })}
            </div>
        </main>
    )
}


function IsOpen(props) {
    const [currentTime, setCurrentTime] = react.useState('');
    const restaurantDate = [props.IsOpen]
    // const validTime = () => {
    //     if () {
            
    //     }
    // }
    const newDate = new Date();
    const date = newDate.getDay() + 1;
    const hours = newDate.getHours() + ':' + newDate.getMinutes();
    
    return (
        <div>
            {date}
            {hours}
            {restaurantDate.map((data, i) => {
                console.log(data)
            })}
        </div>
    )
}