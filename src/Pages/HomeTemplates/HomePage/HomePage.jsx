import React from 'react'
import Carosel from './Carosel/Carosel'
import ListPhongThue from './ListPhongThue/ListPhongThue'
import ViTriGanDay from './ListViTri/ViTriGanDay'

export default function HomePage() {
    return (
        <div>
            <Carosel />
            <ListPhongThue />
            <ViTriGanDay />
        </div>
    )
}
