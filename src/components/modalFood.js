import react, { useState } from "react";
import { useEffect } from "react";

export function ModalFood(props) {
    const [amountFood, setAmountFood] = react.useState(1)
    const [totalPrice, setTotalPrice] = react.useState(props.whatFood.price * amountFood)

    react.useEffect(() => {
        finalPrice()
    }, [amountFood])

    const finalPrice = () => {
        setTotalPrice(props.whatFood.price * amountFood)
    }

    return (
        <div className="w-full h-full fixed top-0 left-0">
            <div onClick={(e) => props.setModalVisible(false)} className="w-full h-full bg-tranparentGray"></div>
            <div className="w-[600px] h-[485px] bg-white absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 rounded-[8px] shadow-lg">
                <button
                    className="w-[50px] h-[50px] text-2xl font-bold bg-white shadow-lg absolute -right-6 -top-6 rounded-full"
                    onClick={(e) => {
                        e.preventDefault()
                        props.setModalVisible(false)
                    }}
                >
                    X
                </button>
                <div className="h-full flex flex-col justify-between">
                    <img
                        className="px-6 w-full h-[200px]"
                        src={props.whatFood.image}
                    />
                    <div className=" p-6">
                        <h2 className="text-2xl font-medium">
                            {props.whatFood.name}
                        </h2>
                        <div className="flex justify-between items-end">
                            <p className="w-2/3 font-medium">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <span className="text-3xl font-bold text-bluePrimary">
                                R$: {props.whatFood.price}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center h-1/6 py-2 px-6 border-t">
                        <div className="w-1/5 h-4/5 flex justify-center items-center border text-bluePrimary rounded-[4px]">
                            <button
                                className="w-1/3 font-semibold text-4xl"
                                onClick={e => amountFood === 0 ? null : setAmountFood(amountFood - 1)}>
                                -
                            </button>
                            <p
                                className="w-1/3 text-center font-semibold">
                                {amountFood}
                            </p>
                            <button
                                className="w-1/3 text-3xl"
                                onClick={e => setAmountFood(amountFood + 1)}>
                                +
                            </button>
                        </div>
                        <button
                            className="w-2/5 h-4/5 p-3 text-xl font-medium text-white flex justify-between items-center bg-bluePrimary rounded-[4px] hover:brightness-110">
                            <span>
                                Adicionar
                            </span>
                            <span>
                                R$: {totalPrice}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}