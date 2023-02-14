export const SimpleProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div
      style={{
        height: 10,
        width: "100%",
        backgroundColor: "lightgray",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent * 100}%`,
          backgroundColor: "green",
          borderRadius: "inherit",
          textAlign: "right",
        }}
      ></div>
    </div>
  );
};
