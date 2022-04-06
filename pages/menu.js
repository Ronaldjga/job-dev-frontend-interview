import react, { useState } from "react";
import { useRouter } from "next/router";
import { RestaurantList } from "../src/components/restaurantList";
import { RestaurantMenu } from "../src/components/restaurantMenu";


export default function Menu() {
    const router = useRouter()
    const restaurantId = router.query.restaurant
    
    return (
        <div>
            <RestaurantMenu
                restaurantId={restaurantId}
            />
        </div>
    )
}