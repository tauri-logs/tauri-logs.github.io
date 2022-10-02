export const enum SpecEnum {
  WARRIOR_ARMS = 71,
  WARRIOR_FURY = 72,
  WARRIOR_PROTECTION = 73,
  PALADIN_HOLY = 65,
  PALADIN_PROTECTION = 66,
  PALADIN_RETRIBUTION = 70,
  HUNTER_MARKSMANSHIP = 254,
  HUNTER_BM = 253,
  HUNTER_SURVIVAL = 255,
  ROGUE_ASSASSINATION = 259,
  ROGUE_COMBAT = 260,
  ROGUE_SUBTLETY = 261,
  PRIEST_DISCO = 256,
  PRIEST_HOLY = 257,
  PRIEST_SHADOW = 258,
  DK_BLOOD = 250,
  DK_FROST = 251,
  DK_UNHOLY = 252,
  SHAMAN_ELEMENTAL = 262,
  SHAMAN_ENHANCEMENT = 263,
  SHAMAN_RESTORATION = 264,
  MAGE_FROST = 64,
  MAGE_FIRE = 63,
  MAGE_ARCANE = 62,
  WARLOCK_AFFLICTION = 265,
  WARLOCK_DEMONOLOGY = 266,
  WARLOCK_DESTRUCTION = 267,
  MONK_MISTWEAVER = 270,
  MONK_WINDWALKER = 269,
  MONK_BREWMASTER = 268,
  DRUID_RESTORATION = 105,
  DRUID_GUARDIAN = 104,
  DRUID_FERAL = 103,
  DRUID_BALANCE = 102
}

export const reverseSpec = {
  71 : 'Arms warrior',
  72 : 'Fury warrior',
  73 : 'Protection warrior',
  65 : 'Holy paladin',
  66 : 'Protection paladin',
  70 : 'Retribution paladin',
  254 : 'Marksmanship hunter',
  253 : 'Beastmastery hunter',
  255 : 'Survival hunter',
  259 : 'Assasination rogue',
  260 : 'Combat rogue',
  261 : 'Subtlety rogue',
  256 : 'Discipline priest',
  257 : 'Holy priest',
  258 : 'Shadow priest',
  250 : 'Blood death knight',
  251 : 'Frost death knight',
  252 : 'Unholy death knight',
  262 : 'Elemental shaman',
  263 : 'Enhancement shaman',
  264 : 'Restoration shaman',
  64 : 'Frost mage',
  63 : 'Fire mage',
  62 : 'Arcane mage',
  265 : 'Affliction warlock',
  266 : 'Demonology warlock',
  267 : 'Destruction warlock',
  270 : 'Mistweaver monk',
  269 : 'Windwalker monk',
  268 : 'Brewmaster monk',
  105 : 'Restoration druid',
  104 : 'Guardian druid',
  103 : 'Feral druid',
  102 : 'Balance druid'
}

export const tankSpecs = [
  SpecEnum.WARRIOR_PROTECTION,
  SpecEnum.PALADIN_PROTECTION,
  SpecEnum.DK_BLOOD,
  SpecEnum.MONK_BREWMASTER,
  SpecEnum.DRUID_GUARDIAN
];

export const healerSpecs = [
  SpecEnum.PALADIN_HOLY,
  SpecEnum.PRIEST_HOLY,
  SpecEnum.PRIEST_DISCO,
  SpecEnum.SHAMAN_RESTORATION,
  SpecEnum.MONK_MISTWEAVER,
  SpecEnum.DRUID_RESTORATION
];

export const meleeSpecs = [
  SpecEnum.WARRIOR_ARMS,
  SpecEnum.WARRIOR_FURY,
  SpecEnum.ROGUE_ASSASSINATION,
  SpecEnum.ROGUE_COMBAT,
  SpecEnum.ROGUE_SUBTLETY,
  SpecEnum.DK_FROST,
  SpecEnum.DK_UNHOLY,
  SpecEnum.MONK_WINDWALKER,
  SpecEnum.DRUID_FERAL,
  SpecEnum.PALADIN_RETRIBUTION,
  SpecEnum.SHAMAN_ENHANCEMENT
];

export const rangedSpecs = [
  SpecEnum.HUNTER_MARKSMANSHIP,
  SpecEnum.HUNTER_BM,
  SpecEnum.HUNTER_SURVIVAL,
  SpecEnum.PRIEST_SHADOW,
  SpecEnum.MAGE_FROST,
  SpecEnum.MAGE_FIRE,
  SpecEnum.MAGE_ARCANE,
  SpecEnum.WARLOCK_AFFLICTION,
  SpecEnum.WARLOCK_DEMONOLOGY,
  SpecEnum.WARLOCK_DESTRUCTION,
  SpecEnum.SHAMAN_ELEMENTAL,
  SpecEnum.DRUID_BALANCE
];
