import {FirstLog} from "./models/firstLog";

export function getLogByDifficultyAndEncounter(difficulty: number, encounter: number): FirstLog {
  if (difficulty === 6 || difficulty === 4) {
    // 25HC or 25NM
    return SOO_25_HC[encounter];
  } else {
    // 10HC or 10NM
    return SOO_10_HC[encounter];
  }
}


export const SOO_10_HC : FirstLog[] = [
  {
    name: "Paragons of the Klaxxi",
    logId: 205013,
    avgIlvl: 552.4,
    avgDps: 250154,
    killTime: 676.498
  },
  {
    name: "Spoils of Pandaria",
    logId: 199941,
    avgIlvl: 553.8,
    avgDps: 204097,
    killTime: 574.934
  },
  {
    name: "Malkorok",
    logId: 199787,
    avgIlvl: 556.1,
    avgDps: 227194,
    killTime: 308.599
  },
  {
    name: "Fallen Protectors",
    logId: 199611,
    avgIlvl: 554.3,
    avgDps: 267004,
    killTime: 394.063
  },
  {
    name: "Thok the Bloodthirsty",
    logId: 200510,
    avgIlvl: 557.4,
    avgDps: 178504,
    killTime: 462.326
  },
  {
    name: "Iron Juggernaut",
    logId: 199676,
    avgIlvl: 555.4,
    avgDps: 179773,
    killTime: 329.474
  },
  {
    name: "Siegecrafter Blackfuse",
    logId: 203475,
    avgIlvl: 557.5,
    avgDps: 200826,
    killTime: 375.163
  },
  {
    name: "Immerseus",
    logId: 199587,
    avgDps: 155431,
    avgIlvl: 554.3,
    killTime: 316.237
  },
  {
    name: "General Nazgrim",
    logId: 199733,
    avgIlvl: 555.5,
    avgDps: 202190,
    killTime: 372.053
  },
  {
    name: "Sha of Pride",
    logId: 199646,
    avgIlvl: 554.6,
    avgDps: 228773,
    killTime: 338.434
  },
  {
    name: "Secret boss",
    logId: 0,
    avgIlvl: 0,
    avgDps: 0,
    killTime: 0
  },
  {
    name: "Kor'kron Dark Shaman",
    logId: 199709,
    avgIlvl: 555,
    avgDps: 194608,
    killTime: 452.634
  },
  {
    name: "Galakras",
    logId: 199659,
    avgIlvl: 555.8,
    avgDps: 226986,
    killTime: 556.714
  },
  {
    name: "Garrosh Hellscream",
    logId: 211716,
    avgIlvl: 564.3,
    avgDps: 250839,
    killTime: 746.361
  },
  {
    name: "Norushen",
    logId: 199631,
    avgIlvl: 547.7,
    avgDps: 170575,
    killTime: 432.816
  },
]

export const SOO_25_HC: FirstLog[] = [
  {
    name: "Paragons of the Klaxxi",
    logId: 216677,
    avgIlvl: 559.6,
    avgDps: 256222,
    killTime: 718.882
  },
  {
    name: "Spoils of Pandaria",
    logId: 204938,
    avgIlvl: 553.76,
    avgDps: 222912,
    killTime: 570.536
  },
  {
    name: "Malkorok",
    logId: 203416,
    avgIlvl: 557.16,
    avgDps: 247288,
    killTime: 321.938
  },
  {
    name: "Fallen Protectors",
    logId: 199667,
    avgIlvl: 554.72,
    avgDps: 292727,
    killTime: 384.987
  },
  {
    name: "Thok the Bloodthirsty",
    logId: 206271,
    avgIlvl: 560.08,
    avgDps: 196564,
    killTime: 546.361
  },
  {
    name: "Iron Juggernaut",
    logId: 199858,
    avgIlvl: 555.16,
    avgDps: 206057,
    killTime: 347.279
  },
  {
    name: "Siegecrafter Blackfuse",
    logId: 207283,
    avgIlvl: 560.56,
    avgDps: 221469,
    killTime: 449.372
  },
  {
    name: "Immerseus",
    logId: 199649,
    avgDps: 183501,
    avgIlvl: 554.12,
    killTime: 254.854
  },
  {
    name: "General Nazgrim",
    logId: 200633,
    avgIlvl: 556.76,
    avgDps: 228620,
    killTime: 471.55
  },
  {
    name: "Sha of Pride",
    logId: 199730,
    avgIlvl: 554.88,
    avgDps: 246112,
    killTime: 359.489
  },
  {
    name: "Secret boss",
    logId: 0,
    avgIlvl: 0,
    avgDps: 0,
    killTime: 0
  },
  {
    name: "Kor'kron Dark Shaman",
    logId: 200618,
    avgIlvl: 555.96,
    avgDps: 258912,
    killTime: 391.592
  },
  {
    name: "Galakras",
    logId: 199765,
    avgIlvl: 555.16,
    avgDps: 245899,
    killTime: 761.524
  },
  {
    name: "Garrosh Hellscream",
    logId: 224780,
    avgIlvl: 567.44,
    avgDps: 275214,
    killTime: 752.937
  },
  {
    name: "Norushen",
    logId: 199690,
    avgIlvl: 550.92,
    avgDps: 178871,
    killTime: 440.623
  },
]
