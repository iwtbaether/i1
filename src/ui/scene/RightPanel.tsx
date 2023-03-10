import { observer } from "mobx-react-lite";
import {
  PlayerSkillCalcs,
  PlayerSkillData,
  PlayerSkills,
} from "../../engine/mob/SnakeTypes";
import { PlayerAgent } from "../../engine/mob/PlayerAgent";
import React from "react";
import { MobGameContext } from "../../context/MobGameContext";
import { SimpleProgressBar } from "../components/SimpleProgressBar";

interface SkillDisplayBoxProps {
  skill: keyof typeof PlayerSkills;
  level: number;
  xp: number;
  multiplier: number;
  requiredXp: number;
  xpToNextLevel: number;
}

interface SkillBoxProps {
  skill: keyof typeof PlayerSkills;
  data: PlayerSkillData;
  calcs: PlayerSkillCalcs;
}

interface SkillContainerProps {
  playerAgent: PlayerAgent;
}

interface SkillBoxExtractorProps {
  playerAgent: PlayerAgent;
  skill: keyof typeof PlayerSkills;
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const SkillDisplayBox = ({
  skill,
  level,
  xp,
  multiplier,
  requiredXp,
  xpToNextLevel,
}: SkillDisplayBoxProps) => {
  return (
    <div>
      <div style={rowStyle}>
        <div>{PlayerSkills[skill]}</div>
        <div>Level: {level}</div>
      </div>
      <div style={rowStyle}>
        <div>
          XP: {xp}/{requiredXp}
        </div>
        <div>Multiplier: {multiplier}</div>
      </div>
      <SimpleProgressBar percent={xp / requiredXp} />
    </div>
  );
};
const SkillBox = observer(({ skill, data, calcs }: SkillBoxProps) => {
  return <SkillDisplayBox {...data} {...calcs} skill={skill} />;
});

const SkillBoxExtractor = observer(
  ({ playerAgent, skill }: SkillBoxExtractorProps) => {
    const skey = PlayerSkills[skill];
    const skillData = playerAgent.skills[skey];
    const calced = playerAgent.skillCalcs[PlayerSkills[skill]];
    if (!skillData || !calced) {
      return <div>no data</div>;
    }

    return <SkillBox skill={skill} data={skillData} calcs={calced} />;
  }
);

const PlayerSkillContainer = ({ playerAgent }: SkillContainerProps) => {
  return (
    <div>
      <div>Box</div>
      {Object.keys(PlayerSkills).map((skillKey) => {
        const sKey = skillKey as keyof typeof PlayerSkills;
        return (
          <SkillBoxExtractor
            playerAgent={playerAgent}
            skill={sKey}
            key={sKey}
          />
        );
      })}
    </div>
  );
};
const RightPanel = observer(() => {
  const { game } = React.useContext(MobGameContext);
  return (
    <div
      style={{
        flexBasis: "200px",
        flexGrow: 0,
        backgroundColor: "lightblue",
      }}
    >
      <div>
        <PlayerSkillContainer playerAgent={game.playerAgent} />
      </div>
    </div>
  );
});

const RightPanel2 = observer(() => {
  const { game } = React.useContext(MobGameContext);
  return <PlayerSkillContainer playerAgent={game.playerAgent} />;
});

export default RightPanel;

export { PlayerSkillContainer, RightPanel2 };
