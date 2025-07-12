interface SkillTagProps {
  skill: string;
}

export const SkillTag = ({ skill }: SkillTagProps) => {
  return (
    <span className="skill-tag">
      {skill}
    </span>
  );
};