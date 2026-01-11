
import React from 'react'
import * as THREE from 'three'

/* Model Imports */
import { Worker } from '../../model/worker';
import { Soldier1 } from '../../model/soldier1';
import { Soldier2 } from '../../model/soldier2';
import { Soldier3 } from '../../model/soldier3';

import { useGameContext } from '../../../contexts/GameContext';

const Unit = ({ hexKey, position, color, height, emissiveIntensity, type }) => {

    const { strongholdPositions } = useGameContext();



    return ( 
        <group position={position}>
            {type == 'worker' ?
                <Worker scale={1} ></Worker> : <></>}
            {type == 'soldier1' ?
                <Soldier1 scale={0.5} ></Soldier1> : <></>}
            {type == 'soldier2' ?
                <Soldier2 scale={0.5} ></Soldier2> : <></>}
            {type == 'soldier3' ?
                <Soldier3 scale={1} ></Soldier3> : <></>}
        </group>
    )
}

export default Unit;