import React from 'react';

import BottomBar from './BottomBar'
import TopBar from './TopBar'
import TurnControl from './TurnControl'
import PlayerList from './PlayerList'
import RecruitmentPanel from './RecruitmentPanel'

export const HudContainer = () => {
    return (
        <div>
            <TopBar></TopBar>
            <TurnControl></TurnControl>
            <PlayerList></PlayerList>
            <RecruitmentPanel></RecruitmentPanel>
            <BottomBar></BottomBar>
        </div>
    )
}
