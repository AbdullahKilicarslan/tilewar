import React from 'react';

import BottomBar from './BottomBar'
import TopBar from './TopBar'
import TurnControl from './TurnControl'
import PlayerList from './PlayerList'
import RecruitmentPanel from './RecruitmentPanel'

const HudContainer = () => {
    return (
        <>
            <TopBar></TopBar>
            <TurnControl></TurnControl>
            <PlayerList></PlayerList>
            <RecruitmentPanel></RecruitmentPanel>
            <BottomBar></BottomBar>
        </>
    )
}
export default HudContainer;