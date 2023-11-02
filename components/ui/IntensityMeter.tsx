type IntensityMeterProps = {
  intensity: string;
};

const enum ClassIntensity {
  Beginner = "Beginner",
  BeginnerIntermediate = "Beginner to Intermediate",
  Intermediate = "Intermediate",
  IntermediateAdvanced = "Intermediate to Advanced",
  Advanced = "Advanced",
}

export function IntensityMeter({ intensity }: IntensityMeterProps) {
  return (
    <>
      {intensity === ClassIntensity.Beginner && (
        <>
          <div className="h-2 w-1 rounded bg-blue-400"></div>
          <div className="h-3 w-1 rounded bg-gray-300"></div>
          <div className="h-4 w-1 rounded bg-gray-300"></div>
        </>
      )}

      {(intensity === ClassIntensity.BeginnerIntermediate ||
        intensity === ClassIntensity.Intermediate ||
        intensity === ClassIntensity.IntermediateAdvanced) && (
        <>
          <div className="h-2 w-1 rounded bg-blue-400"></div>
          <div className="h-3 w-1 rounded bg-blue-600"></div>
          <div className="h-4 w-1 rounded bg-gray-300"></div>
        </>
      )}

      {intensity === ClassIntensity.Advanced && (
        <>
          <div className="h-2 w-1 rounded bg-blue-400"></div>
          <div className="h-3 w-1 rounded bg-blue-600"></div>
          <div className="h-4 w-1 rounded bg-blue-800"></div>
        </>
      )}
    </>
  );
}
