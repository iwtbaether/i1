import { observer } from "mobx-react-lite";
import {
  PlayerAgent,
  PlayerSkillCalcs,
  PlayerSkillData,
  PlayerSkills,
} from "../engine/mob/snake";

const PA = new PlayerAgent();

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

const SkillDisplayBox = observer(
  ({
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
      </div>
    );
  }
);

const SkillBox = observer(({ skill, data, calcs }: SkillBoxProps) => {
  return <SkillDisplayBox {...data} {...calcs} skill={skill} />;
});

const SkillBoxExtractor = observer(
  ({ playerAgent, skill }: SkillBoxExtractorProps) => {
    const skillData = playerAgent.skills.get(PlayerSkills[skill]);
    const calced = playerAgent.skillCalcs.get(PlayerSkills[skill]);
    if (!skillData || !calced) {
      return <div>no data</div>;
    }

    return <SkillBox skill={skill} data={skillData} calcs={calced} />;
  }
);

const PlayerSkillContainer = observer(
  ({ playerAgent }: SkillContainerProps) => {
    return (
      <div>
        <div>Box</div>
        {Object.keys(PlayerSkills).map((skillKey) => {
          const sKey = skillKey as keyof typeof PlayerSkills;
          return <SkillBoxExtractor playerAgent={playerAgent} skill={sKey} />;
        })}
      </div>
    );
  }
);

const RightPanel = () => {
  return (
    <div
      style={{
        flexBasis: "200px",
        flexGrow: 0,
        backgroundColor: "lightblue",
      }}
    >
      <div>
        <PlayerSkillContainer playerAgent={PA} />
      </div>
    </div>
  );
};

export default RightPanel;
