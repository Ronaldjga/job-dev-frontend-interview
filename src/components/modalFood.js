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
            <div className="w-10/12 h-3/4 sm:overflow-hidden sm:w-[600px] sm:h-[485px] bg-white absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 rounded-[8px] shadow-lg">
                <button
                    className="w-[50px] h-[50px] text-2xl font-bold bg-white shadow-lg absolute -right-6 -top-6 rounded-full"
                    onClick={(e) => {
                        e.preventDefault()
                        props.setModalVisible(false)
                    }}
                >
                    X
                </button>
                <div className="h-full py-5 sm:p-0 overflow-auto sm:overflow-hidden flex flex-col justify-between">
                    <img
                        className="px-6 w-full sm:h-[200px]"
                        src={props.whatFood.image}
                    />
                    <div className=" p-6">
                        <h2 className="text-2xl font-medium">
                            {props.whatFood.name}
                        </h2>
                        <div className="flex gap-2 sm:gap-0 flex-col sm:flex-row justify-between sm:items-end">
                            <p className="sm:w-2/3 font-medium">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <span className="text-3xl font-bold text-bluePrimary">
                                R$: {props.whatFood.price}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:gap-0 gap-5 sm:h-1/6 sm:py-2 pt-5 border-t">
                        <div className="w-2/4 sm:w-1/5 h-4/5 flex justify-center items-center border text-bluePrimary rounded-[4px]">
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
                            className="sm:w-2/5 sm:h-4/5 p-3 text-xl font-medium text-white flex justify-between items-center bg-bluePrimary rounded-[4px] hover:brightness-110">
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