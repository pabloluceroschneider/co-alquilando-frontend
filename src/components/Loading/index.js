import React from "react";

function Svg() {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 398.000000 398.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata>Created by Pablo Daniel Lucero Schneider</metadata>
      <g
        transform="translate(0.000000,398.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M2479 3057 c-19 -17 -140 -120 -268 -227 l-232 -195 41 -17 c50 -22
    20 -41 269 170 99 83 185 152 191 152 7 0 9 -302 8 -982 l-3 -983 -169 -3
    c-129 -2 -171 1 -178 10 -4 7 -8 341 -7 742 l0 730 -258 103 c-142 57 -264
    103 -271 103 -7 0 -161 -124 -343 -277 l-329 -276 0 -609 0 -608 40 0 40 0 0
    588 0 588 168 140 c92 78 213 180 269 227 57 48 105 87 108 87 3 0 6 -366 7
    -812 l3 -813 43 -3 42 -3 0 830 c0 457 3 831 8 831 4 0 94 -34 200 -77 l192
    -77 0 -753 0 -753 260 0 260 0 2 1044 3 1044 192 -77 c105 -42 194 -79 198
    -82 3 -3 5 -439 5 -968 l0 -961 45 0 45 0 -2 993 -3 992 -265 107 c-146 58
    -267 107 -270 107 -3 0 -21 -14 -41 -32z"
        />
      </g>
    </svg>
  );
}

const Loading = (props) => {
  const { text } = props;
  return (
      <div className="logo container">
        <div className="logo img">
          <Svg />
        </div>
        <div className="loadAnimation">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
      </div>
  );
};

export default Loading;