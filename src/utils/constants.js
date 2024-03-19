const PALETTE = {
  YELLOW: "#F0C102",
  BLUE: "#08A6D3",
  GRAY: "#DBE0E8",
  BLACK: "#494949",
  DARKER: "#382D2E",
  TEXT_PURPLE: "#694878",
  TEXT_POINT_PURPLE: "#2E1065",
  DARK_PURPLE: "#6D28D9",
  PALE_PURPLE: "#BE98D6",
  POINT_PURPLE: "#6C12C4"
};

const STATUS = {
  DEFAULT: PALETTE.PALE_PURPLE,
  READ: PALETTE.GRAY,
  STAR: PALETTE.POINT_PURPLE,
  COLLECTION: PALETTE.YELLOW,
};

const COLLECTION_RADIUS = 100;
const NONE = "none";

export { PALETTE, STATUS, COLLECTION_RADIUS, NONE };
